---
title: "Every lesson from our last webinar is now a deadline"
slug: "webinar-playbook"
description: "How I turned one webinar retro into a Claude Code skill that plans the next webinar backward from the air date, plus a prompt that builds your own countdown plan in about 30 minutes."
hook: "Every lesson from our last webinar is now a deadline."
tier: "ambitious"
keyword: "WEBINAR"
tools: ["Claude Code", "ClickUp", "Google Calendar", "Slack"]
timeToBuild: "The day after our first live webinar"
timeLabel: "Built"
whatItDoes: "One command builds our whole webinar plan, dated backward from the day we go live: decisions, deck versions, two rehearsals on calendars, every email send, and the closeout. Every mistake from the last webinar is already written into it as a guard."
publishDate: 2026-12-01
draft: false

starter:
  time: "40 minutes"
  title: "Get a countdown plan for your next webinar"
  intro: "One prompt turns your date, topic, and team into a dated plan: what's due this week, both rehearsals, the full email schedule, a run of show, and a calendar file you can import. Plan on 30 minutes to a plan, most of it spent deciding what attendees should leave able to do, and 10 more to get it on calendars."
  steps:
    - "Decide the one thing attendees should leave able to do. This is the slowest part and the most important."
    - "Open claude.ai (a free account works) and start a new chat. Copy the prompt below and fill in each line at the top, replacing the bracketed example. If you don't know one yet, write \"not sure\"."
    - "Send the \"This week\" list to your team. Claude shows the calendar file as text: paste it into a plain-text file saved as webinar.ics and import it (in Google Calendar, Settings, then Import and export). Then forward both rehearsal events to your team so they're booked today."
    - "If your date moves, tell Claude the new date in the same chat and ask it to re-date everything."
  prompt: |
    I'm planning a live webinar and I want a countdown plan my team can start on today.

    TODAY'S DATE: [e.g. Tuesday, January 12, 2027]
    WEBINAR DATE, TIME, TIME ZONE: [e.g. Tuesday, February 16, 2027, 1:00pm Eastern]
    LENGTH: [e.g. 60 minutes]
    PLATFORM: [e.g. Zoom Webinar, Zoom Meeting, Google Meet, Riverside, StreamYard]
    TOPIC AND PROMISE: [one sentence, then "Attendees leave able to..." e.g. "Pour-over at home. Attendees leave able to dial in any new bag of beans in three cups or fewer."]
    TEAM: [name and role for each, e.g. Theo (presenter), Juniper (host), me, Dana (program manager and email)]
    THE ASK AT THE END: [the offer and its deadline, or "none, it's brand building"]
    EMAIL LIST SIZE: [rough number, or "not sure"]
    TOOLS: [email, calendar, task tool, e.g. Klaviyo, Google Calendar, Asana]
    DAYS I CAN'T WORK OR SEND: [e.g. no sends on Mondays, office closed Feb 15]
    COUNTRY (for holidays): [e.g. United States]

    Build the plan backward from the live day (call it T). Use real dates, not just offsets.

    THE STANDARD LADDER (for 8 or more weeks of runway)
    1. Decisions locked by T-42: format (build-along or watch-then-do), the ask and its deadline, roles and backups, targets.
    2. One deck owner: one person owns the slide file (not the content). If I didn't name one, use the program manager and tell me. Deck brief T-49, kickoff call with the presenter T-45 (recorded), v1 T-35, v2 T-28 (demo run once for real), v3 T-14 (full deck, closing slides, speaker notes), deck lock T-7, final PDF T-1.
    3. Copy drafted T-35, approved T-30. Every promise in the copy (length, format, what they take home) checked against the deck brief first.
    4. Build T-30 to T-23, one end-to-end test signup, registration opens T-21.
    5. Two rehearsals: Rehearsal 1 at T-10 (60 min, full timed run, every role, on the real platform). Rehearsal 2 at T-3 (45 min, tech only: camera, light, mic, screen share, demo, record 2 minutes and play it back).
    6. Sends: Send 1 announce T-14, Send 2 T-7, Send 3 last call T-2, Send 4 "starting in 1 hour" on the day. Each scheduled in the email tool 48 hours ahead with a named owner. Plus registrant emails: confirmation, prep email (also for late registrants), day-of reminder, replay to attendees, replay to no-shows. Suggest send times and label them "suggested".
    7. After: replay page built by T-14, retro T+3, numbers vs targets T+10.

    IF THERE'S LESS THAN 8 WEEKS
    - Never compress: the two rehearsals, the 14-day email runway (T-14 to T), the replay page by T-14.
    - Compress everything else, in order: decisions within 3 working days of today, deck brief and kickoff in the same week, copy only after the deck brief exists.
    - If there's less than 3 weeks, tell me plainly to move the date, and show the earliest date where nothing above is compressed.

    SMALL TEAMS
    If there are fewer than 4 people, don't invent backups. Name the single point of failure for each role and give one concrete fallback (for example, record the demo at Rehearsal 2 and keep it ready to play).

    CALENDAR CHECK
    - Move weekend work tasks to the Friday before. Email sends may stay on weekends, including the Sunday last call. Rehearsals never move into the last 2 days.
    - Check every date against public holidays in my COUNTRY and well-known days that hurt email (Thanksgiving week, Dec 20 to Jan 3, Valentine's Day, Mother's Day, the Friday before a long weekend). Flag each one with a fix.
    - If the live day itself is in a bad window, say so first, before anything else.
    - Respect my blocked days, and list every move you made.

    GIVE ME BACK, IN THIS ORDER
    A. Summary, 5 lines max: the anchor date, the first deadline that bites, what's already late and how you compressed it, every calendar conflict.
    B. NOT LOCKED: a short list of anything undecided. Nothing on this list goes in any email or page until it's locked.
    C. THIS WEEK: the tasks due in the next 7 days, with owner. This is what I'll send my team today.
    D. The full plan as a table: Date | Day | T-offset | Task | Owner | Notes. If one person owns more than half the rows, say so and suggest what to hand off.
    E. The email schedule: Send | Date and time | Audience | Purpose | Owner.
    F. Run of show for the live session: minute, beat, who.
    G. Traps to avoid, one line each: no deck owner, no rehearsal, roles changing on the day, copy promising what the deck doesn't deliver, a late send, no replay page. Then add one trap specific to my plan.
    H. An .ics file with five events (Kickoff, Rehearsal 1, Rehearsal 2, Live starting 15 minutes early for a tech check, Retro), with times in my time zone and a short description for each, so I can import it into my calendar in one step. Put the .ics in its own code block, with a UID and DTSTAMP for each event and a TZID such as America/New_York.

    Only ask questions if the webinar date, topic, or team is missing. Ask them all in one message. Otherwise build it, and mark anything else NOT LOCKED.
    No em dashes.
  whatYouGet: "A plan you could forward to your team the same day. When we tested it on a fictional coffee brand's February webinar, it flagged the deadline due tomorrow, moved both rehearsals off Saturdays, and caught that the last-call email landed on Valentine's Day, with the office closed for Presidents' Day the day before the webinar."

limitation: "Everything it knows, it learned from one webinar, so it's very sure about things it has only seen once. Our January webinar is its first real test, and I fully expect it to come back with new traps."

image: "/builds/webinar-playbook/ladder.png"
imageAlt: "A webinar countdown plan dated backward from the live day: decisions, deck versions, two rehearsals, four email sends, and the closeout."
heroPhone: "/builds/webinar-playbook/phone-plan.png"
heroPhoneAlt: "A sample webinar countdown plan on a phone, scrolling from decisions eight weeks out to the closeout ten days after."
tldr: "Kaye Putnam built a Claude Code skill the day after her team's first live AI webinar that plans every future webinar backward from the air date, with two rehearsals booked on day one, one deck owner with dated versions, and every past mistake written in as a guard. A single prompt on this page gives anyone a dated countdown plan, an email schedule, and a calendar file in about 30 minutes."
faq:
  - question: "Do I need Claude Code to do this?"
    answer: "No. The 30-minute version runs in a normal Claude chat. My version lives in Claude Code because it also creates the tasks in our project tool and drafts the calendar invites for me to send, but the plan itself is the valuable part."
  - question: "What if my webinar is less than eight weeks away?"
    answer: "The prompt compresses everything except the two rehearsals, the 14-day email runway, and the replay page. If you have less than three weeks, it tells you to move the date and shows the earliest one that works."
  - question: "Does it write the webinar for me?"
    answer: "No. It schedules the deck versions and the rehearsals. Making the talk good is still your job, and the rehearsals are where that happens."
  - question: "Why two emails in the last 48 hours?"
    answer: "Across the webinars I've hosted, the last-call email pulls in more registrations than the first two sends combined. People register when it's urgent, so don't judge the campaign before then."
---

I'd read a retro once, nod at it, and never open it again. So the day after our first live AI webinar, I skipped the document and built the retro into a Claude Code skill. Now it reads every lesson from that day before it plans the next one.

I type one command and get the whole plan, dated backward from the day we go live.

### Every task gets a date

![A webinar countdown ladder: decisions eight weeks out, deck versions, copy, build, a 14-day email runway, the live day, and the closeout.](/builds/webinar-playbook/ladder.png)
*A recreation of the plan's shape with placeholder roles. The real one lives in our project tool.*

Decisions close six weeks out. Copy waits until the deck brief exists, so we never promise something the talk doesn't deliver. Registration opens three weeks out, and the email runway is 14 days long.

### Two rehearsals, booked on day one

The first rehearsal is a full timed run ten days out, with every role, on the real platform. The second is a tech check three days out: camera, light, mic, and the demo end to end. Both invites go on calendars the same day the plan is built, before anyone's week fills up. A rehearsal that isn't on the calendar on day one doesn't happen.

### One deck owner, three dated versions, then a lock

One named person owns the slide file. The deck gets three dated versions, then it locks a week out. Nobody has to wonder which file is final, and the copy gets checked against the deck before it ships.

### The last 48 hours do the heavy lifting

The plan puts two sends in the final 48 hours: a last call on the Sunday afternoon before, and a "starting in an hour" email the day of. Across every webinar I've hosted over the years, that last-call email pulls in more registrations than the first two sends combined. So the plan protects that send, and nobody judges the campaign before then.

### Every mistake becomes a guard

![Webinar traps paired with the guard that now prevents each one.](/builds/webinar-playbook/traps.png)
*A recreation with generic examples.*

Every problem from our first webinar is written into the skill as a named trap, paired with the task that prevents it. Traps never get deleted. After each webinar, new ones get added, so every plan starts with everything we've learned so far.

### What the 30-minute version gave back

![Claude's output for a sample webinar: a summary, what's not locked yet, and this week's tasks with owners.](/builds/webinar-playbook/starter-output.png)
*The prompt on this page, run for a fictional coffee brand's February webinar.*

I tested the free version below on a made-up coffee brand. It found the deadline due tomorrow, moved both rehearsals off Saturdays, and flagged that the office would be closed for Presidents' Day the day before the webinar.

### What's under the hood

It's a Claude Code skill, a saved set of instructions Claude follows inside our team's tools. Before it asks me anything, it searches our Slack and meeting notes for the topic and date. Then it writes one profile with every fact about the webinar, creates the dated tasks in ClickUp, and proposes the calendar invites. Anything not decided yet is marked as not locked and can't appear in any email or page. Every piece of copy stops for a human to review.
