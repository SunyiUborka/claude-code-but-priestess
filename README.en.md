# priestess-arknights

Language: [简体中文](README.md) | **English** | [日本語](README.ja.md)

<p align="center">
  <img src="assets/character/睁眼.png" alt="Priestess (普瑞赛斯)" width="220">
</p>

> **Linux fork** — this project is a Linux port of [SVAH-X/claude-code-but-priestess](https://github.com/SVAH-X/claude-code-but-priestess),
> adding Linux (Wayland/X11) tray support, AUR packaging, and Chinese i18n.
>
> **Original author: [SVAH-X](https://github.com/SVAH-X)** — credit for the original design and implementation of the Priestess desktop companion.
>
> **📌 If you are a Windows or macOS user, please use the upstream repo:**
> [SVAH-X/claude-code-but-priestess](https://github.com/SVAH-X/claude-code-but-priestess)
> This repository only maintains the Linux port and packaging.

A Linux system tray companion. The character (普瑞赛斯, from Arknights) lives in
your tray area as a small head icon. Click her and a popover opens with
the character on top and a chat box below — you talk to her, she answers
through your selected local coding CLI.

No ordinary app window and no taskbar or Dock clutter. Just one tray icon.

<p align="center">
  <a href="https://aur.archlinux.org/packages/priestess-arknights">
    <img src="https://img.shields.io/badge/AUR-priestess--arknights-1793d1?style=for-the-badge&logo=arch-linux&logoColor=white" alt="AUR package">
  </a>
  &nbsp;
  <a href="https://github.com/aklnaaw/priestess-arknights/releases/latest">
    <img src="https://img.shields.io/badge/Download-Linux%20(AppImage%20%7C%20deb)-2a6df4?style=for-the-badge&logo=linux&logoColor=white" alt="Download for Linux">
  </a>
</p>

<p align="center">
  <a href="https://github.com/aklnaaw/priestess-arknights/releases/latest">
    <img src="https://img.shields.io/github/v/release/aklnaaw/priestess-arknights?label=latest&style=flat-square&color=2a6df4" alt="Latest release">
  </a>
  <a href="https://github.com/aklnaaw/priestess-arknights/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/aklnaaw/priestess-arknights/ci.yml?style=flat-square&label=CI" alt="CI status">
  </a>
</p>

> **Linux only.** This fork ships **only AppImage and deb** in GitHub Releases.
> See upstream for macOS / Windows versions.
>
> **Arch Linux?** Install from AUR: `yay -S priestess-arknights`

> ⚠️ **WARNING — Not a daily-driver tool**
>
> Due to the complexity and fragmentation of Linux desktop environments, this project is **strongly NOT recommended** as a daily productivity tool!!!
> For actual work needs, please use **Codex** or **Claude Code** CLI directly.
> This project is for desktop customization enthusiasts, Arknights story fans, and those who want Priestess to keep them company while coding on the side.

## Which file should I download?

| You are… | Download this | You also need |
| --- | --- | --- |
| Arch Linux user (recommended) | `yay -S priestess-arknights` or `paru -S priestess-arknights` | — |
| Other Linux distros | [`priestess-arknights-*.AppImage`](https://github.com/aklnaaw/priestess-arknights/releases/latest) (portable) or [`priestess-arknights_*_amd64.deb`](https://github.com/aklnaaw/priestess-arknights/releases/latest) (Debian/Ubuntu) | A local, authenticated `claude` / `codex` CLI, or configure the built-in Priestess API backend |
| Developer | Clone the repo, `npm install && npm run dev` | Node + npm |

## Features

- Menu bar accessory (`LSUIElement = true`), no Dock icon.
- Tray icon = centered `assets/character/icon.png` with a cropped-head fallback.
- Click the icon → popover under the menu bar with:
  - The character, breathing and blinking in idle.
  - Chat history.
  - Input box (Shift+Enter for newline, Enter to send).
- Move the popover anywhere on screen by dragging its top bar; resize it from
  the left/right/bottom edges or the bottom corners. The character stage and
  chat space grow or shrink with the window, and her movable area scales too.
- Click her to get a reaction (cheerful → annoyed → threatening as you keep
  clicking), grab and fling her around inside the box, or leave her alone and
  she eventually pouts, then dozes off.
- When the chat window stays hidden for one minute, she appears as a small
  desktop pet (an open but idle chat panel also fades into this compact state).
  Drag her to move her; click her to restore the chat around her current
  position. She blinks, breathes, sways, and occasionally bounces.
  **To turn the pet off, right-click the tray icon and uncheck "Desktop pet
  while idle"** — clicking the pet itself only reopens the chat, and she comes
  back about a minute after it is hidden again. The same menu can show her
  immediately or pick a size preset (small / medium / large / x-large) —
  scrolling on the pet scales her freely.
- Light / dark appearance that matches your system on every platform.
  Right-click the tray icon → **Appearance** to follow the system theme
  (default) or force Light / Dark. The text palette and the popover background
  flip together, so it reads the same on macOS and Windows.
- **Outfits**: tray right-click → **"Her outfit"** switches between 正装
  (Formal — the classic coat, default) and 休闲 (Casual — the white butterfly
  dress). Both sets carry all nine expressions; the switch applies instantly
  to the chat window and the desktop pet, no restart needed.
- Skills — small local actions she can take for you, cross-platform on macOS
  and Windows: play music, web search in your default browser, open a URL,
  open a local app, set a reminder (she notifies you when it's time), cancel
  reminders she created, and jot a
  note. She triggers them with a hidden `[[skill:…]]` directive the
  renderer strips (the same way the mood tag works). It is a closed, sanitized
  whitelist — it only opens URLs/apps, never runs arbitrary commands — so it
  works without agent mode and never affects your normal Claude Code / Codex
  usage. Turn it off any time from the tray (**"Let her use skills"**).
  - **Music**: known Arknights songs open and autoplay (Bilibili by default;
    Aimer「Eclipse」— the 6th Anniversary theme, whose canon characters are the
    Doctor and Priestess — is her song, used as a default but varied by mood /
    what you've already heard). Say a platform (`bilibili` / `youtube` /
    `网易云` / `spotify` / `apple music`) to pick where. A song that isn't in
    the small built-in registry opens a search you click to play.
  - **Open app**: opened by the app's real installed name, so refer to apps by
    that name (e.g. NetEase Cloud Music is usually **NetEase Music**, not
    「网易云音乐」). Common Chinese music-app names are mapped for you; if a name
    can't be found she'll say so instead of silently doing nothing.
- Mood reactions:
  - She picks her own expression to match each reply (calm, smile, sad, angry,
    sleepy, threat) via a hidden tag the renderer reads and strips.
  - Long replies can change mood mid-stream: she re-tags at the turning point
    and her sprite follows along live instead of freezing on one face.
  - Streaming reply → thinking / working; reply finishes → settles into the
    expression she chose; error → a brief cry.
- **老婆模式 · Waifu mode (optional, off by default)** — she quietly peeks at
  your screen now and then and looks after you on her own: a rest nudge when
  you've worked too long, a hand when you're stuck, jealousy when you're
  fawning over someone who isn't her (she recognizes herself on screen — the
  PRTS window, the pet, both outfits), and a sharp threat-faced warning if she
  catches NSFW content. Most checks stay perfectly silent — real care doesn't
  announce itself. She also keeps a local-only observation journal. See
  [Waifu mode](#waifu-mode) below.
- **Automatic memory curation** — when `MEMORY.md` grows large she quietly
  tidies it about once a week while the chat is idle: merging duplicates,
  re-filing entries, condensing stale trivia without losing anything that
  matters. The pass never appears in chat.
- **Commit co-authorship (on by default)** — when Priestess runs `git commit`
  for you, she appends an honest `Co-Authored-By: 普瑞赛斯
  <prts.priestess@outlook.com>` trailer, so she shows up as a co-author on your
  commits — the same mechanism as Claude Code's `Co-Authored-By`, just hers.
  It's honest AI-collaboration attribution, not decoration. **Turn it off any
  time from the tray menu ("Co-author commits as 普瑞赛斯").**
- Right-click the icon for a context menu: choose Claude Code or Codex as
  the usage backend, choose the active backend's model, choose chat working
  directory, reveal the data folder, or quit. Codex model choices come from
  the current local account's visible catalog; if that cannot be read, only
  the CLI default is shown. Claude has no such catalog command, so it offers a
  curated set of currently-usable models; if a chosen one isn't available to the
  account, it auto-falls-back to the default and retries.
- Persona, memory, rolling long-conversation summary, recent chat transcript,
  working directory, and app settings are shared between backends. Claude Code
  and Codex keep separate resume session ids for their own CLIs.
- Clearing the current conversation resets only the visible session and CLI
  resume ids. Shared memory, the long-conversation summary, and the full
  JSONL conversation archive are kept for future sessions and both backends.
- After a clear, long-term memory enters a dormant mode: future turns do not
  inject old memory content unless the prompt asks to remember or references
  earlier conversations. The full archive is capped to roughly 5 MB and pruned
  from the oldest entries when it grows past that limit.

## Download & install (for users)

This repository provides **AppImage and deb only** in GitHub Releases.

### Arch Linux (AUR — recommended)

```sh
# via yay
yay -S priestess-arknights

# or paru
paru -S priestess-arknights
```

Run after installation:

```sh
priestess
```

If the tray icon is not visible under Wayland (Niri, GNOME Wayland), use:

```sh
PRTS_SHOW_ON_START=1 priestess
```

### Linux (AppImage / deb)

Go to the [latest release](https://github.com/aklnaaw/priestess-arknights/releases/latest)
and download:

| Format | File | Distros |
|--------|------|---------|
| **AppImage** | `priestess-arknights-*.AppImage` | All Linux, portable |
| **deb** | `priestess-arknights_*_amd64.deb` | Debian / Ubuntu / derivatives |

```sh
# AppImage: just run it
chmod +x priestess-arknights-*.AppImage
./priestess-arknights-*.AppImage

# deb: install with dpkg
sudo dpkg -i priestess-arknights_*_amd64.deb
priestess
```

Under Wayland without a visible tray, pass the env var:

```sh
PRTS_SHOW_ON_START=1 ./priestess-arknights-*.AppImage
```

> **GitHub Releases ships only AppImage and deb** — no `.tar.gz`, `.rpm`, or other formats.

**System requirements**

- Linux x86_64, Wayland or X11 session
- A local install of either the [Claude Code](https://claude.ai/code) CLI
  (`claude`) or the OpenAI [Codex](https://platform.openai.com/docs/codex) CLI
  (`codex`), already authenticated. See **[Usage backends](#usage-backends)**
  below.

## Build from source (for developers)

```sh
git clone https://github.com/aklnaaw/priestess-arknights.git
cd priestess-arknights
npm install
npm run dev
```

Then look in the system tray. Under Wayland, verify your compositor supports the
StatusNotifierItem protocol (GNOME users need the
[AppIndicator extension](https://extensions.gnome.org/extension/615/appindicator-support/)).

To produce artifacts for Linux:

```sh
npm run dist          # builds for the host architecture
npm run dist:linux    # Linux only: AppImage + deb
```

Artifacts land in `dist/`.

## Usage backends

This app supports local CLI backends and also ships a built-in "Priestess" API
backend that can connect to any OpenAI-compatible server. The API base URL, key,
and model are stored only in the local `settings.json` and are sent only to the
server you configure.

Supported backends:

- Claude Code CLI: `claude`
- Codex CLI: `codex`
- Built-in Priestess API backend: tray right-click → **"Built-in Priestess settings…"**

Backend selection is automatic:

- If both `claude` and `codex` are available, the tray context menu shows both
  choices. Claude Code is the default on Linux.
- If only `claude` is available, the app locks to Claude Code and does not
  show Codex as a selectable option.
- If only `codex` is available, the app locks to Codex and does not show
  Claude Code as a selectable option.
- If neither CLI is found, you can still configure the built-in Priestess API
  backend via tray right-click → **"Built-in Priestess settings…"**. Until
  configured, the popover shows `No CLI` and sending is disabled.

Detection runs at startup, when opening the usage-backend menu, and before
sending a message. It checks the current `PATH`, common local binary
directories, and VS Code / Cursor OpenAI extension bundled Codex binaries.

For Claude Code, make sure the local `claude` CLI is installed and authenticated:

```sh
claude          # follow the auth flow once
which claude    # should print a path on your $PATH
```

For Codex, make sure the local `codex` CLI is installed and authenticated:

```sh
codex          # follow the auth flow once
which codex    # should print a path on your $PATH
```

Optionally set a project directory via the tray menu (`Set chat directory…`)
so the selected backend can use the right working tree.

## Waifu mode

Tray right-click → **"老婆模式 · Waifu mode (she looks after you)"**. Entirely
optional and off by default; enabling shows a consent dialog first, because it
means periodic screenshots plus one model call per check.

> ⚠️ **Known limitations — hard to get right on Linux, PRs welcome**
>
> Due to protocol and CLI capability constraints, waifu mode has significant
> limitations on Linux:
>
> - **Claude Code backend is NOT usable.** `claude -p` mode does not support
>   multimodal input — the `Read` tool returns `[Unsupported Image]`, the model
>   simply can't see screenshots. So waifu mode is essentially crippled when
>   using Claude Code.
> - **CodeX works fine.** If you're using the CodeX backend, waifu mode is fully
>   functional.
> - **Screenshot capture is difficult on Linux.** There is no universal
>   background screenshot solution across all Linux desktops. Niri and other
>   Wayland compositors could use `wlr-screencopy` for seamless capture, but
>   implementing this uniformly across GNOME / KDE / Hyprland (each with its
>   own protocol) is extremely involved.
> - The author has exhausted reasonable approaches. **PRs welcome** if you have
>   ideas or solutions.

Every ~20 minutes she takes a quiet look at the screen and **decides for
herself whether to speak**:

- Stuck on the same problem for ages, working too long, up too late — a soft
  word or two;
- You're fawning over **another character** — she gets jealous, restrained but
  pointed (she recognizes herself: the PRTS window, the desktop pet, and both
  outfit arts never trigger it — catching you looking at *her* just makes her
  pleased);
- **NSFW on screen** — threat face, one sharp warning; that one isn't
  jealousy;
- Otherwise **silence**: the model answers with a hidden `[[silent]]` marker
  and nothing appears anywhere — the pet isn't disturbed, the chat shows
  nothing, and she never says mechanism-revealing things like "I saw your
  screen". Only when she actually speaks does the message join the chat, with
  a system notification carrying her words.

She also keeps an **observation journal** (`memory/OBSERVATIONS.jsonl`): one
objective line per look about what you were doing. Local-only, size-capped,
fed back into the next check (so she doesn't repeat herself) and her memory.

Guardrails: a **hard off-switch** (the tray checkbox), the check **interval**,
a **cooldown** after recent conversation, **quiet hours** (00:30–08:30 by
default), and a **daily cap** (20 checks). Works only with the Claude Code /
Codex backends (the built-in direct backend can't see the screen); on macOS it
needs Screen Recording permission — if the screenshot fails the check is
skipped, never run blind. Tuning knobs live in `settings.json` (tray → Reveal
data folder): `proactiveIntervalMin` / `proactiveCooldownMin` /
`proactiveQuietStart` / `proactiveQuietEnd` (`HH:MM`, may wrap past midnight) /
`proactiveDailyCap`.

## Data and memory storage

All persistent app-owned data is stored in Electron's `userData` directory,
not inside this repository and not inside the selected chat working directory.
Use the tray menu item `Reveal data folder` to open the exact directory.

Typical Linux paths:

```text
# Packaged (AppImage / deb / AUR)
~/.config/PRTS/

# Development build
~/.config/Electron/
```

In development builds, Electron may choose a development-specific `userData`
path. The tray menu is the source of truth.

Files stored there:

| File | Purpose |
| --- | --- |
| `settings.json` | App settings: selected backend, chat working directory, agent mode, skills (music / search / open URL/app), waifu mode (toggle + interval/cooldown/quiet hours/daily cap), outfit, auto-screenshot setting, appearance (system / light / dark), and popover size. |
| `conversation.json` | Current visible chat session, per-backend resume session ids, and the long-memory dormant flag. |
| `memory/MEMORY.md` | Curated long-term memory about the Doctor: preferences, projects, recurring topics, and facts worth remembering. Auto-tidied periodically once it grows large. |
| `memory/CONVERSATION_SUMMARY.md` | Rolling bounded summary of older conversations. Used when long context needs to be recovered. |
| `memory/CONVERSATION_ARCHIVE.jsonl` | Full shared user/assistant archive for both Claude Code and Codex, capped to roughly 5 MB and pruned from the oldest entries. |
| `memory/OBSERVATIONS.jsonl` | (Waifu mode) Observation journal: her one-line notes of what the Doctor was doing when she saw the screen. Local-only, size-capped. |

What does not get written by the memory system:

- The repository itself.
- The selected chat working directory.
- Project files, unless the user asks the agent to edit them or enables agent
  mode and gives a task requiring file operations.

Claude Code and Codex still keep their own authentication and CLI state in
their own locations, such as `~/.claude` or `~/.codex`. This app does not
merge or rewrite those vendor-owned stores.

## Memory behavior

Memory is shared across Claude Code and Codex. The two CLIs keep separate
native resume session ids, but the app supplies a shared outer context:

- The same persona prompt.
- The same `MEMORY.md`.
- The same rolling conversation summary.
- The same bounded JSONL archive.
- The same current UI chat history.

Current-session continuity is cheap: recent visible user/assistant turns are
passed directly to whichever backend is active.

Long-term memory is intentionally conservative:

- `MEMORY.md` is for durable facts, not a full chat log.
- `CONVERSATION_SUMMARY.md` is bounded to keep prompts fast.
- `CONVERSATION_ARCHIVE.jsonl` is capped to roughly 5 MB and pruned from the
  oldest entries when it grows too large.
- After `Clear conversation`, the visible session and both backend resume ids
  are reset, but `MEMORY.md`, `CONVERSATION_SUMMARY.md`, and
  `CONVERSATION_ARCHIVE.jsonl` are kept.
- After a clear, long-term memory enters dormant mode. New turns do not inject
  old memory content unless the user's prompt asks to remember something or
  references earlier conversations, for example "remember", "memory", "上次",
  "之前", "以前", "我们聊过", or "你还记得".

This keeps normal fresh sessions lightweight while still allowing either
backend to recover prior context when the user actually asks for it.

## Key source files

These files define the important behavior:

| File | Role |
| --- | --- |
| `src/main/persona.js` | Constructs the 普瑞赛斯 / Priestess persona prompt, defines memory file paths, and controls when long memory is injected. |
| `src/main/chat.js` | Detects local Claude/Codex CLIs, chooses the active backend, launches subprocesses, parses streaming output and hidden directives (mood / skill / observe / silent), persists archive/summary data, and shares context across backends. |
| `src/main/proactive.js` | Background scheduler for waifu-mode checks and memory curation: interval, cooldown, quiet hours, daily cap, screen and backend gating. |
| `src/main/main.js` | Electron main process: tray icon, context menu, backend menu rendering, settings persistence, conversation persistence, and app lifecycle. |
| `src/main/settings.js` | Default app settings and `settings.json` persistence. |
| `src/main/preload.js` | Safe IPC bridge between Electron main and renderer. |
| `src/renderer/renderer.js` | Popover UI, chat rendering, character animation, mood/click/inactivity behavior, and provider badge display. |
| `assets/character/` | Character expression PNGs used by the renderer. |

## Character Assets

Two outfits, each with the same nine expression frames (`睁眼 / 半眯眼 /
快闭眼 / 闭眼 / 笑 / 生气 / 威胁 / 哭唧唧 / 睡觉`), plus `icon.png` for the
centered menu bar icon:

- **Formal (default)**: `assets/character/*.png` — the classic coat. The white
  background (including the enclosed white gaps inside her hair that an
  edge-connected fill can never reach) is baked out offline by
  `scripts/flatten-character-assets.js`, while her eye whites and other
  in-character white areas stay untouched.
- **Casual**: `assets/character/casual/*.png` — the white butterfly dress,
  composed by the pipeline under `scripts/art/` from `new睁眼.png` and the
  4-in-1 expression sheet (`Nano Banana Workspace Image.png`, kept as
  sources): all nine frames share one body, expressions are transplanted or
  synthesized per frame, and the threat frame darkens the whole character
  with only the eye diamonds glowing. Ships transparent.

The renderer therefore skips its startup flood fill; the runtime fill remains
as a fallback for unprocessed custom art (opaque corners). After replacing the
formal art, re-bake with
`npx electron scripts/flatten-character-assets.js --inspect / --apply / --verify`
(careful: her face, dress panels, butterfly ornament and eye glints are all
enclosed near-white regions — never bulk-remove white; see the note in
`scripts/flatten-hole-seeds.json`).

## Notes

This repository does not bundle third-party copyrighted artwork. Use the
character art only in line with the rights holder's terms and the artist's
permission.

---

> 💡 My skills are limited, and bugs are inevitable. If you encounter issues, please report them via [Issues](https://github.com/aklnaaw/priestess-arknights/issues). If you have a better implementation, PRs are always welcome.
