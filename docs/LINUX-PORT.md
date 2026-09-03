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

## Still to carry

| item | source | size |
|---|---|---|
| OpenCode backend (fourth provider) | 486c2e1 | ~230 lines in `chat.js`, menu bits in `main.js` |
| `XDG_SESSION_TYPE` platform detection, replacing tray-bounds inference | a9054f7 | 142 lines, conflicts on this base |
| KDE window/pet drag: `popover:move-delta` | 486c2e1 | `preload.js`, `main.js`, `desktop-pet.{js,css}`, `renderer.js`, `styles.css` |
| Linux screenshot tools, NVM detection | 486c2e1 | `chat.js` |
| `easter_egg` skill (the `skills.js` half; the `chat.js` trigger is already in) | a25ea7c | ~23 lines |
| Branding: package name, appId, productName, publish owner, AppImage/deb/rpm targets, `asarUnpack` | a374d82, 486c2e1 | `package.json` |
| Wayland start gate (`PRTS_SHOW_ON_START`) — partially present, needs checking against the original fix | abfbdb7 | ~9 lines |

## Decisions to re-apply from the 2026-09-03 port work

These are not upstream features; they are choices made while porting upstream
into the fork, and they are worth keeping here:

- `settings.js` validator table: `chatProvider` must include `opencode`,
  `menuLanguage` must include `ja`. Upstream's table lists neither, and copying
  it verbatim silently narrows both back to upstream's set.
- `vscode-extension/src/ws-client.ts`: `APP_NAMES` must lead with this build's
  Electron app name, or the extension never finds `ws-port.json` and cannot
  connect at all.
- `vscode-chat.js`: upstream caps the editor client at advisor. That cap is
  lifted here, with the tier shown in the panel's status line so full access is
  never in effect invisibly.
- `vscode-chat.js`: three system notices use a bare `history.push` instead of
  `pushSystem`, so they never reach the panel. Still broken upstream as of
  c05e33c — worth a pull request rather than only a local fix.

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
