---
title: "Before I let Claude touch my work, I wrote it a job description"
slug: "claude-setup"
description: "How my Claude setup for marketing is built: a context layer of rules, 124 skill docs behind 37 commands, 77 scheduled jobs, and a watchdog. Plus a prompt that builds your own context layer in about 45 minutes."
hook: "I wrote Claude a job description first."
tier: "ambitious"
keyword: "SETUP"
tools: ["Claude", "Claude Code"]
timeToBuild: "February 2026"
timeLabel: "Started"
whatItDoes: "A layered setup for the marketing team at the company I run marketing for: written rules for how Claude works with me, the repeated work written down as skills, 77 jobs that run on a schedule, and a watchdog that checks the jobs are still running."
publishDate: 2026-12-01
draft: false

starter:
  time: "about 45 minutes"
  title: "Build your own context layer"
  intro: "Claude interviews you, one question at a time or all at once, then writes three things: an \"about me and how to work with me\" profile that applies to every chat, instructions for a Project around your main recurring work, and your three most repeated tasks as reusable prompts. Before it writes anything, it shows you what it heard and marks its guesses, so you can catch anything it guessed. Plan on about 45 minutes, plus 10 more later in the week to paste in one or two examples of your best work."
  steps:
    - "Open claude.ai and start a new chat. A free account works: preferences are on every plan, and free accounts can make up to 5 Projects."
    - "Copy the prompt below and send it. Answer the questions in your own words. Type \"skip\" for anything you don't want to answer. On a free plan, answering all the questions in one message uses fewer messages."
    - "Check the \"here's what I heard\" summary and fix anything it got wrong before it writes."
    - "Delete any [ADD] lines first. Then open Settings and look for a box for your personal preferences or instructions (it may sit under Profile, Your Claude, or Account; menu names change, so look for the closest match) and paste the profile there. Make a new Project and paste the Project instructions into its instructions box; if your plan has no such box, paste them at the top of a chat whenever you do that work. Save the three reusable prompts in a note, or as files in the Project, and paste one in when you need it."
    - "Run the 1-minute test it gives you, in a brand new chat, to see the difference. Later in the week, paste one or two of your best pieces where it says [ADD LATER]."
  prompt: |
    Help me set up Claude so it already knows me, my work, and how I like things done. You'll interview me, then write three things I can paste into Claude.

    HOW THE INTERVIEW WORKS
    - First, ask me: "One question at a time, or all the questions at once so you can answer in one go?" Then do what I pick.
    - In one-at-a-time mode, wait for each answer. Number them, like "Question 3 of 11."
    - I can type "skip" for any question. A skip means leave it blank. Do not fill it in from my other answers.
    - If an answer is unclear, ask one short follow-up for that answer, no more.
    - If I ramble, that's fine. Pull out the useful parts.
    - Use plain words. No jargon.

    THE QUESTIONS (11)
    1. What's your job, and what are you responsible for?
    2. What does your company sell, to whom, and roughly how big is it?
    3. Who reads or uses your work, and what do they care about?
    4. How should your writing sound? Any words you love or hate?
    5. How do you like answers formatted? (Length, bullets or paragraphs, headings)
    6. When something is "good," what makes it good?
    7. What should I never do?
    8. What's the main piece of work you do over and over?
    9. What rules does that work follow? (Length, approvals, legal, things that get it sent back)
    10. Before you start that work, what should I ask you?
    11. What 3 tasks do you ask for help with most, and what do you have in hand when you start each one?

    BEFORE YOU WRITE ANYTHING
    Show me a short summary titled "Here's what I heard," in bullets. Mark anything you inferred rather than heard with "(my guess)." Ask: "Anything wrong or missing?" Fix it before moving on.

    Then ask: "Do you have 1 or 2 examples of your best work you can paste now? If not, that's fine, I'll leave a spot for them."

    WHAT TO WRITE
    Put each piece in its own code block so I can copy it with one click.

    A) ABOUT ME AND HOW TO WORK WITH ME
    Written in first person ("I'm a..."). Under 200 words. Cover: role, company, audience, voice, formatting, what good looks like, what never to do.

    B) PROJECT INSTRUCTIONS for my main recurring work
    Sections: Context, Rules, Examples, Quality bar, Ask me first. Under 400 words, not counting examples. If I gave no examples, write: "[ADD LATER: paste 1 or 2 of your best past pieces here. This is the biggest improvement you can make.]"
    At the bottom, add my 3 reusable prompts from C, so they live where I work.

    C) MY 3 REUSABLE PROMPTS
    One per task. Use [square brackets] for anything I fill in each time. Each one should be short enough to read in 20 seconds.

    WRITING RULES (for everything above)
    - These writing rules are for what you write here only. Never put them in my profile unless I said them. Drop any (my guess) item I didn't confirm.
    - Only use what I told you. Do not add facts, numbers, years, titles, results, or rules I didn't give you. That includes common marketing rules like calls to action or SEO tips unless I said them.
    - If something is missing, write [ADD: what's missing].
    - Plain language. Short sentences.
    - No em dashes. Use commas, periods, or colons.
    - No hype words: game-changing, unlock, elevate, supercharge, seamless, leverage, robust, revolutionize, cutting-edge.

    AFTER THE THREE PIECES, tell me where to put them:
    - A: Open Settings (click your name or initials, usually bottom left). Go to Your Claude (called Account on some layouts) and find Instructions. Paste A there and save. It now applies to every chat.
    - B: Click Projects in the sidebar and create a new Project. Name it after the work. Paste B into the Project's instructions box. From now on, start that kind of work from inside the Project. Free accounts can make up to 5 Projects. If you don't see project instructions on your plan, paste B at the top of a new chat whenever you do that work.
    - C: Already inside B. Also save a copy in a note so you can use them outside the Project.
    - Menu names change. If something isn't where I said, look for the closest match.
    - If a box says your text is too long, cut the Formatting and What good looks like lines first, then shorten the rest.

    THEN GIVE ME A 1-MINUTE TEST
    Write one short request I can type into a brand new chat (and one inside the Project) to see the difference. Tell me what to look for.

    Last line: "Update these whenever your job changes or you notice yourself correcting the same thing twice."

    If your answer gets cut off, I'll type "continue."

    Start now by asking how I want to answer.
  whatYouGet: "A profile Claude reads in every chat, a Project set up for your main recurring work, and three reusable prompts. When we tested it on a made-up content marketer, the interview surfaced rules most people never write down: the word her company uses for its people, the spelling it uses, what needs legal review, and which customers can be named."

limitation: "It still needs my judgment. Every approval and every review goes through me, and when the work changes, the written context has to change with it."

image: "/builds/claude-setup/cover.jpg"
imageAlt: "The four layers of the setup: written context, skills, scheduled jobs, and a watchdog."
heroPhone: "/builds/claude-setup/phone-full.jpg"
heroPhoneAlt: "On a phone: the four layers of the setup, the 77 scheduled jobs by category, and the watchdog."
tldr: "Kaye Putnam's Claude setup for marketing starts with a context layer: written rules for how Claude should work with her, plus a context file for each project. On top of that sit 37 commands backed by 124 skill docs, 77 scheduled jobs, and a watchdog that checks the jobs are still running. She estimates her team is 5 to 10 times more productive than before. Anyone can build the first layer in about 45 minutes with the prompt on this page."
faq:
  - question: "Do I need to code?"
    answer: "No. The free version runs in a normal Claude chat. My full setup uses Claude Code for the skills and scheduled jobs, but the context layer is where it starts, and that part is just writing."
  - question: "Does this work on a free Claude account?"
    answer: "Yes. Profile preferences are on every plan, and free accounts can create up to 5 Projects. If your plan doesn't show project instructions, paste them at the top of your chat instead."
  - question: "What's the parking lot?"
    answer: "A running list Claude adds to when it notices something I didn't ask about, like a broken link or a stale number. It writes the item down instead of interrupting me, and I clear the list several times a week."
  - question: "Isn't this what Claude's memory does?"
    answer: "Memory picks things up as you go. A written context layer is what you decide Claude should know on day one, in your words. If you use both, nothing breaks."
---

Before I let Claude touch my work, I wrote it a job description. Who I am, what good looks like, what to do first, and what never to do without asking. Everything else in my setup sits on top of that page.

I run marketing for a company with a small team and a long list of channels. This is how the setup is built, layer by layer, and the first layer is the one you can copy today.

### The context layer comes first

![Four layers: written context at the bottom, then skills, then scheduled jobs, then a watchdog on top.](/builds/claude-setup/layers.png)
*Each layer only works because the one below it exists.*

There's one global file of how-we-work rules that Claude reads before anything else. A few of them do most of the work. Give me the answer first, then one next step. Keep it short unless I ask for depth, and a single word from me can change how deep it goes. When it notices something I didn't ask about, it writes it in a parking lot instead of interrupting me, and I clear that list several times a week.

Then every project gets its own context file: what the project is, the rules that apply there, and what done looks like. There are 20 of these now, one for each project I work in.

### Then the work I repeat, written down once

Anything I explain to Claude twice gets written down. That's how I ended up with 37 reusable instructions (Claude calls them skills), backed by 124 written guides: our writing rules, how we plan a webinar, how we package a podcast episode. Each one is written once and reused every time, and when the result isn't right, I fix the skill instead of the output.

### Then the jobs

![77 scheduled jobs by category: lead and email list cleanup 14, analytics and SEO 14, team and client ops 12, content harvesting 11, paid ads 8, briefings 7, our cabin brand 6, self-maintenance 5.](/builds/claude-setup/categories.png)
*The categories are mine. Each job does one small chore on a schedule.*

Once the skills were solid, I started putting them on a schedule. There were about 25 scheduled jobs at the end of July. There are 77 now: cleaning up the lead list, checking the ads every morning, pulling reports, writing my morning brief, and harvesting ideas and customer language for the team to use.

### The job that watches the jobs

![A watchdog checks every scheduled job each day and flags any that stopped running, and a drift check compares what's running with what's meant to run.](/builds/claude-setup/guard.png)
*Built after 13 jobs went quiet for a week.*

Once, 13 jobs failed silently for a week. Nothing broke loudly, so nobody noticed. So I built a watchdog that checks every job each day and flags any that stopped running, plus a check that what's running matches the list of what should be.

### What it adds up to

It's hard to measure precisely, but I'd guess we're 5 to 10 times more productive than we were before Claude. It still needs my judgment. Every approval and every review goes through me.

### Start where I started

The free version below builds the first layer for you: the job description. Claude interviews you, shows you what it heard, and writes your profile, your Project instructions, and your three most repeated tasks as prompts. That's the layer everything else in my setup depends on.

![Part of the profile the prompt wrote for a made-up content marketer: who she is, her audience, her house words and spelling, and what never to do.](/builds/claude-setup/starter.png)
*Part of the profile it wrote in our test, for a fictional marketer. Trimmed for length.*
