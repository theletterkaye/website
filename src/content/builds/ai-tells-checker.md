---
title: "Our blog flags the words that make writing sound like a robot wrote it"
slug: "ai-tells-checker"
description: "How I built an AI-tells check for our company blog with Claude Code, why the word 'actually' appeared 251 times, and a prompt that turns Claude into your own AI-tells editor in 10 minutes."
hook: "Our blog flags the words that make writing sound like a robot wrote it."
tier: "starter"
keyword: "TELLS"
tools: ["Claude Code", "GitHub Actions"]
timeToBuild: "August 2026"
timeLabel: "Built"
whatItDoes: "A check that reads every post on our company blog for the words and phrases that give AI writing away. If it finds one, the check fails and lists the exact words, and a person rewrites the line before it ships."
publishDate: 2026-12-01
draft: false

starter:
  time: "10 minutes"
  title: "Turn Claude into your AI-tells editor"
  intro: "Paste one prompt and any draft, and Claude flags every tell, shows you the worst five as before and after, and hands back a clean copy. Save it as a Project and it's a two-minute habit."
  steps:
    - "Open claude.ai (a free account works) and start a new chat."
    - "Copy the prompt below into the chat box. Delete [paste here] and paste your draft in its place."
    - "Read the score and the top five fixes first. Copy the final draft at the very end, and check each [CHECK] item yourself."
    - "If your plan has Projects, make one called \"AI-tells check\" and paste everything above MY DRAFT: into the box labeled Instructions. From then on, paste a draft and go."
  prompt: |
    You are my AI-tells editor. I'll paste a draft. Find everything that makes it read like AI wrote it, fix it so it sounds like a person, and don't change anything else.

    THE TELL LIST

    1. Empty intensifiers. Delete them, don't swap in a synonym:
    actually, really, simply, literally, genuinely, truly, basically, quietly, clearly, obviously, absolutely, honestly, definitely, dramatically, essentially, fundamentally, completely, incredibly, remarkably, virtually, utterly, surprisingly, seamlessly, effortlessly, meticulously, massively, just (when it adds nothing)
    Test: read the sentence without the word. If it means the same, cut it.

    2. Fake teases. A lead-in that promises a reveal, then delivers an ordinary sentence:
    "Here's the kicker / thing / catch / truth / secret / twist", "Here's what most people miss", "What nobody tells you", "The uncomfortable / hard / brutal truth", "The part that matters", "Let me explain", "Let that sink in", "Read that again"
    Fix: delete the tease and lead with the point.

    3. Stock phrases:
    deep dive, delve, move the needle, game changer / game-changer, no-brainer, at the end of the day, the bottom line, it's that simple, let's be honest / clear / real, make no mistake, in today's [anything], it's no secret that, it's worth noting, that's not a typo, unlock, elevate, leverage (as a verb), landscape, navigate, in the realm of, [noun] is the new currency

    4. Em dashes and en dashes. Replace each with a period, comma, colon or parentheses.

    5. AI sentence shapes:
    - "It's not X, it's Y" and any rewrite that keeps the same contrast
    - Chains of short fragments for drama ("No fluff. No filler. Just results.")
    - Lists of three where two would do
    - An ending that restates the opening as a "lesson"
    - A rhetorical question that sets up your own answer ("Bigger was better, right?")

    6. LinkedIn tells:
    - One-sentence paragraphs used for drama, more than two in a post
    - Arrow or emoji bullets (→ ✅ 🚀)
    - Engagement-bait closers ("Agree?", "Thoughts?", "Drop a 👇")
    - More than three hashtags, or generic ones (#Marketing #Success)
    Flag these. Fix them only if the post reads better without them.

    7. Review only. Flag these, never edit them in the final draft:
    - Hedges (often, typically, usually, generally): they may be what makes a claim true
    - "Most people / most marketers never..." claims: fine if backed by data, a tell if they're there to flatter the reader
    Mark each one [CHECK] in the final draft and tell me what to verify.

    HOW TO FIX
    - Delete before you replace. If a deletion leaves a sentence limp, add something concrete (a number, a name, an example from my draft), never a new intensifier.
    - Never add facts, numbers or claims that aren't in my draft.
    - Don't touch anything inside quotation marks.
    - Fixing a sentence shape can change structure. That's allowed. Everything else about my voice, facts and order stays.

    HOW TO RESPOND, IN THIS ORDER

    1. Score: "[N] tells found in [N] lines." Then one line per category with its count.

    2. Top fixes: the 5 changes that matter most, worst first, as "before" then "after", one short reason each.

    3. Everything else: the remaining fixes as a short table, one row per sentence: the sentence (quoted) | categories | fix.

    4. Self-check: before writing the final draft, reread your fixes against the whole list. If any fix introduced a new tell (including a reworded "not X, it's Y"), correct it and say what you changed. Then confirm in one line: "Facts and numbers unchanged" or list what changed.

    5. Final draft, last: the full draft with every fix applied, ready to copy. Review-only items stay as written, marked [CHECK]. Don't add anything after it.

    MY DRAFT:
    [paste here]
  whatYouGet: "A score, the five fixes that matter most, a self-check that catches tells Claude adds in its own rewrite, and a clean copy of your draft at the end. On a 350-word sample LinkedIn post it found 33 tells in 19 lines."

limitation: "It reads words. It can't hear a sentence shape, so \"it's not about X, it's about Y\" walks right past it as long as no banned word comes along. That's why a person still reads every post before it ships."

image: "/builds/ai-tells-checker/cover.jpg"
imageAlt: "A terminal showing the content check failing on a test post: banned adverbs, a fake-tease transition, banned phrases, and an em dash."
tldr: "Kaye Putnam built a content check for her company's blog that flags AI writing tells, from empty adverbs like 'actually' to fake teases like 'here's the kicker', before a post ships. The first sweep made 689 changes across 73 of 74 posts. Anyone can run a simpler version in 10 minutes with the Claude prompt on this page."
faq:
  - question: "What counts as an AI tell?"
    answer: "Words and phrases that show up far more in AI drafts than in human writing: empty intensifiers (\"actually\", \"seamlessly\"), fake teases (\"here's the kicker\"), stock phrases (\"move the needle\", \"delve\"), em dashes, and sentence shapes like \"it's not X, it's Y\"."
  - question: "Why delete the word instead of swapping in a synonym?"
    answer: "A synonym moves the tell. Read the sentence without the word: if it means the same thing, the word was never doing any work."
  - question: "Do I need to code?"
    answer: "No. The 10-minute version is a prompt in a Claude chat. Our version runs automatically every time someone edits the blog, which took Claude Code to set up."
  - question: "Should I delete every hedge like \"often\" or \"usually\"?"
    answer: "No. Our check only warns on hedges, because some of them are what make a claim true. A person decides each one."
---

I read every draft half for the ideas and half for the tells. One "seamlessly" and my trust in the whole paragraph drops. So I wondered how many had made it onto our own company blog.

I had Claude Code count. The word "actually" appeared 251 times.

### One rule list, two readers

The fix started as a writing rules file: every tell we'd banned, with the reason and an example. The AI tools we draft with load it before they write anything. Then the same rules became the check, so the writer and the reviewer work from one definition of a tell.

![The rule list in the check's code: a banned-adverb list, a fake-tease rule, and a dash rule.](/builds/ai-tells-checker/rules.png)
*An excerpt of the rules in the check's code. The long tease pattern is shortened here.*

There are six categories. Four fail the check:
- **Empty intensifiers:** 26 adverbs, from "actually" and "really" to "seamlessly" and "meticulously." The rule is to delete, never swap.
- **Fake teases:** a lead-in that promises a reveal and delivers an ordinary sentence, like "here's the kicker" or "what nobody tells you."
- **Stock phrases:** "deep dive," "move the needle," "game changer," "at the end of the day."
- **Em and en dashes.**

Two only warn, because cutting them can turn a true claim into a false one: hedges ("often," "typically") and "most people never..." claims. A person decides those.

### The sweep

I set the rules and Claude Code did the sweep across the whole back catalog: 689 changes across 73 of our 74 posts. It skips quotes, code, and the titles and URLs that already rank in Google, because those are either someone else's words or too valuable to touch.

### What happens now

![A failed content check on a test post: banned adverbs, a fake-tease transition, banned phrases, an em dash, and two review-only warnings.](/builds/ai-tells-checker/terminal.png)
*A real run of the check against a test post I wrote full of tells. The file path is shortened.*

Every edit to the blog runs the check. A tell fails it and lists the exact words it found, and someone rewrites the line before it ships. The team still decides, and the check makes sure nobody has to remember to look.

### What it can't see

It reads words. A sentence shape like "it's not about X, it's about Y" or a chain of dramatic fragments sails through if no banned word comes along with it. The free version below asks Claude to look for those shapes too, which is one thing the prompt does better than a word list.

![Before and after: three AI tells from a sample draft, struck through, with the human rewrite underneath.](/builds/ai-tells-checker/beforeafter.png)
*The 10-minute version on a fictional sample draft: 33 tells in 19 lines.*
