---
title: "My AI has listened to 380 sales calls"
slug: "voc-scanner"
description: "How I built a voice-of-customer scanner that reads every recorded sales call and keeps prospects' exact words in eight categories, what it taught us about price versus trust, and a prompt that does it for your own calls or reviews."
hook: "Your customers already wrote your best copy."
tier: "starter"
keyword: "VOICE"
tools: ["Fathom", "Claude"]
timeToBuild: "April 2026"
timeLabel: "Built"
whatItDoes: "It reads every recorded sales call and keeps what prospects said, in their exact words, sorted into eight categories: objections, desires, pain points, confusion, goals, buying triggers, emotional language, and competitor mentions. It runs every month, and our ads, landing pages, emails, and podcast prep all read it before anyone writes a word."
publishDate: 2026-12-01
draft: false

starter:
  time: "about an hour"
  title: "Find your customers' exact words in one prompt"
  intro: "Give Claude the customer language you already have and it hands back their exact words in eight categories, the themes ranked by how many customers raised them, and five headlines built only from what customers said. Pick whichever input you have. The first run takes about an hour, most of it gathering sources and spot-checking quotes. After that it's 15 to 25 minutes."
  steps:
    - "Pick your input. Any of these work, alone or mixed: sales or customer call transcripts (3 to 10), reviews from G2, Capterra, Trustpilot, an app store, or Google (20 to 100), support tickets exported from your help desk, or open-ended survey answers. If you don't have call recordings, reviews are the fastest start."
    - "Calls: Fathom, Otter, Fireflies, Gong, and Chorus all have a download or copy button. Zoom keeps transcripts on the recording's page on the Zoom website if cloud recording with transcripts was on. Google Meet saves them as Docs in the organizer's Drive. No transcript (for example a Zoom call recorded to your computer)? Upload the recording to a transcription tool such as Otter and download the text. A Zoom .vtt file works if you save it as .txt. Renaming files to call-1, call-2 hides names in the file name only, so the prompt also strips names inside the text. Reviews, tickets, surveys: paste them into one document or attach the spreadsheet export as is. Most review sites have no export button, so copying 30 to 50 reviews into one document takes about 20 minutes."
    - "Public reviews are fine to use. For calls, tickets, and surveys, ask your manager or legal team before uploading customer conversations to any AI tool."
    - "Open claude.ai (a free account works) and start a new chat. Copy the prompt below, fill in every [bracket] at the top, and attach your sources. Count each review, ticket, call, or survey answer as one source."
    - "Spot-check three quotes against the originals before you share the result. That's the step that makes it safe to hand to your team."
  prompt: |
    I'm giving you [NUMBER] sources of customer language for [PRODUCT], which sells [WHAT] to [WHO].
    The sources are: [sales call transcripts / customer call transcripts / reviews / support tickets / survey answers / a mix]
    Names of people on OUR side (never quote them): [names, or "unknown"]

    Your job: find the exact words customers use, so I can write marketing in their language instead of mine. Accuracy matters more than volume. Assume this report will be shared with my team.

    STEP 0. NUMBER THE SOURCES
    - Give every source a short ID in the order it appears: C1, C2 for calls; R1, R2 for reviews; T1, T2 for tickets; S1, S2 for survey answers.
    - Show a table: ID | Type | First 6 words of the source (so I can find it) | Notes. If there are more than 30 sources, show only the count by type instead of the table.
    - Never use file names in citations. They often contain customer names.
    - If two sources look like the same person saying the same thing (for example one review posted on two sites), mark them "duplicate of R3" and count them as one source from here on.

    STEP 1. FIND THE CUSTOMER'S WORDS
    - Calls: transcripts often say "Speaker 1 / Speaker 2" or first names only. Work out who the customer is from context. The customer describes their own business, problems, and budget, and asks about price or how it works. Our side gives the tour, explains features, and asks discovery questions. Say who you picked and why in one line per call, for example: "C2: Speaker 2 is the customer (asks the price, describes their team)." If you can't tell, say so and skip that call.
    - Tickets and chats: quote only the customer's messages, never our agent's replies. If one cell mixes both, the customer is the one describing their own problem; if you can't tell, skip it.
    - Never quote our side, even when they repeat or quote another customer ("one of our customers told me..."). Secondhand quotes don't count.
    - Reviews and survey answers: the whole text is the customer's.

    STEP 2. PULL QUOTES INTO 8 CATEGORIES
    1. Objections: what makes them hesitate or push back
    2. Desires: what they want to have, do, or feel
    3. Pain points: what frustrates them right now
    4. Confusion: what they don't understand, including questions they ask and our own words they don't get
    5. Buying triggers: what made them start looking or say yes (often empty for reviews; that's fine)
    6. Emotional language: words that show fear, frustration, relief, skepticism, delight
    7. Alternatives: competitors, tools, spreadsheets, or people they use or compared us to
    8. Praise and results: what they love and what changed for them

    For each category: a table with Quote | Source ID and timestamp if there is one | Theme (5 words max). Up to 6 quotes per category, most vivid and specific first. If a category has nothing, write "none found".

    QUOTE RULES
    - Verbatim only. Copy their exact words in their exact order. Don't fix grammar or remove filler.
    - You may shorten a quote only by cutting words from its start or end. Never use "..." to join two separate parts.
    - Never invent, paraphrase, or "tidy" a quote. If you aren't sure of the exact wording, leave it out.
    - Before you write the tables, check every quote against its source word for word. Drop any that don't match exactly.

    PRIVACY RULES
    - Replace people's names, the customer's own company, cities, emails, phone numbers, and account numbers with [NAME], [COMPANY], [CITY], [EMAIL], [PHONE], [ACCOUNT].
    - KEEP competitor and tool names (that's what Alternatives is for) and prices or numbers about OUR product ("$49 a seat"), because price objections need them.
    - Replace the customer's private figures (their revenue, salaries, what they pay a person) with [AMOUNT].
    - Leave out completely anything about health, pregnancy or parental leave, marriage or divorce, children, grief, or money trouble at home, even when it's vivid. Don't quote the sentence around it either. At the end, say how many sentences you left out for privacy.

    STEP 3. RANK THE THEMES
    - Merge quotes that mean the same thing under one plain theme ("too expensive" and "can't justify the cost" are one theme).
    - Don't merge things that need different fixes. "Who can see our data" (privacy) and "will I know if the numbers are wrong" (accuracy) are two themes.
    - If a theme has both happy and unhappy quotes, split it or label it "(mixed)" and say how many of each.
    - Count how many different sources each theme appears in (after removing duplicates), not how many quotes. One chatty customer counts once.
    - Table: Rank | Theme | Category | Sources (for example "4 of 25: R3, R9, T2, T5") | Best quote.
    - Order by source count. Break ties by how strongly people said it.
    - If there are fewer than 8 sources, title this table "Early signals" and add one line saying it is not yet a pattern.

    STEP 4. 5 HEADLINES IN THEIR WORDS
    - Build each headline from one or two quotes above. You may change "I/we/our" to "you/your" and add only small connecting words (you, your, the, a, to, and, for, with). No new claims, numbers, features, or promises.
    - Aim at the top-ranked themes: at least one objection stated in the customer's words, one desire, one pain point.
    - Under 15 words. Plain language. No hype words.
    - Under each headline write: From: "exact quote" (source ID).
    - Add a warning line under any headline that:
      - states a result or number ("now it's four days"): "One customer's result. Use as a quote with permission, or get it checked."
      - implies a feature or offer: "Check with sales or product that this is true."
      - is contradicted by other sources: "Other sources disagree: [IDs]."

    STEP 5. WHAT OUR MARKETING IS PROBABLY MISSING
    Three bullets: things customers say often (with source counts) that our website, ads, or emails probably never say.

    PUT THIS AT THE VERY TOP, BEFORE STEP 0
    "At a glance": 4 short lines.
    1. Sources used, skipped (and why), and duplicates removed.
    2. The top 3 themes.
    3. "Left out [N] personal details." (no specifics)
    4. "Quotes are for internal copywriting only. Get the customer's permission before using any as a public testimonial."

    FORMAT
    Tables where asked, short plain sentences everywhere else. No em dashes.
  whatYouGet: "A report your whole team can use: every source numbered, the customers' exact words in eight categories, a ranked list of themes with how many customers raised each one, five headlines built only from their words (each with the quote it came from and a warning if it needs checking), and three things your marketing is probably not saying yet."

limitation: "It only hears what people say on recorded calls, and it only finds what they said. Deciding which objection to fix, and how, is still a human job."

image: "/builds/voc-scanner/cover.jpg"
imageAlt: "Quotes by category from 380 sales calls: 1,096 objections, 1,454 desires, 1,481 pain points, 893 confusion, 973 goals, 1,012 buying triggers, 1,355 emotional language, 531 competitor mentions."
heroPhone: "/builds/voc-scanner/phone-full.jpg"
heroPhoneAlt: "On a phone: the eight categories with their quote counts, the price versus trust finding, the login objection dropping from about 1 in 8 calls to about 1 in 22, and the four places that read the file."
tldr: "Kaye Putnam built a voice-of-customer scanner with Fathom and Claude that reads every recorded sales call and keeps prospects' exact words in eight categories: about 8,800 quotes from 380 calls since February 2026. It showed that price objections didn't predict lost deals and trust objections did, and after her team fixed the login objection it surfaced, that objection dropped from about 1 in 8 calls to about 1 in 22. A free prompt on this page does the same with your own call transcripts, reviews, tickets, or survey answers."
faq:
  - question: "Do I need call recordings?"
    answer: "No. Reviews, support tickets, and survey answers all work, and reviews are the fastest place to start. Call transcripts give you the richest language because people talk more freely than they write."
  - question: "Do I need to code?"
    answer: "No. The free version is one prompt in a Claude chat. My version runs on a schedule and reads every call automatically, which took code."
  - question: "Can I put customer quotes on my website?"
    answer: "Use them to write your own copy in your customers' language. Quoting a specific customer publicly needs their permission, and the prompt says so at the top of every report."
  - question: "How is this different from reading call summaries?"
    answer: "This keeps the customer's exact words, which summaries lose, so the phrase a prospect uses for their problem can become your headline."
---

Your customers already wrote your best copy. They said it on your sales calls, in their own words, and almost nobody on a marketing team goes back to listen.

So I built something that listens for us. Every month, Claude reads our recorded sales calls and keeps what prospects said, word for word, sorted into eight categories. It has read 380 calls since February and kept about 8,800 quotes. Before anyone on my team writes an ad, a landing page, an email, or a podcast question, the AI they write with reads that file first.

### Eight categories, in their words

![Quotes by category from 380 sales calls: objections 1,096, desires 1,454, pain points 1,481, confusion 893, goals 973, buying triggers 1,012, emotional language 1,355, competitor mentions 531.](/builds/voc-scanner/counts.png)
*The real counts from the November report. The quotes themselves stay private.*

Fathom records the calls. A script pulls every prospect call, and Claude reads each transcript and keeps the exact sentences that show an objection, a desire, a pain point, a moment of confusion, a goal, a buying trigger, an emotion, or a competitor. It skips calls it has already read, so each month it only reads the new ones.

### Price was the wrong objection to worry about

![When we matched objections to which deals closed, price objections didn't predict lost deals. Trust objections did.](/builds/voc-scanner/finding.png)

Every marketer I know obsesses over the price objection. When we matched the objections to which deals closed, price objections didn't predict lost deals. Trust objections did. That's a very different brief for a landing page.

### It found an objection we could fix

![Calls with a login or access objection: about 1 in 8 calls from February to July, about 1 in 22 from August to November, after the login collection tool launched in August.](/builds/voc-scanner/login.png)
*Counted from the objection quotes in each call. It's directional, and our website copy changed in the same window.*

Prospects kept hesitating about handing over their logins. The scanner put that hesitation in front of us in their exact words, over and over. To get started with us, prospects have to share access to the accounts we manage for them, and many hesitated. In August we launched a login collection tool that made that step feel safe and simple. After we fixed it, login and access objections went from about 1 in 8 sales calls to about 1 in 22.

### Who reads it

The file is the first thing our AI tools open for anything about customer language. The ad copywriting instructions start from it, landing page drafts start from it, the weekly email opens with prospect language from it, and podcast prep mines the confusion and objection sections for episode questions. Nobody has to remember to go look.

### What the free version gave back

![The free prompt's output on a fictional company's reviews, tickets, and survey answers: an at-a-glance summary, themes ranked by how many customers raised them, and five headlines with the quote each one came from.](/builds/voc-scanner/starter.png)
*The prompt on this page, run on 26 made-up reviews, tickets, and survey answers.*

I tested the free version on 26 made-up reviews, support tickets, and survey answers for a fictional bookkeeping app. It caught a review posted on two sites and counted it once, left out a customer's maternity leave, and flagged that one headline was a single customer's result that needs permission before it goes anywhere public.

### What's under the hood

A script talks to Fathom, sends each new prospect call to Claude with a fixed set of rules, saves one file per call, and rebuilds the summary. A scheduled job runs it on the first of every month and saves the update where the whole team's tools can read it.
