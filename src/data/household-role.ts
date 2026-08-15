/**
 * Household Manager hiring funnel: single source of truth.
 *
 * Every fill-in-the-blank for the hidden funnel pages lives here. Edit this
 * file and the job page, application form, interview brief, trial brief and
 * offer hub all update together.
 *
 * Anything marked TODO still needs a real value before the role goes live.
 */

export const ROLE = {
  /** Base path for every funnel page. Unguessable on purpose, not linked
   *  from anywhere on the site, noindexed, and excluded from the sitemap. */
  basePath: '/hm-9f3k',

  /* ----------------------------------------------------------
     The offer
  ---------------------------------------------------------- */

  title: 'Household Manager',
  town: 'St. Charles',
  state: 'Illinois',

  hoursPerWeek: 10,

  /** Confirmed 2026-08-15. Midpoint of the $25 to $32 local band. */
  hourlyRate: 28,

  /** The days available to work, and the window within each day. Naming these
   *  filters hard and early, which is the whole point of the job page. */
  workDays: ['Tuesday', 'Wednesday', 'Thursday'],
  dailyWindow: '9:00 a.m. and 3:00 p.m.',

  schedule:
    'Tuesday, Wednesday, or Thursday, any time between 9:00 a.m. and 3:00 p.m.',
  scheduleFlexNote:
    'How you split the hours is up to you: two longer days or three shorter ones, whichever suits your week. Once we settle on a pattern it stays consistent.',

  /** Confirmed 2026-08-15. */
  startDate: 'mid-September 2026',

  /* ----------------------------------------------------------
     Household specifics
  ---------------------------------------------------------- */

  /**
   * Kaye works from home most days, so the house is rarely empty.
   *
   * This is a genuine filter, not a footnote. A lot of experienced
   * housekeepers strongly prefer an empty house and will be unhappy in a role
   * where someone is around, so the job page, the checklist, and the
   * application all say it plainly rather than letting it be a surprise on
   * day one.
   */
  employerHome: true,

  /** Set to a string if you get a pet later, or leave null to omit the line. */
  pets: null as string | null,

  /** Confirmed 2026-08-15. Kept short on purpose: two items reads as
   *  standards, ten reads as difficult. */
  nonNegotiables: [
    'Non-smoker, and no vaping on the property',
    'Comfortable with quiet during work calls',
  ],

  /* ----------------------------------------------------------
     Contact + logistics
  ---------------------------------------------------------- */

  /** Where application emails get delivered. */
  notifyEmail: 'kayeputnam@gmail.com',

  /** Shown to candidates who'd rather email than use the form. */
  contactEmail: 'kayeputnam@gmail.com',

  /**
   * Personal contact and address details.
   *
   * These appear ONLY on the pages sent to one person at a time: the interview
   * brief, the trial brief, and the offer. The public job page and the
   * application form carry neither, so the link posted in a Facebook group
   * gives away nothing about where you live or how to call you.
   */
  interviewPhone: '906.370.5293',
  interviewPhoneHref: 'tel:+19063705293',

  street: '304 S 6th Ave',
  zip: '60174',

  parking: 'Park in the driveway or on the street, whichever is easier.',

  /** No alarm system. No key at the start either: Kaye is home to let her in,
   *  and a key gets handed over later only if it turns out to be needed. */
  hasAlarm: false,
  keyAtStart: false,

  payrollService: 'Poppins Payroll',

  /* ----------------------------------------------------------
     Round-one scheduling (10-minute video call)
  ---------------------------------------------------------- */

  scheduling: {
    /** Cal.com link in `username/event-slug` form. */
    calLink: 'kaye-putnam/10min',

    /** Cal.com's embed namespace, which matches the event slug. Taken from the
     *  snippet Cal.com generates: Cal("init", "10min", ...). */
    namespace: '10min',

    /** Where the call actually happens. Set as the event Location in Cal.com,
     *  which generates a fresh link per booking. */
    platform: 'Google Meet',

    /** Shown as a plain fallback link if the embed is blocked. */
    get bookingUrl() {
      return `https://cal.com/${this.calLink}`;
    },

    durationMinutes: 10,

    /**
     * When true, an applicant who clears every basic requirement lands on a
     * thank-you page with the booking calendar right there, and books herself.
     *
     * When false, everyone gets the plain thank-you page and you send the
     * booking link by hand after reviewing.
     *
     * True is the low-friction default: it's a 10-minute call, and the
     * knockout questions already filter out anyone who can't do the job. Flip
     * it to false if you'd rather read every application before anyone books.
     */
    autoInviteQualified: true,
  },

  /* ----------------------------------------------------------
     Derived
  ---------------------------------------------------------- */

  get weeklyPay() {
    return this.hourlyRate * this.hoursPerWeek;
  },
} as const;

/** The duty list, shared by the job page and the trial-day brief. */
export const DUTIES = [
  {
    name: 'Laundry',
    detail: 'Wash, dry, fold, and put away. Bed linens on a regular rotation.',
  },
  {
    name: 'Lunch prep',
    detail:
      "Assembling the kids' lunchbox components and simple lunches for the week. Washing and portioning fruit, sandwiches, snack containers. No gourmet cooking.",
  },
  {
    name: 'Cleaning',
    detail: 'Bathrooms, kitchen surfaces, floors throughout, dusting, trash and recycling.',
  },
  {
    name: 'Reset and tidy',
    detail:
      'Toys, books, papers, shoes, and general clutter back where they belong. Common areas reset before you leave.',
  },
  {
    name: 'Mail and paperwork',
    detail:
      'Sorting mail into simple categories, filing school papers, flagging anything time-sensitive rather than filing it.',
  },
  {
    name: 'Errands and restocking',
    detail:
      'Groceries and toiletries (or placing and putting away pickup orders), dry cleaning, donation drop-offs. Mileage reimbursed.',
  },
  {
    name: 'Light organizing',
    detail:
      'Keeping systems working. Small projects as time allows, not full-house overhauls.',
  },
] as const;

/**
 * Self-qualifying checklist on the job page.
 *
 * `knockout: true` items are genuine requirements. The application form asks
 * the same questions and flags a submission that misses one, so you can skim
 * rather than read every application closely.
 */
export const REQUIREMENTS = [
  {
    text: 'You have reliable transportation and a valid driver’s license',
    knockout: true,
  },
  {
    text: 'You can work on Tuesdays, Wednesdays, or Thursdays, between 9:00 a.m. and 3:00 p.m.',
    knockout: true,
  },
  {
    text: 'You’re comfortable working while I’m home working (I work from home most days)',
    knockout: true,
  },
  {
    text: 'You’re willing to be paid on the books with a W-2',
    knockout: true,
  },
  { text: 'You’re willing to complete a background check', knockout: true },
  { text: 'You can provide two references we can actually call', knockout: true },
  {
    text: 'You notice what needs doing without being told twice',
    knockout: false,
  },
  {
    text: 'You can work independently and make sensible calls without checking in constantly',
    knockout: false,
  },
  {
    text: 'You have experience as a nanny, housekeeper, personal assistant, caregiver, or household manager, or you’ve simply run a busy household well',
    knockout: false,
  },
] as const;

/** How many of the checklist items are hard requirements. Used in copy so the
 *  number never drifts out of sync with the list above. */
export const KNOCKOUT_COUNT = REQUIREMENTS.filter(r => r.knockout).length;

/** Spelled out, because "These 6 are genuine requirements" reads like a form
 *  and "These six" reads like a person. */
export const KNOCKOUT_COUNT_WORD =
  ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][
    KNOCKOUT_COUNT
  ] ?? String(KNOCKOUT_COUNT);

/** What happens after they hit submit. Shown on the job page and the
 *  thank-you page so nobody is left wondering. */
export const PROCESS = [
  {
    step: 'Application',
    detail: 'The form below. Ten minutes, and you can save nothing for later, so do it in one sitting.',
    timing: 'Today',
  },
  {
    step: '10-minute video call',
    detail:
      'A short Google Meet call so we can both check the basics before anyone drives anywhere. You pick the time from a calendar, and you only need a phone or a computer.',
    timing: 'This week',
  },
  {
    step: 'In-home visit',
    detail:
      'For a small number of people. You come see the house, meet me, and ask everything you want to know. About 45 minutes.',
    timing: 'The following week',
  },
  {
    step: 'Paid trial day',
    detail:
      'A full day at full rate, before either of us commits. This is where we both find out if it works.',
    timing: 'Scheduled around you',
  },
  {
    step: 'Offer and background check',
    detail:
      'A written offer, then a standard background check. Payroll set up before your first real day.',
    timing: 'About a week',
  },
] as const;
