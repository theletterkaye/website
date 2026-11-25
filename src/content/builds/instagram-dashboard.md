---
title: "I turned my follower goal into a video game"
slug: "instagram-dashboard"
description: "How I built a private Instagram dashboard with streaks, levels, and badges in 1-2 hours with Claude Code, plus a prompt that builds your own version in 10 minutes."
hook: "I turned my follower goal into a video game."
tier: "starter"
keyword: "DASH"
tools: ["Claude Code", "Astro", "Vercel", "Upstash Redis"]
timeToBuild: "1-2 hours"
whatItDoes: "A private page that tracks my 90-day Instagram goal like a game: a pace line, a daily streak, levels, badges, today's posts, and the follows each post earned. I open it instead of opening Instagram."
publishDate: 2026-12-01
draft: false

starter:
  title: "Build your own in Claude, no code"
  intro: "Ten screenshots and one prompt get you a working dashboard built from your own numbers, plus an honest read on what's working and three posts to make next. It runs in the free version of Claude."
  steps:
    - "You need a Professional account (Settings, then Account type) so Instagram shows you Insights."
    - "Open each of your last 10 posts, tap View insights, and take a screenshot. About 30 seconds a post. Follows show up under Profile activity when Instagram has them."
    - "Open claude.ai, start a new chat, copy the prompt below, fill in the brackets, and attach your screenshots."
    - "The dashboard opens beside the chat. Next week, reopen the same chat, add fresh screenshots, and say \"update the dashboard.\" To show a coworker, use the Share or Publish button on it."
  prompt: |
    I want a one-page Instagram dashboard that makes growing my account feel like a game I'm winning. Build it as an interactive artifact (a single web page) I can open every morning.

    MY GOAL
    - Followers today: [e.g. 2,340]
    - Goal: [e.g. 5,000] by [date]
    - I started on: [date and follower count, or "today"]. If I started today, measure pace from today.
    - Posts I'm aiming for each week: [e.g. 4]

    MY LAST 10 POSTS
    I've attached a screenshot of each post's insights. Read the date, the format (reel, carousel, or photo), views, likes, shares, saves, and follows from each one. If a number isn't shown, treat it as unknown, never as zero.

    BUILD ME:
    1. A goal bar at the top: where I am, where I need to be today to stay on pace, and the follows per day I need from here. Be honest if I'm behind.
    2. My posts ranked by shares + saves (not likes), with the follows each one earned.
    3. "What's working": the 2-3 patterns my best posts share, in plain words, each pointing to the posts that prove it. Only claim what the numbers show. If I gave you too few posts to tell, say so.
    4. "Post next": 3 post ideas built on those patterns, each with a hook I could put on screen.
    5. A streak counted from my post dates, and a "posted" checkbox for each idea. (These can reset when the page reloads. That's fine.)

    Make it look clean and calm, like a well-designed app, not a corporate report. Use only the numbers in my screenshots and nothing invented. When you're done, tell me the one thing I should change this week.
  whatYouGet: "A dashboard with your pace, your posts ranked by what people actually shared and saved, the patterns behind your best posts, and three next posts. When I ran it on my own account, it told me none of my last nine posts had earned a single follow, which was the most useful sentence anyone said to me that week."

limitation: "It can tell me my follows are low. It can't tell me why. The numbers point at the problem, and fixing it still takes a human with taste and a few bad ideas to try."

image: "/builds/instagram-dashboard/cover.jpg"
imageAlt: "Kaye's Instagram dashboard: a 90-day follower goal bar, a day streak, a level, and badges."
tldr: "Kaye Putnam built a private Instagram dashboard with Claude Code in 1-2 hours that turns a 90-day follower goal into a game, with a pace line, streaks, levels, and badges, so she stops opening Instagram to check numbers. Anyone can build a simpler version in about 10 minutes by giving Claude screenshots of their post insights and the prompt on this page."
faq:
  - question: "Do I need to know how to code?"
    answer: "No. The 10-minute version runs entirely inside a Claude chat. My full version used Claude Code, which writes and deploys the code for you, but you still steer it."
  - question: "Does the 10-minute version update itself?"
    answer: "No. You add fresh screenshots each week and ask Claude to update the page. My version updates itself because a small script reads my Instagram Insights twice a day."
  - question: "What does it cost?"
    answer: "The 10-minute version works on Claude's free plan. My full version runs on the same hosting as my website."
  - question: "Why rank posts by shares and saves instead of likes?"
    answer: "Shares and saves mean someone found the post useful enough to keep or pass on, and that's what brings new people to your account. Likes are easy to give and tell you much less."
---

I have ADHD, and Instagram is engineered for brains like mine. I'd open the app to check how a post was doing and resurface twenty minutes later, three reels deep, having learned nothing about my post. And my follower count was doing something worse than wasting time: it was turning a personal, emotional thing into a mood I carried around all day.

So I gave myself a 90-day goal (10,803 to 20,000 followers) and built a place to watch it that isn't Instagram. Claude Code built the first version in an hour or two. Now I check my dashboard instead, and the urge to open Instagram "just to see" is mostly gone.

### The goal bar keeps me honest

![The top of the dashboard: 10.8K followers, a goal of 20K, day 7 of 90, and how far behind pace I am.](/builds/instagram-dashboard/01-goal.jpg)
*Day 7, and I'm behind. It says so in plain words.*

The bar shows where I am, where I should be today to hit the goal, and the follows per day I need from here. I asked for it to be blunt. A number I can see is a problem I can work on, and a feeling about a number is just a feeling.

### Streaks, levels, and badges

![Badges for first post, streaks, ten Trial Reels, a 10K-view post, and follower milestones.](/builds/instagram-dashboard/05-badges.jpg)
*Two of twelve so far. "First graduate" means a Trial Reel did well enough to earn a spot on the main feed.*

This is the part people laugh at, and it's the part that works. Posting earns points, points earn levels, and a streak I don't want to break gets me to post on days I'd otherwise talk myself out of it. My brain will do almost anything for a little flame emoji.

### A plan that moves when I do

![A "Post today" list with posted buttons, and a "Coming up" schedule where some posts are marked "Posted early."](/builds/instagram-dashboard/03-coming-up.jpg)
*"Post whatever feels right. Mark it here and the rest of the plan slides around it."*

My posting plan lives here as a queue. If I post something early because I'm in the mood, I tap "posted" and everything else reflows. Nothing turns red because I went off script.

### The number that actually matters

![Each post with the follows it earned, its views, and its shares.](/builds/instagram-dashboard/04-follows.jpg)
*Follows by post, read from Instagram Insights twice a day, Trial Reels included.*

A script reads my Instagram Insights every morning and evening and sends the numbers to the dashboard. That includes follows per post, which is the one number that moves the goal bar and the one Instagram makes hardest to find. Right now that column is mostly zeros, which is exactly why it's on the page.

### What's under the hood

The page lives on my own website (Astro on Vercel), behind a passcode. A small database (Upstash Redis) holds the plan, what I've marked as posted, and the numbers. I described what I wanted to Claude Code in plain English, looked at what it built, and told it what to change.
