---
title: "Packaging one podcast episode used to take most of a week"
slug: "podcast-workflow"
description: "How I turned our podcast's packaging from most of a week into about two hours with Claude: 15 pieces of content per episode, scheduled on a release-day timetable, plus a prompt that builds your own packaging kit from one transcript."
hook: "Packaging one podcast episode used to take most of a week."
tier: "starter"
keyword: "PODCAST"
tools: ["Claude", "Whisper", "Claude Code"]
timeToBuild: "February 2026"
timeLabel: "Built"
whatItDoes: "One recorded episode of our podcast, Get Paid for Your Pad, goes in. Claude writes 15 pieces of content from it, from titles and show notes to carousels, clip picks, and a blog article, and then the uploads and posts get scheduled on a release-day timetable. A person reviews every piece and edits the Reels."
publishDate: 2026-12-01
draft: false

starter:
  time: "about an hour"
  title: "Turn one transcript into your whole release kit"
  intro: "Paste one episode transcript (a podcast, a webinar, or a YouTube video) and Claude hands back titles, show notes, a newsletter blurb, a LinkedIn post, a carousel outline, clip picks with start and end times, a release-day schedule, a note for your guest, and a list of every fact to check. The first run takes about an hour, mostly getting the transcript out of your recording tool and checking the quotes. After a few episodes it's 25 to 35 minutes."
  steps:
    - "Export the transcript from the final, edited episode if you can, with timestamps and speaker names on. YouTube: open the video, click ...more under it, then Show transcript, and copy it (or download captions in YouTube Studio under Subtitles). If the episode isn't out yet, upload it as Private first; captions appear within a few hours. Riverside and Descript: export the transcript from your edited project, not the raw recording, as a .txt file. Zoom: cloud recordings with transcripts turned on have a transcript file on the recording's page. Otter: open the conversation and export the text."
    - "Cutting anything, anywhere, shifts every timestamp after the cut. Use the edited file, or tell Claude the timestamps are from the raw recording so it warns you."
    - "Open claude.ai and start a new chat. A free account works for shorter episodes; a long transcript may need a paid plan or a few \"continue\" messages. Copy the prompt below, fill in every [bracket] at the top, and paste or attach the transcript at the bottom. Copy links from the real profiles; don't type them from memory."
    - "Read the Check first section before anything else, then spot-check each quote by searching for it in the transcript. Watch every clip before you post it."
    - "To reuse it every week, make a Claude Project called Episode kit and paste the prompt into the box labeled Instructions. Then each episode is the bracket lines and a transcript."
  prompt: |
    I need to package one episode of my show for release. I'm a marketer, not an editor. Give me finished drafts I can paste with light edits, and tell me plainly where I need to check something.

    SHOW NAME: [show name]
    WHO IT'S FOR: [your audience, in one sentence]
    HOST: [host name]
    GUEST: [guest name and role, or "solo"]
    RELEASE: [day, date, time, and time zone]
    PLATFORMS I USE: [only the ones you'll post to this week, for example: Instagram, LinkedIn, YouTube, TikTok, newsletter]
    EPISODE LINK: [paste it, or "not live yet"]
    GUEST LINKS: [paste their website and handles exactly as they appear, or "none"]
    THE LINKEDIN POST IS FROM: [the host's personal profile / the show's page / my own profile]
    TIMESTAMPS COME FROM: [the final edited episode / the raw recording / not sure]

    The transcript is pasted below (or attached).

    STEP 1: CHECK FIRST
    Before writing anything else, give me a short "Check first" section:
    a) Speaker mapping. If the transcript uses Speaker 1 / Speaker 2 (or no labels), tell me who you think each speaker is and the line that told you. If you can't tell, stop and ask me before writing the kit.
    b) Left out. List each personal or sensitive aside you removed (health, family, relationships, money troubles, details about people who aren't on the show). Give the timestamp and a 3 to 6 word description, without repeating the details. If the aside is tied to a business point, say so, and say that the host should decide (ideally with the guest) whether that point can be used.
    c) Likely transcription errors. List words that look misheard (place names, product names, brand names, odd phrases) with your best guess, marked as a guess. Keep the original wording inside quotes, and use your guess only after I confirm.
    d) Timing. If TIMESTAMPS COME FROM is "the raw recording" or "not sure," warn me that clip times and chapters may not match the published episode.
    e) Gaps. Note any stretch with no timestamps.

    STEP 2: THE KIT
    Write these, in this order:
    1. Title options (3-5). Under 60 characters each.
    2. Show notes: a 60-100 word summary, 3-5 takeaways (each with a supporting quote and timestamp), chapters, and links. For chapters, start the first one at 00:00, use at least three, and keep them in order, so YouTube can read them. If TIMESTAMPS COME FROM isn't "the final edited episode," label the chapters "check against the final file." Use only the links I gave you. If I gave none, write [LINK].
    3. Newsletter blurb (only if I listed a newsletter): 80-120 words, plus 2 subject line options.
    4. LinkedIn post: 120-220 words, written from the account I named above. Put the link in the first comment, not the post. Also write a 2-3 sentence version the guest can reshare in their own words if they want to.
    5. Carousel outline: 6-8 slides, 25 words or fewer per slide. Slide 1 is the hook, the last slide is the call to action. If a slide uses a quote, include the timestamp in brackets so I can check it.
    6. Short clip picks (3-5). For each one: start time, end time (use the timestamp of the next line if there's no exact end), rough length, the exact first and last words of the clip, why it works, and one on-screen hook line (10 words or fewer). For a clip with no timestamp, write [no timestamp] and give me the first 6-8 words so I can search for it in my editor. Aim for 20-60 seconds per clip. Remember you only have the words, so tell me to watch each clip before posting.
    7. Release-day schedule: one table, covering release day through 7 days after, in my time zone, for the platforms I listed and no others. Columns: time, platform, which piece from this kit, which link. Don't claim any time is a "best time to post." If I listed no newsletter, skip it.
    8. A short note I can send the guest: the quotes and clips we plan to use, with timestamps, asking them to flag anything they're not comfortable with.

    STEP 3: FACT CHECK
    A list called "Fact check before publishing": every number, result, date, count, or statement of fact from the transcript, with timestamp and who said it. Mark each one as "stated," "hedged" (the speaker said roughly, I think, I'd have to check, or similar), or "general claim" (about the world, not their business, like a health or science claim).

    RULES (these apply to every part)
    - Leave personal or sensitive asides (health, family, relationships, money troubles, details about people who aren't on the show) out of every piece, and list them under Left out.
    - Use only what's in the transcript. No outside facts, examples, stats, or best practices.
    - Never create a number. That includes math on the guest's numbers (no percentages, totals, or "X times" unless someone said them).
    - Anything marked "hedged" or "general claim" stays out of titles, hooks, subject lines, and slide 1. It can appear in the body only in the speaker's own hedged words, with the hedge kept.
    - Don't add cause and effect the speaker didn't state. If the guest said A happened and B happened, don't write "A caused B."
    - What the host says to sum up the guest is not the guest's claim. Use the guest's own words.
    - Quotes are word for word. You may start or end a quote partway through a sentence. If you skip words in the middle, use "..." to show it. Never join lines that aren't next to each other without "...". Don't fix grammar inside quotes. You may cut "um" and "uh" only by using "...".
    - A quote's timestamp is the timestamp of the line it comes from. If the line has none, write [no timestamp]. Never estimate a timestamp. If the transcript is in caption chunks (.srt or .vtt), use the start time of the chunk where the quote begins.
    - The guest's words represent them. Don't paraphrase them as more certain, more general, or broader than they were. If they said a topic was outside their expertise, don't apply their advice to it.
    - Never build a URL or handle from how someone said it out loud. Use the links I gave you or [LINK].
    - If the episode is solo, skip the guest parts (the reshare version and the guest note).
    - Plain writing. No em dashes or en dashes. Don't use: game-changer, dive in, deep dive, unlock, unleash, level up, elevate, supercharge, in today's fast-paced world, here's the thing, let that sink in. Never use the "it's not X, it's Y" pattern (or "isn't X, it's Y"), and don't string short fragments together for drama.

    STEP 4: SELF-CHECK
    Before you finish, check your own output and fix anything that fails: every quote appears word for word in the transcript; no em dashes; no banned words; no hedged numbers in titles, hooks, subject lines, or slide 1; no links I didn't give you. Then end with one line: "Self-check: passed" or what you fixed.

    If your answer gets cut off, I'll type "continue."

    TRANSCRIPT:
    [paste here, or attach the file]
  whatYouGet: "A full release kit you can paste with light edits, plus a Check first section and a fact-check list, so you know exactly what to check before anything goes out. When I tested it on a made-up interview, it kept every quote word for word, wrote [no timestamp] instead of guessing, and flagged the guest's 'roughly doubled' instead of putting it in a title."

limitation: "It writes from the words, so it can't see the video. Left alone, it guessed clip timestamps from where a line sat in the transcript, so every timestamp now gets checked against the real audio timing, and a person still edits every Reel."

image: "/builds/podcast-workflow/cover.jpg"
imageAlt: "One podcast episode in, 15 pieces of content out: titles, show notes, YouTube description, website post, thumbnail text, email, two LinkedIn posts, two carousels, TikTok scripts, clip picks, Reel captions, a blog article, and a formatted transcript."
heroPhone: "/builds/podcast-workflow/phone-full.jpg"
heroPhoneAlt: "On a phone: most of a week down to about 2 hours, the 15 pieces from one episode, the release-day timetable, and the timestamp check."
tldr: "Kaye Putnam automated the packaging of her company's podcast, Get Paid for Your Pad, with Claude: one episode becomes 15 pieces of content scheduled on a release-day timetable, and the work went from most of a week to about two hours across nearly 40 episodes since February 2026. Anyone can build a simpler version with the prompt on this page and one transcript."
faq:
  - question: "Do I need to code?"
    answer: "No. The free version is one prompt in a Claude chat. My version also uploads and schedules everything, which took Claude Code and a small custom tool."
  - question: "Does it work for webinars or YouTube videos?"
    answer: "Yes. Anything with a transcript works. Tell it what kind of recording it is in the first line of the prompt."
  - question: "Can I trust the quotes?"
    answer: "The prompt requires word-for-word quotes with timestamps and ends with a self-check, but search for each quote in the transcript before you publish. It takes a few minutes and it's the step that makes the kit safe to use."
  - question: "Will it edit my video clips?"
    answer: "No. It picks the moments and gives you start and end times and the exact first and last words. You still cut the clips and watch each one before posting."
---

Packaging one episode of our podcast, Get Paid for Your Pad, used to take most of a week. Someone wrote the titles, show notes, YouTube description, website post, email, social posts, and clip picks by hand, every single week.

Now it takes about two hours. I automated the process we already had, step by step, with Claude. Then I spent the week it gave back on things we'd never had time to make.

### One episode in, 15 pieces out

![The 15 pieces Claude writes from one episode: titles, show notes, YouTube description, website post, thumbnail text, email, company LinkedIn post, host LinkedIn post, text carousel, TikTok scripts, clip picks, Reel captions, SEO blog article, formatted transcript, and a quote carousel.](/builds/podcast-workflow/formats.png)
*Every episode since March has produced all 15.*

The episode gets transcribed on my own machine. Claude reads the transcript once to find the hook, the before and after, the tension, the insight, and the proof, and every piece is written from that read. Titles come in three to five options. Carousels rotate styles from week to week so the feed doesn't repeat.

### The week we got back

![Packaging one episode: most of a week before, about 2 hours now.](/builds/podcast-workflow/time.png)

The time saved is only worth something if it goes somewhere. Because the packaging stopped eating the week, every episode now gets a carousel, Instagram stories, and a blog post, none of which we did consistently before. The rest of the time went to bigger things: the YouTube series we're creating, better email marketing, and making our content easier to find in search and in AI answers.

### Release day runs on a timetable

![A release-day timetable: audio and the website at 4am, YouTube at 9am, announcement posts and the email through the day, carousels later in the week, and Reels over the next week or two.](/builds/podcast-workflow/timetable.png)
*Times are Pacific.*

Order matters, so the workflow enforces it. Audio and video go up first, then the website post that embeds them, then the email that links to the post. After every upload, it fetches the episode back and checks the date, the description, and the status. That rule exists because one early episode went out with missing show notes and the wrong date, and nobody wants to find that out from a listener.

### The guard I had to build

![Clip timestamps: guessed from where a line sits in the transcript, now checked against the real audio timing before anyone edits a clip.](/builds/podcast-workflow/guard.png)

Left alone, the AI made up clip timestamps. It estimated them from where a line sat in the transcript, and they looked right until someone went to cut the clip. Now every timestamp gets checked against the real audio timing first. A person still reviews every piece and edits every Reel.

### What the free version gave back

![Claude's output for a fictional interview: title options and a takeaway with its quote and timestamp.](/builds/podcast-workflow/starter.png)
*The prompt on this page, run on a made-up episode of a made-up show.*

I tested the free version on a fictional interview with a candle-shop founder. It kept the quotes word for word, wrote [no timestamp] where the transcript had none instead of guessing, left a personal story out of everything, and kept the guest's hedged "roughly doubled" out of the titles.

### What's under the hood

Whisper transcribes the audio on my Mac. A small custom tool sends the transcript to Claude with a prompt for each format, plus a shared brief on our brand voice and audience. Claude Code then runs the uploads to the podcast host and YouTube, posts the episode page to our website, writes the email, and schedules the social posts, pausing for a person to review at each step.
