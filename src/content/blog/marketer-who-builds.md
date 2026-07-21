---
title: "The Marketer Who Builds Is Rediscovering Why IT Departments Exist"
slug: "marketer-who-builds"
description: "AI lets marketers ship real software now. The pitch skips the second half of the job: owning the code means owning the patches, upgrades, and outages."
publishDate: 2026-07-21T12:00:00-04:00
draft: false

category: "AI + Marketing Systems"
tags: ["AI", "Marketing Systems", "Marketing Operations", "MarTech"]

excerpt: "The 'marketer who builds' pitch is one word long. The actual job turns out to be two: build, then maintain."

metaTitle: "The Marketer Who Builds Is Rediscovering Why IT Departments Exist | Kaye Putnam"

keyTakeaways:
  - "AI has handed real software-building speed to every marketer with a laptop. The speed is real and worth keeping."
  - "The pitch is 'build.' The job is 'build, then maintain': patches, upgrades, and dependencies that rot quietly."
  - "Maintenance risk is invisible on marketing dashboards. Everything reads green right up until the outage."
  - "Import engineering discipline on purpose: change control, scheduled dependency hygiene, and a real maintenance budget."

faq:
  - question: "Should marketers build their own software tools with AI?"
    answer: "Yes, the speed advantage is real. A marketer who can build closes the loop between idea and shipped tool in hours instead of sprints. But go in knowing the full job: everything you ship becomes something you maintain, patch, and upgrade. Budget for that second half from day one."
  - question: "What are the risks when marketing teams own their own tech stack?"
    answer: "The biggest risk is invisible maintenance debt. Security holes get discovered in the tools you built on, frameworks release breaking versions, and dependencies quietly rot. None of it shows up on traffic or conversion dashboards, so everything looks fine until an outage or breach forces the issue."
  - question: "What engineering practices should marketing teams adopt?"
    answer: "Three translate directly: change control (pull requests for anything touching production, even on a team of one), dependency hygiene as scheduled calendar work rather than emergency response, and a real budget line for maintenance so it happens before things catch fire."

tldr: "Marketing keeps absorbing the tech stack, and AI means a non-engineer can now ship real software to production. The pitch skips the second half of the job: once you own the code, you own the patches, the upgrades, and the outage."

topics: ["AI marketing tools", "marketing technology stack", "marketers who code", "marketing operations", "technical debt in marketing", "engineering practices for marketers", "martech maintenance", "AI-assisted development", "marketing team structure"]

image: "/writing-covers/marketer-who-builds_cover.webp"
imageAlt: "Aerial view of a city skyline at night with the phrase: This is why IT departments exist"
---

I was on a call this week watching a deploy quietly undo itself.

A routine change had rolled back a piece of live infrastructure, and a few things half the team relies on went sideways. Our AI lead and I traced it, fixed it, and sat for a second in that specific silence you get after something breaks in production. Then we both said the same thing at almost the same time.

"This is why IT departments exist."

We laughed because it was true, and because I've spent the last stretch of my career walking happily into the exact thing those departments were built to handle.

## The superpower is real

Let me say the good part first, because it's real and I'm not here to talk anyone out of it.

A marketer who can build is fast in a way that's hard to appreciate until you've worked the other way. There's no ticket sitting in a queue, no handoff meeting where you explain what you want to someone who explains it to someone else, and no "engineering can pick this up next sprint." You have the idea, you ship the idea, and the loop between the two is measured in hours.

I've been chasing that feeling since 1997, when I was an awkward eleven-year-old teaching myself HTML to build a website called the Kool Kidz Klub. (A black background, glitter-dusted portal of AWESOME. The web has calmed down since then; I haven't.) The thrill of "I imagined this and now it exists" hooked me early, and AI has now handed that thrill to every marketer with a laptop. You can describe what you want in plain language and get working software back. The number of people who can build their own tools just went up by an order of magnitude, and it's still climbing.

So yes. If you're the marketer who can build, lean in.

Now let's look at the invoice.

## The bill nobody itemizes

The "marketer who builds" pitch is one word long: build. The actual job turns out to be two words: build, then maintain.

Software you ship is a living thing that needs care. Security holes get discovered in the tools you built on, so you patch them. The frameworks you used release new major versions, so you upgrade, and upgrading breaks things, so you fix those too. Dependencies you never think about quietly rot until two of them stop speaking to each other. None of this shows up in the demo, and all of it shows up later, usually together, usually at a bad time.

Engineering organizations spent decades building formal practice around this unglamorous 80 percent of software. They don't love process any more than you do. (Nobody loves process.) They formalized it because they learned, expensively, what happens without it.

I'm now learning the same lessons on the same tuition plan. One broken deploy at a time.

## Marketing owns the site, so marketing owns the risk

Here's what a chunk of my week actually looked like: upgrading our website's framework a full major version and clearing security vulnerabilities flagged critical and high out of our dependencies. Decidedly un-marketing work. But marketing owns the site now, and owning the site means you don't get to keep only the fun parts.

The trap is that this risk is invisible on every dashboard you check. Traffic looks fine, conversion looks fine, the site loads. Everything reads green right up until the morning it doesn't, and by then you're explaining an outage (or worse, a breach) instead of scheduling an upgrade. The cost was accruing the whole time. You just couldn't see the meter.

## Import the discipline on purpose

The speed is too valuable to give back, so the move is to borrow engineering's solution deliberately instead of rediscovering it through outages. In practice, three things changed how I work:

**Change control, even for a team of one.** I submit formal pull requests for anything that touches our backend systems, because a careless deploy is exactly how you silently roll back live infrastructure. (Ask me how I know.)

**Dependency hygiene on the calendar.** Patching and upgrades are scheduled work now, sitting right next to reporting, instead of things I get to once something is already on fire.

**A real line in the budget for maintenance.** Unbudgeted work happens only after it becomes an emergency, and emergencies bill at a steep markup.

None of this is exciting, and that's the point. The discipline is boring precisely because it's the accumulated scar tissue of everyone who tried to skip it.

Somewhere in your company, a marketer is about to ship their first real software. Buy them a coffee and tell them about change control, before production explains it first.
