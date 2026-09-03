# Linux port

This branch is a Linux port of `SVAH-X/claude-code-but-priestess`, not a fork of
it. Upstream is the base; everything here is a delta on top, kept small enough
that `git merge upstream/main` stays a routine operation.

Remotes this assumes:

    upstream  https://github.com/SVAH-X/claude-code-but-priestess
    aklnaaw   https://github.com/aklnaaw/claude-code-but-priestess   (where the Linux work came from)

## Why a port and not a fork

Measured 2026-09-03, between `aklnaaw/main` (b4aeeee) and `SVAH-X/main` (c05e33c):

| side | unique contribution |
|---|---|
| the Linux work | 829 lines across 11 files, plus the platform layer and OpenCode |
| upstream | ~13 500 lines: VS Code bridge, permission tiers, reasoning effort, Codex catalog, updater |

Carrying the smaller delta on top of the larger base is roughly ten times less
work than the reverse, which is what `aklnaaw` ended up doing by cherry-pick
after disabling its own `sync-upstream.yml` on 2026-06-24.

## Carried over

| item | source | state |
|---|---|---|
| AUR / deb / rpm packaging, build script, debian maintainer scripts | a374d82, 486c2e1 | done |
| `aur-publish.yml`, `sync-upstream.yml`, `.mailmap`, `README.ja.md` | a374d82 | done |
| Linux branches in `agentModeWarning` / `agentModePrompt` (grim, maim, spectacle, ydotool, xdotool, wtype, PipeWire, PolKit/AppArmor/SELinux) | a374d82 | done |
| Linux wording for the advisor tier | this port | done |
| Attachment limits 1MB/20k -> 10MB/100k | c961ee6 | done |
| Japanese menu language | 59a9bec | done |
| No in-app updater: `updater.js` and `update-progress.*` dropped, `buildUpdateMenuItems` returns nothing | 486c2e1 | done |

| OpenCode backend, a fourth CLI provider | 486c2e1 | done |
| Linux screenshot tools: spectacle, gnome-screenshot, grim, import, maim, scrot | 486c2e1 | done |
| Delta-based window and pet dragging, fixing KDE Wayland | 486c2e1 | done |
| `XDG_SESSION_TYPE` / `XDG_CURRENT_DESKTOP` session detection | a9054f7 | done |
| `easter_egg` skill | a25ea7c | done |
| Packaging identity: AppImage/deb/rpm targets, appId, publish target | a374d82 | done |

## Still to carry

| item | source | size |
|---|---|---|
| NVM detection when the CLI lives under a node version manager | 486c2e1 | `chat.js` |
| Wayland start gate (`PRTS_SHOW_ON_START`) — partially present, needs checking against the original fix | abfbdb7 | ~9 lines |
| Compositor-native window drag on KDE (`-webkit-app-region: drag` behind a class) — the delta move already fixes the bug this worked around | 486c2e1 | `renderer.js`, `desktop-pet.{js,css,html}`, `styles.css` |
| Resize still measures in screen space; untouched upstream and in the fork | — | `renderer.js` |

## Deferred, not dropped

`01793aa` on `port/upstream-catchup` restructures the system prompt into a
byte-identical cached prefix plus a per-turn context, and stops resending the
long-memory bundle into a session that already has it. Both halves are one
refactor and both live in the prompt-assembly path, which on this base differs
enough that carrying it is a re-implementation rather than a merge: six
conflict blocks across `chat.js` and `persona.js`, mixed with OpenCode and
Codex-prompt context that belongs to other items on this list.

It has seven tests of its own (`test/persona-cache-prefix.test.js`) pinning the
invariants, so it can be redone here with a real safety net. Worth doing after
the OpenCode backend lands, since two of the conflicts are OpenCode-shaped.

## Deliberately not carried

- Windows NetEase automation (`netease-client.js`, `NeteaseController.cs`): win32 only.
- `cli-spawn` `windowsVerbatimArguments`: fixes a Windows quoting bug.
- `netease-hot-songs.js`, `music-prompt.js`: platform-neutral code, but the
  random-music path behind them is gated on win32 plus a Windows-only setting,
  so both would be dead here.
