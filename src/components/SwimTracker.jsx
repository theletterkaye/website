import { useState, useEffect, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  parseT, fmtT, fmtDate, EVENTS, KIDS, MOTIV, REGIONALS, CHAMPS,
} from "../data/swim.js";

const API = "/api/swim";
const PASS_KEY = "swim-passcode";

// localStorage can throw (private mode, blocked storage); the page still works
// without it, the passcode just isn't remembered.
const readPass = () => { try { return localStorage.getItem(PASS_KEY) || ""; } catch { return ""; } };
const writePass = (v) => { try { v ? localStorage.setItem(PASS_KEY, v) : localStorage.removeItem(PASS_KEY); } catch {} };

/* ---------- per-event computation ---------- */
function eventStatus(swims, motiv, regional, champ) {
  const counting = swims.filter((x) => x.course === "SCY" && !x.dq);
  if (!counting.length) return null;
  const bestSwim = counting.reduce((a, b) => (b.t < a.t ? b : a));
  const best = bestSwim.t;

  let achieved = null, next = null;
  if (motiv) {
    for (let i = motiv.length - 1; i >= 0; i--) {
      if (best <= motiv[i].t) { achieved = motiv[i]; next = motiv[i + 1] || null; break; }
    }
    if (!achieved) next = motiv[0];
  }
  return {
    best, bestSwim, achieved, next,
    nextGap: next ? best - next.t : null,
    regional, regGap: regional != null ? best - regional : null,
    champ, chGap: champ != null ? best - champ : null,
  };
}

/* ---------- small pieces ---------- */
function GapChip({ made, gap, none }) {
  if (none) return <span className="chip chip-none">—</span>;
  if (made) return <span className="chip chip-made">✓ made</span>;
  return <span className="chip chip-gap">{gap.toFixed(2)} off</span>;
}

function EventChart({ swims, status, color }) {
  const pts = swims
    .filter((x) => x.course === "SCY" && !x.dq)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((x) => ({ date: x.date, t: x.t, relay: x.relay }));
  if (pts.length < 2) return <div className="chart-empty">Add one more swim to see the trend.</div>;
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={pts} margin={{ top: 10, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#DCE8ED" />
          <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fontSize: 10, fill: "#5B7280" }}
            interval="preserveStartEnd" minTickGap={40} />
          <YAxis tickFormatter={fmtT} tick={{ fontSize: 10, fill: "#5B7280" }}
            domain={["auto", "auto"]} width={52} />
          <Tooltip formatter={(v) => [fmtT(v), "time"]} labelFormatter={fmtDate}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #DCE8ED" }} />
          {status?.next && (
            <ReferenceLine y={status.next.t} stroke="#0FA35C" strokeDasharray="6 4"
              ifOverflow="extendDomain"
              label={{ value: `${status.next.n} cut ${fmtT(status.next.t)}`, position: "insideBottomLeft", fontSize: 10, fill: "#0FA35C" }} />
          )}
          {status?.regional != null && (
            <ReferenceLine y={status.regional} stroke="#C99700" strokeDasharray="6 4"
              ifOverflow="hidden"
              label={{ value: `Regionals ${fmtT(status.regional)}`, position: "insideBottomLeft", fontSize: 10, fill: "#C99700" }} />
          )}
          {status?.champ != null && (
            <ReferenceLine y={status.champ} stroke="#C0392B" strokeDasharray="6 4"
              ifOverflow="hidden"
              label={{ value: `Champs ${fmtT(status.champ)}`, position: "insideBottomLeft", fontSize: 10, fill: "#C0392B" }} />
          )}
          <Line type="monotone" dataKey="t" stroke={color} strokeWidth={2.5}
            dot={{ r: 3, fill: color }} activeDot={{ r: 5 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AddSwimForm({ event, onAdd }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [course, setCourse] = useState("SCY");
  const [relay, setRelay] = useState(false);
  const [dq, setDq] = useState(false);
  const [err, setErr] = useState("");

  const submit = () => {
    const t = parseT(time);
    if (!date) { setErr("Pick the meet date."); return; }
    if (t == null) { setErr("Time should look like 39.75 or 1:27.34."); return; }
    onAdd({ id: `u-${Date.now()}`, event, date, t, course, relay, dq });
    setTime(""); setRelay(false); setDq(false); setErr("");
  };

  return (
    <div className="add-form">
      <div className="add-row">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="inp" />
        <input placeholder="1:27.34" value={time} inputMode="decimal"
          onChange={(e) => setTime(e.target.value)} className="inp inp-time" />
        <select value={course} onChange={(e) => setCourse(e.target.value)} className="inp inp-course">
          <option>SCY</option><option>LCM</option><option>SCM</option>
        </select>
      </div>
      <div className="add-row add-row2">
        <label className="ck"><input type="checkbox" checked={relay} onChange={(e) => setRelay(e.target.checked)} /> relay split</label>
        <label className="ck"><input type="checkbox" checked={dq} onChange={(e) => setDq(e.target.checked)} /> DQ</label>
        <button className="btn-add" onClick={submit}>Add swim</button>
      </div>
      {err && <div className="form-err">{err}</div>}
    </div>
  );
}

function EventDetail({ kid, event, swims, status, editing, onAdd, onDelete }) {
  const sorted = [...swims].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="detail">
      <EventChart swims={swims} status={status} color={kid.color} />

      {editing && (
        <>
          <div className="detail-sec-label">Log a new time</div>
          <AddSwimForm event={event} onAdd={onAdd} />
        </>
      )}

      <div className="detail-sec-label">All swims</div>
      <div className="hist">
        {sorted.map((x) => (
          <div key={x.id} className={"hist-row" + (x.id === status?.bestSwim?.id ? " hist-best" : "")}>
            <span className="hist-date">{fmtDate(x.date)}</span>
            <span className="hist-time">{fmtT(x.t)}</span>
            <span className="hist-tags">
              {x.course !== "SCY" && <em>{x.course}</em>}
              {x.relay && <em>relay</em>}
              {x.dq && <em className="tag-dq">DQ</em>}
              {x.id === status?.bestSwim?.id && <em className="tag-pb">PB</em>}
            </span>
            {editing && (
              <button className="hist-del" onClick={() => onDelete(x.id)} aria-label="Delete swim">×</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Header control: view-only by default, a passcode switches on editing. */
function EditLock({ editing, onUnlock, onLock }) {
  const [asking, setAsking] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (editing) return <button className="lock-btn" onClick={onLock}>Done editing</button>;
  if (!asking) return <button className="lock-btn" onClick={() => setAsking(true)}>Edit</button>;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const ok = await onUnlock(code.trim());
    setBusy(false);
    if (!ok) setErr("That passcode didn't work.");
  };

  return (
    <form className="lock-form" onSubmit={submit}>
      <input type="password" autoFocus placeholder="Passcode" value={code}
        onChange={(e) => setCode(e.target.value)} className="inp lock-inp" />
      <button className="btn-add" disabled={busy || !code.trim()}>{busy ? "…" : "Unlock"}</button>
      <button type="button" className="lock-cancel" onClick={() => { setAsking(false); setErr(""); }}>Cancel</button>
      {err && <div className="lock-err">{err}</div>}
    </form>
  );
}

/* ---------- main ---------- */
export default function SwimTracker() {
  const [kidId, setKidId] = useState("afton");
  const [data, setData] = useState(null);
  const [loadErr, setLoadErr] = useState("");
  const [open, setOpen] = useState(null); // event code
  const [saveState, setSaveState] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    setPass(readPass());
    fetch(API)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((body) => setData(body.data))
      .catch(() => setLoadErr("Couldn't load times. Try refreshing."));
  }, []);

  const flash = (msg, ms = 2500) => {
    setSaveState(msg);
    setTimeout(() => setSaveState(""), ms);
  };

  const post = (body, code = pass) =>
    fetch(API, {
      method: "POST",
      headers: { "content-type": "application/json", "x-swim-passcode": code },
      body: JSON.stringify(body),
    });

  const unlock = async (code) => {
    const r = await post({ type: "check" }, code).catch(() => null);
    if (!r?.ok) return false;
    writePass(code); setPass(code);
    return true;
  };
  const lock = () => { writePass(""); setPass(""); };

  // Show the change right away, then swap in what the server saved (which
  // includes anything the other phone added in the meantime).
  const save = async (edit, optimistic) => {
    const before = data;
    setData(optimistic);
    try {
      const r = await post(edit);
      const body = await r.json().catch(() => ({}));
      if (r.status === 401) lock();
      if (!r.ok) throw new Error(body.error || "Save failed.");
      setData(body.data);
      flash("saved");
    } catch (e) {
      setData(before);
      flash(`Not saved: ${e.message}`, 5000);
    }
  };

  const kid = KIDS.find((k) => k.id === kidId);
  const editing = !!pass;

  const byEvent = useMemo(() => {
    if (!data) return {};
    const out = {};
    for (const [code] of EVENTS) {
      const swims = data.swims[kidId].filter((x) => x.event === code);
      if (!swims.length) continue;
      out[code] = {
        swims,
        status: eventStatus(swims, MOTIV[kidId][code], REGIONALS[kidId][code] ?? null,
          CHAMPS[kidId][code] ?? null),
      };
    }
    return out;
  }, [data, kidId]);

  if (!data) return (
    <div className="app"><style>{CSS}</style><div className="load">{loadErr || "Loading times…"}</div></div>
  );

  const addSwim = (swim) => {
    const next = structuredClone(data);
    next.swims[kidId].push(swim);
    save({ type: "add", kid: kidId, swim }, next);
  };
  const deleteSwim = (id) => {
    const next = structuredClone(data);
    next.swims[kidId] = next.swims[kidId].filter((x) => x.id !== id);
    save({ type: "delete", kid: kidId, id }, next);
  };

  const cutsCount = Object.values(byEvent).filter((e) => e.status?.achieved).length;
  const regCount = Object.values(byEvent).filter((e) => e.status?.regGap != null && e.status.regGap <= 0).length;

  return (
    <div className="app">
      <style>{CSS}</style>

      <header className="hdr">
        <div className="hdr-top">
          <div>
            <div className="hdr-title">LANE&nbsp;LINES</div>
            <div className="hdr-sub">best times · cut tracker</div>
          </div>
          <EditLock editing={editing} onUnlock={unlock} onLock={lock} />
        </div>
        <div className="kid-tabs">
          {KIDS.map((k) => (
            <button key={k.id}
              className={"kid-tab" + (k.id === kidId ? " kid-tab-on" : "")}
              style={k.id === kidId ? { "--kid": k.color } : {}}
              onClick={() => { setKidId(k.id); setOpen(null); }}>
              <span className="kid-name">{k.name}</span>
              <span className="kid-meta">{k.meta}</span>
            </button>
          ))}
        </div>
        <div className="hdr-stats">
          <span><b>{cutsCount}</b> events with a USA cut</span>
          <span className="dot">·</span>
          <span><b>{regCount}</b> Regionals cuts made</span>
        </div>
      </header>

      <main className="events">
        {EVENTS.map(([code, name]) => {
          const e = byEvent[code];
          if (!e?.status) return null;
          const st = e.status;
          const isOpen = open === code;
          return (
            <section key={code} className={"card" + (isOpen ? " card-open" : "")}>
              <button className="card-head" onClick={() => setOpen(isOpen ? null : code)}>
                <div className="card-left">
                  <div className="ev-name">{name}</div>
                  <div className="ev-badges">
                    {st.achieved
                      ? <span className="lvl">{st.achieved.n}</span>
                      : <span className="lvl lvl-none">no cut yet</span>}
                    {st.bestSwim.relay && <span className="mini-note">relay PB</span>}
                  </div>
                </div>
                <div className="card-right">
                  <div className="best">{fmtT(st.best)}</div>
                  <div className="best-date">{fmtDate(st.bestSwim.date)}</div>
                </div>
              </button>

              <div className="gaps">
                <div className="gap-row">
                  <span className="gap-label">{st.next ? `${st.next.n} cut ${fmtT(st.next.t)}` : (MOTIV[kidId][code] ? "AAAA — top of the sheet 🏆" : "no USA sheet for this event")}</span>
                  {st.next
                    ? <GapChip made={false} gap={st.nextGap} />
                    : <GapChip made={!!MOTIV[kidId][code]} none={!MOTIV[kidId][code]} />}
                </div>
                <div className="gap-row">
                  <span className="gap-label">IL Regionals {st.regional != null ? fmtT(st.regional) : ""}</span>
                  <GapChip made={st.regGap != null && st.regGap <= 0}
                    gap={st.regGap ?? 0} none={st.regional == null} />
                </div>
                <div className="gap-row">
                  <span className="gap-label">IL Champs {st.champ != null ? fmtT(st.champ) : "— no cut for this event"}</span>
                  <GapChip made={st.chGap != null && st.chGap <= 0}
                    gap={st.chGap ?? 0} none={st.champ == null} />
                </div>
              </div>

              {isOpen && (
                <EventDetail kid={kid} event={code} swims={e.swims} status={st}
                  editing={editing}
                  onAdd={addSwim} onDelete={deleteSwim} />
              )}
            </section>
          );
        })}
      </main>

      <footer className="foot">
        Best times & cut gaps use SCY swims only (DQs excluded, relay splits included and flagged).
        LCM/SCM swims stay in each event's log. Times are saved for the whole family, so
        anything added here shows up on every phone.
        {saveState && <div className={"save-note" + (saveState === "saved" ? "" : " save-bad")}>{saveState}</div>}
      </footer>
    </div>
  );
}

/* ---------- styles ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');

* { box-sizing: border-box; margin: 0; }
body { background: #EEF5F8; }
.app {
  min-height: 100vh; background: #EEF5F8; color: #12263A;
  font-family: -apple-system, 'Segoe UI', Roboto, sans-serif;
  max-width: 560px; margin: 0 auto; padding-bottom: 24px;
}
.load { padding: 48px; text-align: center; color: #5B7280; font-family: sans-serif; }

.hdr {
  background: #0A1F33; color: #fff; padding: 20px 16px 14px;
  padding-top: calc(20px + env(safe-area-inset-top, 0px));
  background-image: repeating-linear-gradient(90deg, transparent 0 44px, rgba(255,255,255,.05) 44px 46px);
}
.hdr-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.hdr-title {
  font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 30px;
  letter-spacing: 4px; line-height: 1;
}
.hdr-sub { color: #7FB6C6; font-size: 12px; letter-spacing: 1px; margin-top: 2px; text-transform: uppercase; }
.lock-btn {
  border: 1px solid rgba(255,255,255,.3); background: transparent; color: #B9CFDA;
  border-radius: 8px; padding: 6px 12px; font-size: 12px; font-weight: 600; cursor: pointer;
}
.lock-form { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; max-width: 260px; }
.lock-inp { flex: 1 1 110px; padding: 6px 8px; font-size: 13px; color: #12263A; }
.lock-form .btn-add { margin-left: 0; padding: 6px 12px; }
.lock-cancel { border: none; background: none; color: #7FB6C6; font-size: 12px; cursor: pointer; }
.lock-err { flex-basis: 100%; text-align: right; font-size: 11px; color: #FF9C8F; }
.kid-tabs { display: flex; gap: 8px; margin-top: 14px; }
.kid-tab {
  flex: 1; border: 1px solid rgba(255,255,255,.25); background: transparent; color: #B9CFDA;
  border-radius: 10px; padding: 8px 10px; text-align: left; cursor: pointer;
}
.kid-tab-on { background: var(--kid); border-color: var(--kid); color: #fff; }
.kid-name { display: block; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: .5px; }
.kid-meta { display: block; font-size: 11px; opacity: .85; }
.hdr-stats { margin-top: 10px; font-size: 12px; color: #B9CFDA; }
.hdr-stats b { color: #FFE24D; }
.hdr-stats .dot { margin: 0 6px; }

.events { padding: 12px 12px 0; display: flex; flex-direction: column; gap: 10px; }
.card { background: #fff; border-radius: 14px; box-shadow: 0 1px 3px rgba(10,31,51,.08); overflow: hidden; }
.card-open { box-shadow: 0 4px 16px rgba(10,31,51,.14); }
.card-head {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 12px 14px 6px; background: none; border: none; cursor: pointer; text-align: left; color: inherit;
}
.ev-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 20px; letter-spacing: .3px; }
.ev-badges { display: flex; gap: 6px; margin-top: 3px; align-items: center; }
.lvl {
  background: #FFE24D; color: #6B5300; font-weight: 700; font-size: 11px;
  padding: 2px 8px; border-radius: 4px; letter-spacing: .5px;
}
.lvl-none { background: #E7EEF2; color: #8296A3; font-weight: 600; }
.mini-note { font-size: 10px; color: #8296A3; }
.best { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 22px; text-align: right; }
.best-date { font-size: 11px; color: #8296A3; text-align: right; }

.gaps { padding: 4px 14px 12px; display: flex; flex-direction: column; gap: 5px; }
.gap-row { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; color: #43596B; }
.chip { font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
.chip-made { background: #DDF3E6; color: #0F7A44; }
.chip-gap { background: #FFF3C4; color: #8A6D00; }
.chip-none { background: #F0F4F6; color: #A9B8C2; }

.detail { border-top: 1px dashed #DCE8ED; padding: 12px 14px 16px; }
.chart-empty { font-size: 12px; color: #8296A3; padding: 10px 0; }
.detail-sec-label {
  font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px;
  letter-spacing: 1px; text-transform: uppercase; color: #43596B; margin: 14px 0 6px;
}
.add-row { display: flex; gap: 6px; }
.add-row2 { margin-top: 6px; align-items: center; }
.inp {
  border: 1px solid #C9D8DF; border-radius: 8px; padding: 8px; font-size: 16px;
  background: #F7FAFB; min-width: 0; flex: 1;
}
.inp-time { font-family: 'IBM Plex Mono', monospace; }
.inp-course { flex: 0 0 76px; }
.ck { font-size: 12px; color: #43596B; display: flex; align-items: center; gap: 4px; }
.btn-add {
  margin-left: auto; background: #0A1F33; color: #FFE24D; border: none; border-radius: 8px;
  padding: 8px 14px; font-weight: 700; font-size: 13px; cursor: pointer;
}
.btn-add:disabled { opacity: .5; cursor: default; }
.form-err { color: #C0392B; font-size: 12px; margin-top: 5px; }

.hist { display: flex; flex-direction: column; }
.hist-row {
  display: flex; align-items: center; gap: 8px; padding: 6px 2px;
  border-bottom: 1px solid #F0F4F6; font-size: 13px;
}
.hist-best { background: #FFFBE6; border-radius: 6px; padding-left: 6px; }
.hist-date { color: #8296A3; flex: 0 0 62px; font-size: 12px; }
.hist-time { font-family: 'IBM Plex Mono', monospace; font-weight: 600; }
.hist-tags { display: flex; gap: 5px; margin-left: 4px; }
.hist-tags em {
  font-style: normal; font-size: 10px; background: #E7EEF2; color: #5B7280;
  padding: 1px 6px; border-radius: 4px;
}
.tag-dq { background: #FBE3E0 !important; color: #A93226 !important; }
.tag-pb { background: #FFE24D !important; color: #6B5300 !important; font-weight: 700; }
.hist-del {
  margin-left: auto; border: none; background: none; color: #C2CFD7; font-size: 16px;
  cursor: pointer; padding: 0 6px;
}
.hist-del:hover { color: #C0392B; }

.foot { padding: 16px 16px 8px; font-size: 11px; color: #8296A3; line-height: 1.5; }
.save-note { margin-top: 6px; color: #0F7A44; font-weight: 600; }
.save-bad { color: #C0392B; }
`;
