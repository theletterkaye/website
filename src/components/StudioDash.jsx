import { useEffect, useMemo, useState } from 'react';

// Kaye's private social dashboard (/studio). Everything comes from /api/studio:
//   data  = pushed from her laptop (schedule, shot list, results, follower history, goal)
//   marks = what she has tapped as posted or shot on this page
// The page computes the game layer (streak, points, level, badges, pace) from those two.

const KEY = 'studio-passcode';
const day = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const addDays = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return day(d); };
const diff = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);
const fmt = (n) => (n == null ? '–' : n >= 10000 ? (n / 1000).toFixed(1) + 'K' : n.toLocaleString());
const nice = (s) => new Date(s + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const weekStart = (s) => { const d = new Date(s + 'T12:00:00'); const k = (d.getDay() + 6) % 7; return addDays(s, -k); };

const css = `
*{box-sizing:border-box}
.sd{--ink:#12181B;--forest:#132217;--gold:#996116;--goldl:#E2B66E;--blush:#D1C6BE;--cream:#F7F7F5;--line:#E4E0DA;--mute:#6B7075;
  font-family:'freight-sans-pro',-apple-system,sans-serif;color:var(--ink);max-width:640px;margin:0 auto;padding:0 0 calc(40px + env(safe-area-inset-bottom));font-size:17px;line-height:1.35}
.sd h1,.sd h2,.sd .big{font-family:'scale-variable',Georgia,serif;font-weight:500;letter-spacing:.005em;margin:0}
.hero{background:var(--forest);color:var(--cream);padding:calc(22px + env(safe-area-inset-top)) 20px 24px;border-radius:0 0 22px 22px}
.hero .dayn{font-size:15px;opacity:.8;font-weight:600}
.hero .big{font-size:54px;line-height:1;margin:6px 0 2px}
.hero .sub{font-size:15px;opacity:.85}
.bar{height:12px;border-radius:8px;background:rgba(255,255,255,.16);overflow:hidden;margin:14px 0 8px;position:relative}
.bar i{display:block;height:100%;background:var(--goldl);border-radius:8px;transition:width .6s}
.bar b{position:absolute;top:-3px;width:2px;height:18px;background:#fff;opacity:.7}
.pace{font-size:14px;opacity:.9}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:14px 16px 0}
.tile{background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px 10px;text-align:center}
.tile .n{font-family:'scale-variable',Georgia,serif;font-size:30px;line-height:1.05}
.tile .l{font-size:13px;color:var(--mute);font-weight:600}
.sec{padding:22px 16px 0}
.sec h2{font-size:24px;margin-bottom:10px}
.card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px;margin-bottom:10px;display:flex;gap:12px;align-items:center}
.card .t{flex:1;min-width:0}
.card .t b{display:block;font-weight:700;line-height:1.2}
.card .t span{font-size:14px;color:var(--mute)}
.card.late{border-color:#C8402F55;background:#FFF8F6}
.card.done{opacity:.55}
.btn{border:0;border-radius:999px;background:var(--forest);color:var(--cream);font:inherit;font-weight:700;font-size:15px;padding:10px 14px;white-space:nowrap}
.btn.ghost{background:transparent;color:var(--mute);border:1px solid var(--line)}
.btn:active{transform:scale(.96)}
.goalrow{margin-bottom:12px}
.goalrow .h{display:flex;justify-content:space-between;font-weight:700;font-size:15px;margin-bottom:5px}
.track{height:10px;background:var(--line);border-radius:8px;overflow:hidden}
.track i{display:block;height:100%;background:var(--gold);border-radius:8px;transition:width .5s}
.track i.full{background:#2F7D4F}
.check{display:flex;gap:12px;align-items:flex-start;padding:11px 2px;border-bottom:1px solid var(--line)}
.check input{width:24px;height:24px;margin:1px 0 0;accent-color:#132217;flex:none}
.check.on span{text-decoration:line-through;color:var(--mute)}
.row{display:flex;justify-content:space-between;gap:10px;padding:9px 2px;border-bottom:1px solid var(--line);font-size:15px}
.row span:last-child{color:var(--mute);white-space:nowrap}
.badges{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.badge{border:1px solid var(--line);border-radius:14px;padding:12px 6px;text-align:center;background:#fff;font-size:13px;font-weight:600;color:var(--mute)}
.badge .e{font-size:30px;display:block;filter:grayscale(1);opacity:.35}
.badge.got{color:var(--ink);border-color:var(--goldl);background:#FFFBF2}.badge.got .e{filter:none;opacity:1}
.note{font-size:14px;color:var(--mute);padding:0 2px}
.gate{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:28px;gap:14px;background:var(--forest);color:var(--cream)}
.gate input{font:inherit;font-size:20px;padding:14px;border-radius:12px;border:0}
.gate .btn{background:var(--goldl);color:var(--ink);font-size:18px;padding:14px}
.pop{position:fixed;inset:0;pointer-events:none;display:flex;align-items:center;justify-content:center;font-size:90px;animation:pop 1.1s ease-out forwards;z-index:9}
/* Desktop: the same page, laid out as three columns under a wide header. */
@media (min-width: 960px){
  .sd{max-width:1240px;padding:24px 28px 48px;font-size:16px}
  .hero{border-radius:22px;padding:28px 32px;display:grid;grid-template-columns:auto 1fr;column-gap:40px;align-items:center}
  .hero .dayn{grid-column:1/-1}
  .hero .big{font-size:76px;margin:4px 0 0}
  .hero .sub{align-self:end;padding-bottom:10px}
  .hero .bar{grid-column:1/-1;height:14px}
  .hero .pace{grid-column:1/-1;font-size:15px}
  .tiles{padding:18px 0 0;gap:16px}
  .tile{padding:16px}
  .grid{display:grid;grid-template-columns:1.05fr 1fr 1fr;gap:36px;align-items:start}
  .sec{padding:26px 0 0}
  .badges{grid-template-columns:repeat(3,1fr)}
  .btn{cursor:pointer}.btn:hover{filter:brightness(1.15)}
  .check{cursor:pointer}
}
@keyframes pop{0%{transform:scale(.3);opacity:0}25%{transform:scale(1.25);opacity:1}100%{transform:scale(1) translateY(-90px);opacity:0}}
`;

export default function StudioDash() {
  const [pass, setPass] = useState(() => (typeof localStorage !== 'undefined' && localStorage.getItem(KEY)) || '');
  const [typed, setTyped] = useState('');
  const [state, setState] = useState({ status: pass ? 'loading' : 'gate', data: null, marks: null, insights: null, error: '' });
  const [pop, setPop] = useState(null);

  const load = async (p) => {
    try {
      const r = await fetch('/api/studio', { headers: { 'x-studio-passcode': p } });
      if (r.status === 401) { localStorage.removeItem(KEY); setState({ status: 'gate', data: null, marks: null, error: 'That passcode did not work.' }); return; }
      const j = await r.json();
      localStorage.setItem(KEY, p); setPass(p);
      setState({ status: 'ready', data: j.data, marks: j.marks || { posted: {}, shots: {} }, insights: j.insights || null, error: '' });
    } catch { setState((s) => ({ ...s, status: s.data ? 'ready' : 'gate', error: 'Could not reach the dashboard. Check your connection.' })); }
  };
  useEffect(() => { if (pass) load(pass); }, []);

  const mark = async (kind, id, on) => {
    const prev = state.marks; const today = day();
    const next = { posted: { ...prev.posted }, shots: { ...prev.shots } };
    if (on) next[kind][id] = today; else delete next[kind][id];
    setState((s) => ({ ...s, marks: next }));
    if (on) { setPop(kind === 'posted' ? '🎉' : '🎬'); setTimeout(() => setPop(null), 1100); }
    try {
      const r = await fetch('/api/studio', { method: 'POST', headers: { 'content-type': 'application/json', 'x-studio-passcode': pass }, body: JSON.stringify({ type: 'mark', kind, id, on, date: today }) });
      if (!r.ok) throw new Error();
      const j = await r.json(); setState((s) => ({ ...s, marks: j.marks, error: '' }));
    } catch { setState((s) => ({ ...s, marks: prev, error: 'That did not save. Try again.' })); }
  };

  const v = useMemo(() => {
    const { data, marks } = state; if (!data || !marks) return null;
    const today = day(); const g = data.goal || {}; const sched = [...(data.schedule?.main || []).map((x) => ({ ...x, kind: 'main' })), ...(data.schedule?.trials || []).map((x) => ({ ...x, kind: 'trial' }))];
    // Numbers the Mac Studio reads from Instagram Insights once a day: per-post results, the follower count, and what went up.
    const ins = state.insights || {}; const media = Object.values(ins.media || {}).filter((m) => m.id);
    const seen = {}; for (const m of media) if (m.posted && (!seen[m.id] || m.posted < seen[m.id])) seen[m.id] = m.posted;
    const postedOn = (id) => marks.posted[id] || (data.posted || {})[id] || seen[id] || null;
    const ig = [...(data.followers?.instagram || []), ...Object.entries(ins.followers || {}).map(([date, n]) => ({ date, n }))].filter((x) => x.n != null).sort((a, b) => a.date.localeCompare(b.date)); const now = ig.length ? ig[ig.length - 1].n : g.start;
    const titleOf = Object.fromEntries(sched.map((x) => [x.id, x]));
    const lab = media.map((m) => ({ ...m, title: (titleOf[m.id]?.hook || titleOf[m.id]?.title || m.text || m.id), kind: titleOf[m.id]?.kind || (String(m.id).startsWith('T-') ? 'trial' : 'main') })).sort((a, b) => (b.follows || 0) - (a.follows || 0) || (b.views || 0) - (a.views || 0));
    const total = Math.max(1, diff(g.startDate, g.endDate)); const dayN = Math.min(total, Math.max(1, diff(g.startDate, today) + 1)); const left = Math.max(0, diff(today, g.endDate));
    const gained = now - g.start; const need = g.followers - now; const perDayNeed = left ? need / left : need; const perDayNow = dayN > 1 ? gained / (dayN - 1) : 0;
    const expected = g.start + (g.followers - g.start) * ((dayN - 1) / total);
    // streak: consecutive days ending today (or yesterday) with at least one post
    const days = new Set(Object.values({ ...seen, ...(data.posted || {}), ...marks.posted })); let streak = 0; let d = days.has(today) ? today : addDays(today, -1);
    while (days.has(d)) { streak++; d = addDays(d, -1); }
    let best = 0, run = 0, prev = null; for (const x of [...days].sort()) { run = prev && diff(prev, x) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = x; }
    const isPosted = (x) => !!postedOn(x.id); const mainDone = sched.filter((x) => x.kind === 'main' && isPosted(x)); const trialDone = sched.filter((x) => x.kind === 'trial' && isPosted(x));
    const shotsDone = Object.keys(marks.shots).length; const grads = (data.graduates || []).length;
    const xp = mainDone.length * 10 + trialDone.length * 3 + shotsDone * 5 + grads * 25; const level = Math.floor(xp / 100) + 1;
    const ws = weekStart(today); const inWeek = (dt) => dt && dt >= ws && dt <= addDays(ws, 6);
    const wk = { main: mainDone.filter((x) => inWeek(postedOn(x.id))).length, trials: trialDone.filter((x) => inWeek(postedOn(x.id))).length, shots: Object.values(marks.shots).filter(inWeek).length };
    const todo = sched.filter((x) => !isPosted(x) && x.status !== 'on hold' && !String(x.status || '').startsWith('on hold') && x.date <= today).sort((a, b) => a.date.localeCompare(b.date) || (a.order || 0) - (b.order || 0));
    const doneToday = sched.filter((x) => postedOn(x.id) === today);
    const soon = sched.filter((x) => !isPosted(x) && x.date > today && x.date <= addDays(today, 7)).sort((a, b) => a.date.localeCompare(b.date) || (a.order || 0) - (b.order || 0));
    const topViews = Math.max(0, ...(data.posts || []).map((p) => p.views || 0));
    const badges = [
      ['🚀', 'First post', mainDone.length + trialDone.length >= 1], ['🔥', '3-day streak', best >= 3], ['🗓️', '7-day streak', best >= 7], ['⚡', '14-day streak', best >= 14],
      ['🧪', '10 trial reels', trialDone.length >= 10], ['🎓', 'First graduate', grads >= 1], ['🎬', 'First shoot done', shotsDone >= 1], ['👀', '10K-view post', topViews >= 10000],
      ['📈', '12K followers', now >= 12000], ['🌟', '15K followers', now >= 15000], ['🏔️', '20K followers', now >= 20000], ['💯', 'Level 5', level >= 5],
    ];
    return { today, g, now, dayN, total, left, gained, need, perDayNeed, perDayNow, expected, streak, best, xp, level, wk, todo, doneToday, soon, badges, postedOn, lab, ins };
  }, [state]);

  if (state.status === 'gate') return (
    <div className="sd"><style>{css}</style>
      <form className="gate" onSubmit={(e) => { e.preventDefault(); if (typed) { setState((s) => ({ ...s, status: 'loading' })); load(typed); } }}>
        <h1 style={{ fontSize: 40 }}>Studio</h1>
        <input type="password" autoFocus placeholder="Passcode" value={typed} onChange={(e) => setTyped(e.target.value)} aria-label="Passcode" />
        <button className="btn" type="submit">Open</button>
        {state.error && <div>{state.error}</div>}
      </form></div>);
  if (state.status === 'loading' || !v) return <div className="sd"><style>{css}</style><div className="sec">{state.data === null && state.status === 'ready' ? 'No plan has been pushed yet. Run the dashboard push from the laptop.' : 'Loading…'}</div></div>;

  const { data } = state; const t = data.weekTargets || { main: 4, trials: 14, shots: 1 }; const pct = Math.min(100, Math.max(0, ((v.now - v.g.start) / (v.g.followers - v.g.start)) * 100));
  const ahead = v.now >= v.expected; const Item = ({ x, late }) => (
    <div className={'card' + (late ? ' late' : '')}>
      <div className="t"><b>{x.title}</b><span>{x.kind === 'trial' ? `Trial Reel ${x.order || ''}` : x.format}{late ? ` · was ${nice(x.date)}` : ''}{x.folder ? ` · ${x.folder}` : ''}</span></div>
      <button className="btn" onClick={() => mark('posted', x.id, true)}>Posted ✓</button>
    </div>);

  return (
    <div className="sd"><style>{css}</style>{pop && <div className="pop">{pop}</div>}
      <div className="hero">
        <div className="dayn">Day {v.dayN} of {v.total} · {v.left} days left</div>
        <div className="big">{fmt(v.now)}</div>
        <div className="sub">followers on Instagram · goal {fmt(v.g.followers)}</div>
        <div className="bar"><i style={{ width: pct + '%' }} /><b style={{ left: `calc(${Math.min(100, ((v.dayN - 1) / v.total) * 100)}% - 1px)` }} title="where today should be" /></div>
        <div className="pace">{v.gained >= 0 ? '+' : ''}{fmt(v.gained)} so far. {ahead ? 'Ahead of the line.' : `${fmt(Math.round(v.expected - v.now))} behind the line.`} Need about {Math.ceil(v.perDayNeed)} a day{v.dayN > 3 ? `, running at ${Math.round(v.perDayNow)}` : ''}.</div>
      </div>

      <div className="tiles">
        <div className="tile"><div className="n">{v.streak}🔥</div><div className="l">day streak{v.best > v.streak ? ` · best ${v.best}` : ''}</div></div>
        <div className="tile"><div className="n">Lv {v.level}</div><div className="l">{v.xp} points · {100 - (v.xp % 100)} to next</div></div>
        <div className="tile"><div className="n">{v.badges.filter((b) => b[2]).length}/{v.badges.length}</div><div className="l">badges</div></div>
      </div>
      {state.error && <div className="sec" style={{ color: '#C8402F', fontWeight: 700 }}>{state.error}</div>}

      <div className="grid"><div className="col">
      <div className="sec"><h2>Post today</h2>
        {v.todo.length === 0 && <div className="note">{v.doneToday.length ? 'All done for today. 🎉' : 'Nothing scheduled today.'}</div>}
        {v.todo.map((x) => <Item key={x.id} x={x} late={x.date < v.today} />)}
        {v.doneToday.map((x) => (<div className="card done" key={x.id}><div className="t"><b>{x.title}</b><span>posted today</span></div><button className="btn ghost" onClick={() => mark('posted', x.id, false)}>Undo</button></div>))}
      </div>

      <div className="sec"><h2>This week</h2>
        {[['Main posts', v.wk.main, t.main], ['Trial Reels', v.wk.trials, t.trials], ['Shoot sessions', Math.min(v.wk.shots, t.shots) && 1, t.shots]].map(([l, n, of]) => (
          <div className="goalrow" key={l}><div className="h"><span>{l}</span><span>{l === 'Shoot sessions' ? (v.wk.shots ? 'done' : 'not yet') : `${n} of ${of}`}</span></div><div className="track"><i className={n >= of ? 'full' : ''} style={{ width: Math.min(100, (n / of) * 100) + '%' }} /></div></div>))}
      </div>

      <div className="sec"><h2>Shoot next</h2>
        {(data.shots || []).length === 0 && <div className="note">Nothing waiting to be filmed.</div>}
        {(data.shots || []).map((s) => { const on = !!state.marks.shots[s.id]; return (
          <label className={'check' + (on ? ' on' : '')} key={s.id}><input type="checkbox" checked={on} onChange={(e) => mark('shots', s.id, e.target.checked)} /><span>{s.text}{s.why ? <em style={{ display: 'block', fontSize: 14, color: 'var(--mute)', fontStyle: 'normal' }}>{s.why}</em> : null}</span></label>); })}
      </div>

      </div><div className="col">
      <div className="sec"><h2>Coming up</h2>
        <div className="note" style={{ marginBottom: 8 }}>Post whatever feels right. Mark it here and the rest of the plan slides around it.</div>
        {v.soon.length === 0 && <div className="note">Nothing planned for the next 7 days.</div>}
        {[...new Set(v.soon.map((x) => x.date))].map((d) => { const dayItems = v.soon.filter((x) => x.date === d); const tr = dayItems.filter((x) => x.kind === 'trial'); return (
          <div key={d}>
            {dayItems.filter((x) => x.kind === 'main').map((x) => <div className="row" key={x.id}><span><b>{x.title}</b></span><span>{nice(d)} <button className="btn ghost" style={{ marginLeft: 8, padding: '4px 10px', fontSize: 13 }} title="Posted this one today instead" onClick={() => mark('posted', x.id, true)}>Posted early ✓</button></span></div>)}
            {tr.length > 0 && <div className="row"><span>{tr.length} Trial Reel{tr.length > 1 ? 's' : ''} (#{tr[0].order}{tr.length > 1 ? `–${tr[tr.length - 1].order}` : ''})</span><span>{nice(d)}</span></div>}
          </div>); })}
      </div>

      </div><div className="col">
      <div className="sec"><h2>Follows by post</h2>
        {v.ins.status && v.ins.status !== 'ok' && <div className="note" style={{ color: '#C8402F', fontWeight: 700 }}>{v.ins.status === 'logged-out' ? 'Instagram is logged out on the Mac Studio, so numbers have stopped updating.' : `The daily read had a problem: ${v.ins.note || v.ins.status}`}</div>}
        {v.ins.updated && Date.now() - new Date(v.ins.updated).getTime() > 40 * 3600 * 1000 && <div className="note" style={{ color: '#C8402F', fontWeight: 700 }}>The Mac Studio has not read Instagram in over a day. It may be off, or nobody is logged in on it.</div>}
        {v.lab.length === 0 && <div className="note">The Mac Studio reads these from Instagram every morning. Nothing read yet.</div>}
        {v.lab.slice(0, 12).map((m) => <div className="row" key={m.mediaId || m.id + m.posted}><span>{m.kind === 'trial' ? '🧪 ' : ''}{String(m.title).slice(0, 64)}</span><span><b>{m.follows ?? 0}</b> follows · {fmt(m.views || 0)} views{m.shares ? ` · ${m.shares} shares` : ''}</span></div>)}
        {v.ins.updated ? <div className="note" style={{ marginTop: 10 }}>Read from Instagram {new Date(v.ins.updated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}{v.ins.unmatched ? ` · ${v.ins.unmatched} post${v.ins.unmatched > 1 ? 's' : ''} not matched to the plan yet` : ''}.</div> : null}
      </div>

      <div className="sec"><h2>Results</h2>
        {(data.posts || []).length === 0 && <div className="note">No numbers yet. They appear after the first weekly review.</div>}
        {(data.posts || []).slice(0, 8).map((p) => <div className="row" key={p.id + p.platform}><span>{p.hook}</span><span>{fmt(p.views)} views{p.vsBase ? ` · ${p.vsBase}x` : ''}</span></div>)}
        {(data.tests || []).length > 0 && <h2 style={{ fontSize: 19, margin: '16px 0 6px' }}>Tests running</h2>}
        {(data.tests || []).map((x) => <div className="row" key={x.name}><span>{x.name}</span><span>{x.read}</span></div>)}
        {data.baseline?.igMedianViews ? <div className="note" style={{ marginTop: 10 }}>Baseline before this project: about {fmt(data.baseline.igMedianViews)} views per Reel.</div> : null}
      </div>

      <div className="sec"><h2>Badges</h2>
        <div className="badges">{v.badges.map(([e, l, got]) => <div className={'badge' + (got ? ' got' : '')} key={l}><span className="e">{e}</span>{l}</div>)}</div>
      </div>

      </div></div>

      <div className="sec note">Updated {data.updated ? new Date(data.updated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '–'}. Points: main post 10, Trial Reel 3, shot 5, graduate 25.</div>
    </div>);
}
