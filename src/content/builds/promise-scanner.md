---
title: "Every promise I make on a call is waiting for me the next morning"
slug: "promise-scanner"
description: "How my AI promise scanner reads every recorded call, finds what I promised and what I'm owed, and files one follow-up digest each evening, plus a prompt that does it for one call in Claude."
hook: "Every promise I make on a call is waiting for me the next morning."
tier: "starter"
keyword: "PROMISE"
tools: ["Fathom", "Claude", "ClickUp"]
timeToBuild: "July 2026"
timeLabel: "Running since"
whatItDoes: "Every weekday evening it reads the transcripts of that day's calls, finds every promise I made and every promise someone made me, and files them as one follow-up list with a link to the exact moment each one was said."
publishDate: 2026-12-01
draft: false

starter:
  time: "20 minutes"
  title: "Get every promise from one call, in one prompt"
  intro: "Paste or attach a call transcript and Claude hands back what you promised, what you're owed, the maybes, and a recap you can send. It keeps anything personal off the list. You need a transcript from a call that was already being transcribed; if yours wasn't, turn transcription on now and try this after your next call. The first run takes about 20 minutes, mostly finding where your transcript lives. After that it's 3 to 5 minutes a call."
  steps:
    - "Get the transcript. Easiest: a recorder like Fathom, Otter, or Fireflies has a Copy transcript button. Zoom (paid plans): at zoom.us go to Settings, then Recording, and turn on Cloud recording and Create audio transcript. After the call, open Recordings, wait for the transcript, and download it. Google Meet (some paid Workspace plans): during the call click Activities, then Transcripts, then Start. The Doc lands in the organizer's Drive, so ask them to share it if that isn't you. Teams: open the meeting chat after the call and download the transcript from Recap."
    - "Open claude.ai (a free account works) and start a new chat. Copy the prompt below and fill in the three lines starting MY NAME, replacing the brackets."
    - "Paste the transcript under the prompt, or attach the file as is. Timing codes are fine, and a one-hour call fits."
    - "To make it permanent: if your Claude plan has Projects, make one called Follow-ups and paste everything except the MY NAME, CALL DATE, and MY TEAM lines into the box labeled Instructions. Then each chat is those three lines and the transcript."
  prompt: |
    You're my follow-up assistant. Below is a transcript of a call I was on. Turn it into a follow-up list I can act on and safely share.

    MY NAME IN THE TRANSCRIPT: [as it appears, e.g. Dana Kettleworth. If your tool shows "Speaker 1, Speaker 2", write "not sure"]
    CALL DATE: [e.g. Thursday, November 19, 2026]
    MY TEAM: [names of people whose promises to others I also want tracked, or "just me"]

    If my name says "not sure", work out which speaker I am from context, tell me who you picked in the first line, and keep going.

    WHAT COUNTS AS A PROMISE
    - Something I said I'd do after the call: "I'll send you...", "Let me follow up on...", "I'll set up...", "I can get you that by Friday."
    - Something another person said they'd do for me after the call: "I'll send you the logins", "I'll get you the numbers Monday."
    - If someone agreed to something I asked for ("Can you send me X?" "Yep"), that's their promise to me.
    - It must have a finishable outcome I could check off.

    WHAT DOES NOT COUNT
    - Things done during the call ("let me pull that up right now").
    - Ideas with no deliverable ("we should think about pulling back on ads").
    - Ongoing focus ("I'm going to keep working on our ads").
    - The same promise said twice. List it once, and use the clearest quote.
    - Promises between other people. Only list them under "Team promises" if the person promising is on MY TEAM as I defined it above. Everyone else's go in one line under "Not mine to chase".

    PRIVATE THINGS STAY OFF THE LIST
    Never put anything about health, medical appointments, salary or compensation, job performance, or someone's family or personal life on the list, even if it's a real to-do for me. Instead, end with one line: "Held back: [number] personal item(s), see [timestamp]." No other details. Assume this list will be shared.

    IF YOU'RE NOT SURE
    Put it under "Maybe" with a few words on why ("said no promises", "said maybe"). I'd rather delete a maybe than miss a promise.

    DATES
    - Turn "tomorrow", "Friday", "next week" into real dates using the call date.
    - "Before Monday" or "end of week" means the last working day before it.
    - "Next week" with no day: suggest a date midweek and say "suggested".
    - If the transcript has no timestamps, write [no timestamp]. Never invent one.
    - Never put a due date on a weekend or a public holiday where I live. If a holiday changes things, say so in one line.
    - Never invent a deadline. If none was said, write "suggested" plus 3 to 6 words on why.

    FORMAT
    First line: "[N] for you, [N] owed to you, [N] maybes."

    ## My promises (soonest first)
    - [ ] Verb-first task, 10 words max (to: Name) Due: Day Mon DD
      "exact words" [timestamp]

    ## Owed to me (grouped by person)
    - Task (from: Name) Due: Day Mon DD
      "exact words" [timestamp]

    ## Team promises (only if I named a team)
    ## Maybe
    ## Not mine to chase (one line)
    Held back line (only if something was held back).

    ## Recap I can send
    A plain-text message of 3 to 6 lines I could paste into Slack or email to the people on the call: who owes what, by when. No quotes and no timestamps. Leave out anything you held back, and only include due dates someone actually said.

    RULES
    - If nobody made a promise, say so. Don't pad the list.
    - No em dashes.

    TRANSCRIPT:
    [PASTE OR ATTACH HERE]
  whatYouGet: "A list of what you promised (with real dates and the exact words), what other people owe you, the maybes, one line for anything personal it held back, and a short recap you can paste straight into Slack or email."

limitation: "It only knows about calls that were recorded. A promise I make in a hallway, a text, or a voice memo still lives in my head, and my head is the reason I built this."

image: "/builds/promise-scanner/cover.jpg"
imageAlt: "A follow-up digest with sections for my promises, ones filed as their own tasks, what others owe me, one item held back for privacy, and an expired item. Placeholder data."
heroPhone: "/builds/promise-scanner/phone-full.jpg"
heroPhoneAlt: "The daily follow-up digest on a phone, followed by a single task card showing the promise, the call it came from, the exact words, and a link to the recording. Placeholder data."
tldr: "Kaye Putnam built an AI promise scanner with Fathom, Claude, and ClickUp that reads every recorded call each weekday evening and files one follow-up digest: her promises, what others owe her, and a privacy section that holds back anything personal. It has caught about 650 promises across about 160 calls since July 2026. A free prompt on this page does the same for one call in Claude."
faq:
  - question: "Do I need to code?"
    answer: "No. The free version is one prompt in a Claude chat. My version runs on a schedule and talks to my recorder and task app, which took code, but you get most of the value from the prompt."
  - question: "Which call recorders work?"
    answer: "Anything that gives you a transcript with speaker names: Fathom, Otter, Fireflies, Zoom, Google Meet, or Teams, if your plan includes transcripts."
  - question: "What about private things people say on calls?"
    answer: "The prompt keeps health, salary, job performance, and family items off the list and leaves one line saying something was held back, with a timestamp so you can find it yourself."
  - question: "Why one digest instead of a task for every promise?"
    answer: "Because a task for every promise buried me. One week my first version created 46 tasks and I closed 9. One list a day, with only the urgent items filed on their own, is something I can actually get through."
---

I make a lot of promises on calls. "I'll send that over." "Let me follow up on this." "I can get you that by Friday." Every one of them is sincere when I say it, and my ADHD brain simply cannot be trusted to just remember them.

So I stopped asking it to. Every weekday evening, a scanner reads the transcripts of that day's calls, pulls out every promise, and files them in ClickUp as one list. When I sit down the next morning, everything I said I'd do is already there, with a link to the exact moment I said it. It has caught about 650 promises across about 160 calls since July.

### One list, five sections

![A follow-up digest titled Follow-ups: Fri Nov 20, with sections for my promises, filed as their own tasks, others owe you, held back by the privacy filter, and expired this week.](/builds/promise-scanner/digest.jpg)
*A recreation with placeholder data. The real ones are full of client names.*

My promises get checkboxes. Anything with a prospect or client waiting, or due in the next few days, gets filed as its own task so it can't hide in a list. Promises other people made me get their own section, and the scanner never assigns those to them, so nobody gets a surprise notification from my robot. Anything I haven't touched in two weeks moves to an Expired section on Fridays instead of piling up.

### Nobody presses a button

![Weekdays at 6:02 pm: pull today's call transcripts from Fathom, find every promise with Claude, hold back anything personal, file one digest in ClickUp.](/builds/promise-scanner/schedule.jpg)
*Four steps, every weekday evening.*

Fathom records the calls. Claude reads each transcript and decides what counts: something with a finishable outcome that someone agreed to do after the call. Things done during the call, vague ideas, and the same promise said twice don't make the list. Then it files everything in ClickUp.

### Why it files one digest

![Version 1, a task per promise: 46 created and 9 closed in one week. Version 2, one digest a day with five sections.](/builds/promise-scanner/redesign.jpg)
*The redesign, side by side.*

The first version made every promise its own task, and it worked exactly as designed. One week it created 46 tasks and I closed 9. A system that hands you more work than you can finish is just a faster way to fall behind, so I rebuilt it to file one digest a day and only break out the urgent ones.

### Why it holds things back

People say personal things on calls, and a transcript doesn't know the difference between "I'll send the deck" and "I need to call my doctor back." When I tested the free version of this prompt on a made-up call, its first draft put a biopsy callback on a follow-up list someone might forward to their whole team. Mine holds anything about health, pay, performance, or family off the list and leaves one line with a timestamp, and now the free one does too.

![The free prompt's output on a fictional coffee company's weekly sync: 6 promises, 2 owed, 2 maybes, 1 personal item held back, and a recap ready to send.](/builds/promise-scanner/starter.jpg)
*The free prompt, run on a fictional call. Everything here is made up.*
