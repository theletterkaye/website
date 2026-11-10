---
title: "Probation for Robots: How I Decide When an Automation Gets to Act on Its Own"
slug: "probation-for-robots"
description: "Every automation in my marketing operation starts in report-only mode and earns write access like a new hire. Here's the system, and where humans stay in the loop."
publishDate: 2026-11-10T12:00:00-05:00
draft: false

category: "AI + Marketing Systems"
tags: ["AI", "Marketing Automation", "Marketing Operations", "AI Agents", "Marketing Systems"]

excerpt: "Most of my automations aren't allowed to change anything until they've proved, in writing, that they'd have gotten it right."

metaTitle: "Probation for Robots: When to Let an Automation Act on Its Own | Kaye Putnam"

keyTakeaways:
  - "Start every automation that changes something in report-only mode, and give it write access only after its record of what it would have done holds up."
  - "Automate the gathering and keep the judgment: anything that spends money gets a named human who has read the evidence."
  - "Move 'we always remember to' rules out of checklists and into systems that can refuse, then audit those guards."
  - "Design systems to fail out loud. A refusal beats a plausible wrong answer, and an alert that's always red trains everyone to ignore it."
  - "Measure automations by counting what they did in the quiet weeks, because a working automation is silent."

faq:
  - question: "When should you let an AI agent or automation make changes on its own?"
    answer: "After it has earned it. Run the automation in report-only mode first, where it writes down exactly what it would have changed. When that record has been right long enough that checking feels like a formality, give it write access, the same way you'd widen a new hire's permissions as they prove themselves."
  - question: "Should AI agents manage paid advertising budgets autonomously?"
    answer: "I don't let them. An automation can assemble the full ad review every week and an agent can propose changes, but nothing that spends money changes until a person who has read the evidence approves it. The gathering is where the hours go, so that's what gets automated, while the spending decisions stay human."
  - question: "How do you keep marketing automations from failing silently?"
    answer: "Make them fail out loud. An AI assistant should refuse and explain why when its live data source is unavailable, rather than answer from stale data. Alerts should baseline what already exists and fire only on new problems, because an alert that is always red teaches everyone to stop reading it."

tldr: "My automations aren't allowed to change anything until they've served a probation period. Here's how it works, where I keep a human in the loop on purpose, and why an automation's best week is the one nobody mentions."

topics: ["AI automation governance", "when to let AI agents act autonomously", "marketing automation best practices", "human in the loop marketing", "AI agents in marketing operations", "marketing operations systems", "automation guardrails", "AI-native marketing", "paid ads review automation"]

ogImage: "/writing-covers/probation-for-robots_cover.webp"

image: "/writing-heroes/probation-for-robots.webp"
imageAlt: "A rocky coastline with green cliffs disappearing into thick grey fog above the ocean"
imageCredit: "Photo by NIR HIMI on Unsplash"
---

For most of this fall, one of my automations had a very boring job. It went looking for duplicate sales records in our CRM every week, and then it wrote me a note.

That's all it did. It didn't merge anything or delete anything. It listed exactly what it *would* have changed, record by record, and then it sat there like a new hire on their second day, waiting to be told it was allowed to touch something.

In October, I gave it permission.

Nothing about the code changed that day. The job was the same job it had been for weeks. What changed was that I had a written record of every decision it would have made, I'd checked that record against reality, and it had been right long enough that checking had become a formality. So it got the keys.

That's the whole philosophy, and the rest of this post is how it plays out across a marketing operation that runs a lot of things while I'm asleep.

## Write access is earned the way a new hire earns it

You wouldn't give someone admin access to your CRM on their first morning. (I hope. If you would, please don't tell me which company you work for.) You'd watch them work, check what they produce, and widen what they're trusted with as they prove they deserve it.

Automations deserve exactly the same treatment, and they make it unusually easy, because a script can tell you in perfect detail what it was about to do. A person can't write you a log of every judgment call they almost made. A job can, every single run, for free.

So the rule I run is simple. Every new automation that changes something starts in report-only mode. It shows me, in writing, what it would have done. When that record has been right for long enough that I've stopped finding anything to correct, it graduates.

The same rule applied to something much more visible this fall. We launched an outbound program where every prospect gets a page on our website built specifically for their business, and a pipeline publishes those pages to the live site. The first batches got checked by hand, page by page. They held up. Now the pipeline publishes on its own.

The probation period is how the trust gets built in the first place, and it's a lot cheaper than finding out the hard way which assumption was wrong.

## Automate the gathering, keep the judgment

Some automations graduate. Some never will, and I decide which is which by asking one question: does the output spend money?

Every Monday at 8:35am, a pack builds itself for our paid ads review. Every campaign, every country, every placement, pulled for the window where the data is actually complete, and then it pings me. That part used to eat a real chunk of my Monday, and now it's waiting for me with my coffee.

I was offered the next step, too: an AI agent that would read the pack, run the analysis, and make the changes unattended. I said no.

The agent proposes. I read the evidence and make the calls, and nothing that spends money changes until a person who has looked at the numbers says so. On the very first run, that person (me) cut one underperforming campaign by a quarter instead of pausing it outright, because I knew something about where that campaign sat in the bigger plan that wasn't in the data. That's precisely the kind of call I want a human making.

I give up about an hour every Monday to keep it that way, and I'd make that trade again every week. The gathering was where the hours went, so that's the part the machine does now.

## Move the rule out of the checklist

Every marketing team I've ever run has had a few "we always remember to" rules. We always check that nobody's enrolled in two email campaigns at once. We always double check the send list. We always look before we publish.

The trouble with a rule that lives in a checklist is that it depends on the most tired person on your team, on their most tired day.

So I've been moving those rules out of people's heads and into the things that can say no. Our email deploy now flat-out refuses to ship if the same person would be live in two published campaigns at the same time. Nobody has to remember. The build fails, and it tells you why.

Then there's the step that's easy to skip: audit the guard itself. A weekly check confirms the protection is actually attached to every campaign. A protection everyone *believes* is switched on is its own special kind of risk, because nobody's looking for the problem it's supposed to prevent.

## Teach your systems to fail out loud

The automation that keeps me up at night is the one that fails *plausibly*, handing over a wrong answer that looks exactly like a right one. A broken system at least throws errors, so somebody notices and it gets fixed.

We have an internal AI assistant that answers questions about our business. When our data moved to a new database this fall, the old one was frozen but still sitting there. So we rebuilt the assistant to refuse, and say why, when its live source is unavailable, instead of quietly answering from the frozen copy. An empty result now counts as a failure rather than a "no match."

"I can't answer that right now" is a feature. It's one of the most important features that assistant has, and it's the one I'd build first next time.

Alerts follow the same logic from the other direction. I had a monthly check that arrived red every single month, and it turned out it was structurally incapable of ever going green. An alert that's always red teaches everyone to stop reading it, which is worse than having no alert at all, because now you've trained the team to skip the next one too. The fix was to accept what already existed as the baseline, and make the alert fire only on something new.

## The quiet-week metric

Here's my favorite week from this fall, and you'd never have known it happened.

Five custom revenue reports got built for five different prospects without anybody opening a file. A Friday job pulled the week's client wins into our team library. The content index rebuilt itself overnight. None of it produced a meeting, a message, or a single "hey, did you see this?"

The report one is my favorite, because it used to take an expert most of an afternoon. Now a sales rep ticks a box in the CRM and the report exists.

You only find out an automation is working by counting what it did, because a working automation is silent. The launch gets the applause. Month five, when it's quietly done the job forty times and nobody's talked about it once, is where the value actually lives.

## The probation checklist

If you're deciding how much rope to give your own automations (AI-powered or otherwise), this is the version I'd hand you:

1. **Start in report-only mode.** Let it write down what it would have done before it does anything.
2. **Graduate it on evidence.** When the record has been right long enough that checking feels pointless, give it the keys.
3. **Put a named human on anything that spends money.** Automate the gathering, keep the judgment.
4. **Turn soft rules into hard ones.** If it lives in a checklist, move it into something that can refuse.
5. **Audit the guards.** The protection you're surest about is the one nobody has looked at lately.
6. **Make it fail out loud.** A refusal beats a plausible wrong answer every time.
7. **Count the quiet weeks.** That's where you'll find out what it's worth.

That CRM cleanup job still sends me a note every week, by the way. It just describes what it already did now, instead of asking permission. It's very polite about it.
