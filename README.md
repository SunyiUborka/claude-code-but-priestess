# priestess-arknights

语言：**简体中文** | [English](README.en.md) | [日本語](README.ja.md)

<p align="center">
  <img src="assets/character/睁眼.png" alt="普瑞赛斯" width="220">
</p>

> **Linux fork** — 基于 [SVAH-X/claude-code-but-priestess](https://github.com/SVAH-X/claude-code-but-priestess)
> 的发行版，新增 Linux 系统托盘支持（Wayland / X11）、AUR 打包、中文界面。
> macOS / Windows 版本见上游仓库。

这是一个 Linux 系统托盘桌宠。普瑞赛斯会以一个小头像待在托盘区域；
点击头像后，会弹出一个带角色立绘和聊天框的 popover。她通过本机已经
安装并登录的 Claude Code 或 Codex CLI 来回复。

没有普通应用窗口，不在桌面上乱跑，也不占任务栏或 Dock。主要入口只有托盘图标。

<p align="center">
  <a href="https://aur.archlinux.org/packages/priestess-arknights">
    <img src="https://img.shields.io/badge/AUR-priestess--arknights-1793d1?style=for-the-badge&logo=arch-linux&logoColor=white" alt="AUR package">
  </a>
  &nbsp;
  <a href="https://github.com/aklnaaw/priestess-arknights/releases/latest">
    <img src="https://img.shields.io/badge/下载-Linux%20(AppImage%20%7C%20deb)-2a6df4?style=for-the-badge&logo=linux&logoColor=white" alt="Download for Linux">
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

> **Linux only.** 本 fork 移除了 macOS / Windows 专属逻辑，添加了 Linux 桌面兼容性修复。
> 支持 Wayland（Niri、GNOME、KDE）和 X11 会话。

## 我该下载哪个？

| 你是… | 下载这个 | 还需要什么 |
| --- | --- | --- |
| macOS（M 系列芯片）普通用户 | [`PRTS-<版本>-arm64.dmg`](https://github.com/SVAH-X/claude-code-but-priestess/releases/latest) | 本机装好并登录 `claude` 或 `codex` CLI（或在托盘里配置内置直连后端） |
| Windows 10 / 11（x64）用户 | [`PRTS.Setup.<版本>.exe`](https://github.com/SVAH-X/claude-code-but-priestess/releases/latest)，或免安装的 `PRTS-<版本>-win.zip` | 同上；Windows 版属实验性、未签名 |
| Linux 用户 | 见 [fork](https://github.com/aklnaaw/claude-code-but-priestess) | — |
| 开发者 / 想改代码 | 克隆源码后 `npm install && npm run dev` | Node + npm |

## 功能

- 系统托盘应用，打包后没有任务栏窗口。
- 托盘头像使用居中的 `assets/character/icon.png`，缺失时回退到笑脸立绘裁剪。
- 点击托盘图标后打开 popover：
  - 上方是普瑞赛斯立绘，会呼吸、待机眨眼。
  - 下方是聊天记录和输入框。
  - `Enter` 发送，`Shift+Enter` 换行。
- 拖动顶部标题栏可以把整个 popover 移动到屏幕任意位置；从左 / 右 / 下边缘或左右下角拖拽来缩放。普瑞赛斯的活动区域和聊天区域会随窗口尺寸变化。
- 点击她会有反应（连续点击：开心 → 生气 → 威胁）；也可以在框内抓着她甩来甩去；长时间不理她，她会先哭唧唧，再睡着。
- 聊天窗口闲置一分钟后会淡出，只留下停留在原位置的小桌宠；隐藏聊天窗口后也会进入该状态。可以拖动她改变位置，或点击她在当前位置附近恢复聊天窗口。桌宠会眨眼、呼吸、轻摆，偶尔弹跳。**想彻底关掉桌宠，右键托盘图标，取消勾选「闲置时显示桌宠」**——点击桌宠本身只会重新打开聊天，而且隐藏聊天约一分钟后她还会回来。同一个菜单还能立即显示她，或选择小 / 中 / 大三档尺寸。
- 跨平台一致的亮 / 暗外观。右键托盘图标 →「外观」可选择跟随系统（默认）或强制 Light / Dark。文字配色与 popover 背景会一起切换。
- **换装**：右键托盘 →「她的服装」，在「正装」（经典大衣，默认）与「休闲」（白蝶长裙）之间切换。两套服装九种表情一一对应，切换即时生效（聊天窗口与桌宠同步换装），不需要重启。
- **技能（Skills）**——她能替你做的几件本地小事：放音乐、用默认浏览器搜索、打开网址、打开本地应用、设提醒（到点通知你）、记一笔。她通过一个隐藏的 `[[skill:…]]` 指令触发（和心情标记一样会被界面隐藏掉）。这是一个封闭、参数经过净化的白名单——只会打开网址/应用，不执行任意命令——所以不开 agent mode 也能用，且完全不影响你平时的 Claude Code / Codex。可随时在托盘菜单里关掉（**「允许她使用技能」**）。
  - **音乐**：内置登记过的明日方舟曲目会直接打开并自动播放（默认走 Bilibili；Aimer 的「Eclipse」——六周年印象曲，其官方关联角色正是博士与普瑞赛斯——是她与博士的歌，会作为默认，但她会按你的心情/是否已经听过而换歌）。可在参数里写平台（`bilibili` / `youtube` / `网易云` / `spotify` / `apple music`）来指定。不在内置清单里的歌会打开搜索结果，需你点开播放。
  - **打开应用**：按应用的「本地真实名称」打开，所以请用该名称（例如网易云音乐在本地多叫 **NetEase Music**，而非「网易云音乐」）。常见的中文音乐应用名我已帮你映射；找不到时她会明说，而不是悄悄没反应。
- 表情状态：
  - 她会根据每条回复的情绪自己选择表情（平静 / 笑 / 难过 / 生气 / 困倦 / 威胁）——通过一个界面读取并隐藏的标记实现。
  - 较长的回复里情绪可以中途切换：她在转折处再标一次心情，立绘会随回复实时变化，而不是整条回复冻在同一张脸上。
  - 回复中：思考 / 工作；回复完成：定格在她为这条回复选择的表情；出错：短暂哭唧唧。
- **老婆模式（可选，默认关闭）**——开启后她会时不时自己看一眼屏幕，安静地照看博士：累了劝休息、卡住了搭把手、看见博士流连别的角色会吃醋（认得出屏幕上的自己，不会吃自己的醋）、看见 NSFW 内容会拉下脸警告。大多数时候保持沉默——真正的照看不出声。她还会留一份只存本机的观察日志。详见下文「[老婆模式](#老婆模式waifu-mode)」。
- **记忆自动整理**——当 `MEMORY.md` 长得太大时，她大约每周趁空闲静静整理一次：合并重复条目、归类、压缩陈年琐事，不丢真正重要的记忆。整理过程不出现在聊天里。
- 右键菜单可以：
  - 打开聊天窗口。
  - 切换外观（跟随系统 / Light / Dark）。
  - 开启/关闭 技能（放音乐 / 搜索 / 打开网址·应用）。
  - 开启/关闭 agent mode。
  - 开启/关闭 老婆模式（开启时会弹确认对话框）。
  - 在可用时切换 Claude Code / Codex。
  - 切换当前后端的模型；Codex 会读取当前本地账号可见的模型目录，读不到时只保留默认。Claude 没有这种目录命令，所以提供一组当前可用的模型（别名 + 版本），若选了账号不可用的型号，会自动切回默认并重试。
  - 设置聊天工作目录。
  - 打开数据目录。
  - 退出应用。

## 下载安装（普通用户）

本仓库 GitHub Releases **仅提供 AppImage 和 deb 两种格式**。
> 不再提供 `.tar.gz`、`.rpm` 或其他格式。

### Arch Linux（AUR，推荐）

Arch Linux 用户推荐从 AUR 安装，自动处理依赖和更新：

```sh
# 使用 yay 安装
yay -S priestess-arknights

# 或使用 paru
paru -S priestess-arknights
```

安装后运行：

```sh
priestess
```

如果 Wayland（Niri、GNOME Wayland）下看不到托盘图标，设置环境变量让应用启动时直接显示窗口：

```sh
PRTS_SHOW_ON_START=1 priestess
```

### Linux（AppImage / deb）

前往 [最新 release](https://github.com/aklnaaw/priestess-arknights/releases/latest)
选择对应格式下载：

| 格式 | 文件 | 适用发行版 |
|------|------|-----------|
| **AppImage** | `priestess-arknights-*.AppImage` | 所有 Linux 发行版，解压即用 |
| **deb** | `priestess-arknights_*_amd64.deb` | Debian / Ubuntu / 衍生版 |

```sh
# AppImage：下载后直接运行
chmod +x priestess-arknights-*.AppImage
./priestess-arknights-*.AppImage

# deb：下载后用 dpkg 安装
sudo dpkg -i priestess-arknights_*_amd64.deb
priestess
```

如需 Wayland 下直接显示窗口：

```sh
PRTS_SHOW_ON_START=1 ./priestess-arknights-*.AppImage
```

### 从源码构建

```sh
git clone https://github.com/aklnaaw/priestess-arknights.git
cd priestess-arknights
npm install
npm run dev
```

然后查看系统托盘。在 Wayland 下，确保你的合成器支持
StatusNotifierItem 协议（GNOME 用户需要安装
[AppIndicator 扩展](https://extensions.gnome.org/extension/615/appindicator-support/)）。

生成安装包：

```sh
npm run dist          # 为当前架构构建
npm run dist:linux    # 仅 Linux：AppImage + deb
```

产物在 `dist/`。

**系统要求**

- Linux x86_64，Wayland 或 X11 会话
- 本机已安装并登录 [Claude Code](https://claude.ai/code) CLI（`claude`）
  或 [Codex](https://platform.openai.com/docs/codex) CLI（`codex`）至少
  一个，详见下面的 **[后端支持](#后端支持)**。

## 后端支持

这个应用只支持本地 CLI 后端，不直接使用云端 API key，也不支持任意
第三方 agent。

支持的本地 CLI：

- Claude Code：`claude`
- Codex CLI：`codex`

后端选择规则：

- 如果本机同时有 `claude` 和 `codex`，右键菜单里可以切换；Linux 默认
  使用 Claude Code。
- 如果本机只有 `claude`，应用会锁定 Claude Code，不显示 Codex 选项。
- 如果本机只有 `codex`，应用会锁定 Codex，不显示 Claude Code 选项。
- 如果两个都没有，popover 顶部显示 `No CLI`，发送按钮禁用，右键菜单
  显示 `Usage backend: no local CLI found`。

探测会在启动时、打开后端菜单时、发送消息前执行。它会检查当前 `PATH`、
常见本地二进制目录，以及 VS Code / Cursor 的 OpenAI 扩展内置 Codex
二进制。

Claude Code 需要先安装并登录：

```sh
claude          # 第一次运行时按提示登录
which claude    # 应该能输出路径
```

Codex 需要先安装并登录：

```sh
codex          # 第一次运行时按提示登录
which codex    # 应该能输出路径
```

可以通过右键菜单 `Set chat directory…` 设置聊天工作目录，让当前后端在
正确的项目目录下工作。

## 老婆模式（Waifu Mode）

右键托盘 → **「老婆模式（她会自己照看你）」**。完全可选，默认关闭，开启时会先弹一个
确认对话框，因为它意味着：定期截屏 + 每次检查消耗一次模型调用。

开启后，她每隔约 20 分钟悄悄看一眼屏幕，**自己决定要不要开口**：

- 博士卡在同一个问题上很久、连续工作太久、深夜还没睡——轻声说一两句；
- 博士在流连**别的角色**——她会吃醋，克制地刺一句（她认得出屏幕上的自己：PRTS 窗口、
  桌宠和两套立绘都不会触发，看的是她自己时她只会高兴）；
- 屏幕上出现 **NSFW 内容**——威胁表情，锋利地警告，这不是吃醋；
- 其余时候**保持沉默**：模型用隐藏的 `[[silent]]` 标记表示「没什么值得说的」，聊天里
  什么都不会出现，桌宠也不被打扰——真正的照看不出声，她也绝不会说出「我看了你的屏幕」
  这种暴露机制的话。只有真的开口时，消息才进入聊天，并弹一条带她原话的系统通知。

她同时维护一份**观察日志**（`memory/OBSERVATIONS.jsonl`）：每次看过屏幕留一行
「博士此刻在做什么」。只存本机、自动封顶裁剪，回喂给下一次照看（避免重复唠叨）和她的
记忆。

护栏齐全：**硬开关**（托盘随时关）、**间隔**、与最近对话的**冷却时间**、**安静时段**
（默认 00:30–08:30）、**每日上限**（默认 20 次检查）。仅在 Claude Code / Codex 后端下
生效（内置直连后端看不到屏幕）；macOS 需要「屏幕录制」权限，拿不到权限时这次检查直接
跳过，不会盲跑。间隔、冷却、安静时段、上限在 `settings.json` 里手改（托盘 → 打开数据
目录）：`proactiveIntervalMin` / `proactiveCooldownMin` / `proactiveQuietStart` /
`proactiveQuietEnd`（`HH:MM`，可跨午夜）/ `proactiveDailyCap`。

## 数据与记忆存放

应用自己持久化的数据都放在 Electron 的 `userData` 目录里，不会写进这个
repo，也不会写进用户选择的聊天工作目录。可以通过右键菜单的
`Reveal data folder` 打开准确位置。

Linux 下常见路径：

```text
# 打包版（AppImage / deb / AUR）
~/.config/PRTS/

# 开发模式
~/.config/Electron/
```

主要文件：

| 文件 | 用途 |
| --- | --- |
| `settings.json` | 应用设置：当前后端、聊天工作目录、agent mode、技能（放音乐/搜索/打开网址·应用）、老婆模式（开关 + 间隔/冷却/安静时段/每日上限）、服装、自动截图设置、外观（system / light / dark）、popover 尺寸。 |
| `conversation.json` | 当前可见聊天 session、Claude/Codex 各自的 resume session id、长期记忆 dormant 状态。 |
| `memory/MEMORY.md` | 精选长期记忆：博士的偏好、项目、反复出现的话题和值得记住的事实。长得太大时她会定期自动整理。 |
| `memory/CONVERSATION_SUMMARY.md` | 有界滚动摘要，用来在长对话时恢复较早上下文。 |
| `memory/CONVERSATION_ARCHIVE.jsonl` | Claude Code 和 Codex 共享的完整 user/assistant 对话档案，约 5 MB 上限，超过后从最旧记录开始裁剪。 |
| `memory/OBSERVATIONS.jsonl` | （老婆模式）观察日志：她看过屏幕后留下的一行式「博士在做什么」，只存本机，自动封顶裁剪。 |

记忆系统不会主动写入：

- 当前 repo。
- 用户选择的聊天工作目录。
- 项目文件本身，除非用户明确要求她改文件，或开启 agent mode 后交给她
  需要操作文件的任务。

Claude Code 和 Codex 自己仍会把登录状态、CLI session 等写在各自的目录，
比如 `~/.claude` 或 `~/.codex`。这个应用不会合并或改写这些官方 CLI
自己的存储。

## 记忆策略

Claude Code 和 Codex 共享同一套应用层记忆。两者的原生 resume session id
仍然分开保存，因为两个 CLI 的底层 session 不能互通；但应用会提供共享的
外层上下文：

- 同一份普瑞赛斯 persona prompt。
- 同一份 `MEMORY.md`。
- 同一份滚动对话摘要。
- 同一份有上限的 JSONL 对话档案。
- 同一份当前 UI 聊天历史。

当前 session 内的连续性比较轻量：最近可见的 user/assistant 对话会直接传给
当前使用的后端。

长期记忆会尽量克制：

- `MEMORY.md` 只存耐久事实，不存完整流水账。
- `CONVERSATION_SUMMARY.md` 有长度上限，避免 prompt 变慢。
- `CONVERSATION_ARCHIVE.jsonl` 约 5 MB 上限，过大时从最旧记录裁剪。
- 点击 `Clear conversation` 后，只清空当前可见聊天和两个后端的 resume id；
  `MEMORY.md`、`CONVERSATION_SUMMARY.md`、
  `CONVERSATION_ARCHIVE.jsonl` 都会保留。
- 清空后，长期记忆进入 dormant 模式。新的对话不会主动注入旧记忆，除非用户
  主动要求回忆，或提到「记得」「记忆」「上次」「之前」「以前」「我们聊过」
  「你还记得」等线索。

这样普通新 session 会比较省 token 和响应时间；但当用户真的要求回忆时，
Claude Code 和 Codex 都能读取同一份历史。

## 关键源码文件

| 文件 | 作用 |
| --- | --- |
| `src/main/persona.js` | 构造普瑞赛斯 / Priestess 的人格 prompt，定义 memory 文件路径，并控制长期记忆何时注入。 |
| `src/main/chat.js` | 探测本地 Claude/Codex CLI，选择当前后端，启动子进程，解析流式输出与隐藏指令（mood / skill / observe / silent），持久化 archive/summary，并在两个后端之间共享上下文。 |
| `src/main/proactive.js` | 老婆模式与记忆整理的后台调度：间隔、冷却、安静时段、每日上限、屏幕权限与后端可用性闸门。 |
| `src/main/main.js` | Electron 主进程：菜单栏图标、右键菜单、后端菜单、设置持久化、聊天持久化、应用生命周期。 |
| `src/main/settings.js` | 默认设置和 `settings.json` 持久化。 |
| `src/main/preload.js` | Electron 主进程与 renderer 之间的安全 IPC 桥。 |
| `src/renderer/renderer.js` | Popover UI、聊天渲染、角色动画、点击/待机/表情逻辑、当前后端显示。 |
| `assets/character/` | 角色表情 PNG 素材目录。 |

## 角色素材

两套服装，九种表情一一对应（`睁眼 / 半眯眼 / 快闭眼 / 闭眼 / 笑 / 生气 / 威胁 /
哭唧唧 / 睡觉`），外加居中菜单栏头像 `icon.png`：

- **正装（默认）**：`assets/character/*.png` —— 经典大衣造型。白色背景（含发丝间
  边缘填充够不到的封闭白色缝隙）已用 `scripts/flatten-character-assets.js` 预先烘焙
  成真正的透明像素，眼白等角色本体的白色区域不受影响。
- **休闲**：`assets/character/casual/*.png` —— 白蝶长裙造型，由 `scripts/art/` 下的
  管线从 `new睁眼.png` 与四合一表情图（`Nano Banana Workspace Image.png`，保留作源
  文件）合成：九帧共用同一具身体，表情逐帧移植或合成，威胁帧整体压暗、只留瞳中菱形
  发光。出厂即透明。

renderer 启动时不再需要逐帧抠图；运行时白底抠图逻辑仍然保留——换上未处理的自定义
立绘（四角不透明）时会自动回退。替换正装素材后可用
`npx electron scripts/flatten-character-assets.js --inspect / --apply / --verify`
重新烘焙（注意：她的脸、裙摆、蝴蝶发饰与眼中高光都是「近白色封闭区域」，绝不能按
颜色批量抠除，详见 `scripts/flatten-hole-seeds.json` 的说明）。

## 说明

这个仓库不内置第三方版权美术。角色图像请在权利方条款和画师授权范围内使用。
