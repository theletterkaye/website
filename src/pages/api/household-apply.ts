import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { ROLE, KNOCKOUT_COUNT_WORD } from '../../data/household-role';

// Runs on demand. Everything else on the site stays statically prerendered.
export const prerender = false;

const THANKS = `${ROLE.basePath}/thanks`;
const RETRY = `${ROLE.basePath}/apply?error=1`;

/**
 * Where to send someone after a successful submit.
 *
 * Applicants who clear every basic requirement land on a thank-you page
 * with the booking calendar embedded and their details prefilled, so the
 * screening call gets booked without an email round-trip. Everyone else gets
 * the plain thank-you page and a human decision.
 */
const thanksUrl = (qualified: boolean, name: string, email: string) => {
  if (!qualified || !ROLE.scheduling.autoInviteQualified) return THANKS;
  const params = new URLSearchParams({ q: '1', n: name, e: email });
  return `${THANKS}?${params}`;
};

/** Answers that mean this candidate can't do the job as scoped. Surfaced at the
 *  top of the email so a non-fit is one glance rather than a full read. */
const KNOCKOUTS: Record<string, { bad: string[]; note: string }> = {
  transport: { bad: ['no'], note: 'No reliable transportation or license' },
  availability: { bad: ['no'], note: 'Cannot work Tue/Wed/Thu between 9 and 3' },
  employer_home: { bad: ['no'], note: 'Needs an empty house to work in' },
  w2: { bad: ['no'], note: 'Will not accept W-2 (wants cash or 1099)' },
  bgcheck: { bad: ['no'], note: 'Declines background check' },
  refs_ok: { bad: ['no'], note: 'Cannot provide references' },
};

/** Answers that aren't disqualifying but are worth knowing before the call. */
const SOFT_FLAGS: Record<string, { watch: string[]; note: string }> = {
  employer_home: {
    watch: ['prefer_empty'],
    note: 'Would prefer an empty house but says she can manage. Worth asking about on the call.',
  },
  availability: {
    watch: ['mostly'],
    note: 'Says "most weeks" on availability rather than a clear yes.',
  },
  w2: { watch: ['questions'], note: 'Has questions about the W-2 arrangement.' },
  refs_ok: { watch: ['one'], note: 'Only has one reference.' },
};

const FIELDS: Array<[string, string]> = [
  ['name', 'Name'],
  ['pronouns', 'Pronouns'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['town', 'Town'],
  ['transport', 'Transportation + license'],
  ['availability', 'Tue/Wed/Thu, 9 to 3'],
  ['days', 'Days available'],
  ['employer_home', 'Ok with employer home'],
  ['w2', 'W-2 ok'],
  ['bgcheck', 'Background check ok'],
  ['refs_ok', 'Can provide references'],
  ['experience', 'Recent household experience'],
  ['enjoy', 'Enjoys vs tolerates'],
  ['alone', 'Working with the family present'],
  ['left', 'Why last position ended'],
  ['other_work', 'Other jobs'],
  ['start', 'Earliest start'],
  ['ref1_name', 'Reference 1: name'],
  ['ref1_rel', 'Reference 1: relationship'],
  ['ref1_phone', 'Reference 1: phone'],
  ['ref2_name', 'Reference 2: name'],
  ['ref2_rel', 'Reference 2: relationship'],
  ['ref2_phone', 'Reference 2: phone'],
  ['notes', 'Anything else'],
  ['source', 'Heard about it via'],
];

const escape = (s: string) =>
  s.replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );

const redirect = (location: string) =>
  new Response(null, { status: 303, headers: { Location: location } });

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect(RETRY);
  }

  // Honeypot: a bot filled the hidden field. Look successful, send nothing.
  if (form.get('website')) return redirect(THANKS);

  const get = (key: string) => form.getAll(key).map(String).join(', ').trim();

  const name = get('name');
  const email = get('email');
  if (!name || !email) return redirect(RETRY);

  const flags = Object.entries(KNOCKOUTS)
    .filter(([key, rule]) => rule.bad.includes(get(key)))
    .map(([, rule]) => rule.note);

  const rows = FIELDS.map(([key, label]) => {
    const value = get(key);
    if (!value) return '';
    return `<tr>
      <th align="left" valign="top" style="padding:8px 16px 8px 0;border-bottom:1px solid #EDE9E4;font-family:sans-serif;font-size:13px;color:#4A4340;font-weight:600;white-space:nowrap;">${escape(label)}</th>
      <td valign="top" style="padding:8px 0;border-bottom:1px solid #EDE9E4;font-family:sans-serif;font-size:14px;color:#12181B;white-space:pre-wrap;">${escape(value)}</td>
    </tr>`;
  }).join('');

  const qualified = flags.length === 0;

  const softFlags = Object.entries(SOFT_FLAGS)
    .filter(([key, rule]) => rule.watch.includes(get(key)))
    .map(([, rule]) => rule.note);

  const banner = qualified
    ? `<p style="margin:0 0 24px;padding:12px 16px;background:#EDF3EC;border-left:3px solid #132217;font-family:sans-serif;font-size:14px;color:#12181B;">
         <strong>Meets all ${KNOCKOUT_COUNT_WORD} basic requirements.</strong>
         ${
           ROLE.scheduling.autoInviteQualified
             ? 'She was shown the booking calendar and can schedule the screening call herself. Expect a Cal.com notification if she books.'
             : `Worth a screening call. Send her <a href="https://kayeputnam.com${ROLE.basePath}/schedule">the booking link</a>.`
         }
       </p>`
    : `<p style="margin:0 0 24px;padding:12px 16px;background:#FBEAEA;border-left:3px solid #B3261E;font-family:sans-serif;font-size:14px;color:#12181B;">
         <strong>Does not meet ${flags.length} requirement${flags.length > 1 ? 's' : ''}:</strong><br>${flags.map(escape).join('<br>')}
         <br><br>Not shown the booking calendar.
       </p>`;

  const watchBanner = softFlags.length
    ? `<p style="margin:0 0 24px;padding:12px 16px;background:#FDF6E7;border-left:3px solid #996116;font-family:sans-serif;font-size:14px;color:#12181B;">
         <strong>Worth asking about:</strong><br>${softFlags.map(escape).join('<br>')}
       </p>`
    : '';

  const html = `<div style="max-width:640px;margin:0 auto;padding:24px;">
    <p style="margin:0 0 4px;font-family:sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#996116;">${escape(ROLE.title)} application</p>
    <h1 style="margin:0 0 24px;font-family:sans-serif;font-size:24px;color:#12181B;">${escape(name)}</h1>
    ${banner}
    ${watchBanner}
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows}</table>
  </div>`;

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.APPLICATION_FROM_EMAIL;

  // Misconfiguration shouldn't look like a candidate problem. Send them to the
  // retry page with the fallback email address rather than a blank success.
  if (!apiKey || !from) {
    console.error('household-apply: RESEND_API_KEY or APPLICATION_FROM_EMAIL is not set');
    return redirect(RETRY);
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: ROLE.notifyEmail,
      replyTo: email,
      subject: qualified
        ? `Application: ${name}, ${ROLE.title}`
        : `[Does not qualify] ${name}, ${ROLE.title}`,
      html,
    });
    if (error) {
      console.error('household-apply: resend rejected the send', error);
      return redirect(RETRY);
    }
  } catch (err) {
    console.error('household-apply: send threw', err);
    return redirect(RETRY);
  }

  return redirect(thanksUrl(qualified, name, email));
};
