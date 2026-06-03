# claude-code-but-Priestess

语言：[English](README.md) | **简体中文**

<p align="center">
  <img src="assets/character/睁眼.png" alt="普瑞赛斯" width="220">
</p>

> **Linux 适配分支** — 基于上游 [SVAH-X/claude-code-but-priestess](https://github.com/SVAH-X/claude-code-but-priestess)，
> 添加了 Linux (Wayland/X11) 托盘支持、AUR 打包和中文界面。
> macOS / Windows 相关内容请移步上游仓库。

一个 Linux 系统托盘桌宠。普瑞赛斯会以一个小头像待在托盘区域；
点击头像后，会弹出一个带角色立绘和聊天框的弹出窗口。她通过本机已经
安装并登录的 Claude Code 或 Codex CLI 来回复。

没有普通应用窗口，不占任务栏。主要入口只有托盘图标。

<p align="center">
  <a href="https://aur.archlinux.org/packages/priestess-arknights">
    <img src="https://img.shields.io/badge/AUR-priestess--arknights-1793d1?style=for-the-badge&logo=arch-linux&logoColor=white" alt="AUR 软件包">
  </a>
  &nbsp;
  <a href="https://github.com/aklnaaw/claude-code-but-priestess/releases/latest">
    <img src="https://img.shields.io/badge/下载-Linux%20(AppImage)-2a6df4?style=for-the-badge&logo=linux&logoColor=white" alt="下载 Linux 版">
  </a>
</p>

<p align="center">
  <a href="https://github.com/aklnaaw/claude-code-but-priestess/releases/latest">
    <img src="https://img.shields.io/github/v/release/aklnaaw/claude-code-but-priestess?label=最新版本&style=flat-square&color=2a6df4" alt="最新版本">
  </a>
  <a href="https://github.com/aklnaaw/claude-code-but-priestess/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/aklnaaw/claude-code-but-priestess/ci.yml?style=flat-square&label=CI" alt="CI 状态">
  </a>
</p>

> **仅 Linux 平台。** 本 fork 移除了 macOS / Windows 专属逻辑并专门针对 Linux 桌面修复适配。
> 支持 Wayland（Niri、GNOME、KDE）和 X11 会话。

## 功能

- 托盘图标，无任务栏窗口
- 托盘头像使用 `assets/character/icon.png`，缺失时回退到笑脸立绘裁剪。
- 点击托盘图标后打开弹出窗口：
  - 上方是普瑞赛斯立绘，会呼吸、待机眨眼。
  - 下方是聊天记录和输入框。
  - `Enter` 发送，`Shift+Enter` 换行。
- 拖动顶部标题栏可以把整个弹出窗口移动到屏幕任意位置；从左 / 右 / 下边缘或左右下角拖拽来缩放。普瑞赛斯的活动区域和聊天区域会随窗口尺寸变化。
- 点击她会有反应（连续点击：开心 → 生气 → 威胁）；也可以在框内抓着她甩来甩去；长时间不理她，她会先哭唧唧，再睡着。
- 聊天窗口闲置一分钟后会淡出，只留下停留在原位置的小桌宠；隐藏聊天窗口后也会进入该状态。可以拖动她改变位置，或点击她在当前位置附近恢复聊天窗口。桌宠会眨眼、呼吸、轻摆，偶尔弹跳。**想彻底关掉桌宠，右键托盘图标，取消勾选「闲置时显示桌面宠物」**——点击桌宠本身只会重新打开聊天，而且隐藏聊天约一分钟后她还会回来。同一个菜单还能立即显示她，或选择小 / 中 / 大三档尺寸。
- 表情状态：
  - 她会根据每条回复的情绪自己选择表情（平静 / 笑 / 难过 / 生气 / 困倦 / 威胁）——通过一个界面读取并隐藏的标记实现。
  - 回复中：思考 / 工作；回复完成：定格在她为这条回复选择的表情；出错：短暂哭唧唧。
- 右键菜单可以：
  - 打开聊天窗口。
  - 开启/关闭 agent mode（代理模式）。
  - 在可用时切换 Claude Code / Codex 后端。
  - 每轮自动截图（agent mode 下）。
  - 设置聊天工作目录。
  - 打开数据目录。
  - 退出应用。
- 人格、记忆、滚动长对话摘要、最近聊天记录、工作目录和应用设置在两个后端之间共享。Claude Code 和 Codex 保留各自的独立 resume session id。
- 清除当前对话仅重置可见 session 和 CLI resume id。共享记忆、长对话摘要和完整 JSONL 对话档案会保留给未来 session 和两个后端使用。
- 清除后长期记忆进入休眠模式：除非用户主动要求回忆或提及之前的对话，否则不会注入旧记忆内容。完整档案上限约 5 MB，超出后从最旧记录开始裁剪。

## 下载安装（普通用户）

### Arch Linux（AUR）

```sh
# 从 AUR 安装（推荐）
yay -S priestess-arknights

# 或者使用 paru
paru -S priestess-arknights
```

安装后运行：

```sh
priestess
```

若在 Wayland 会话下托盘图标不可见（如 Niri、GNOME Wayland），可设置环境变量让启动时直接弹出聊天窗口：

```sh
PRTS_SHOW_ON_START=1 priestess
```

### Linux（AppImage / 预编译包）

前往 [latest release](https://github.com/aklnaaw/claude-code-but-priestess/releases/latest)
下载 Linux `.AppImage` 或解压即用的 `.tar.gz`。

```sh
chmod +x PRTS-*.AppImage
./PRTS-*.AppImage
```

### 从源码构建

```sh
git clone https://github.com/aklnaaw/claude-code-but-priestess.git
cd claude-code-but-priestess
npm install
npm run dev
```

**系统要求**

- Linux x86_64，支持 Wayland 或 X11 会话
- 需要安装 [Claude Code](https://claude.ai/code) CLI（`claude`）或 [Codex](https://platform.openai.com/docs/codex) CLI（`codex`）其中之一，且已登录认证。详见下方的**[后端支持](#后端支持)**。

## 从源码构建（开发者）

克隆仓库、装依赖、启动开发模式：

```sh
git clone https://github.com/aklnaaw/claude-code-but-priestess.git
cd claude-code-but-priestess
npm install
npm run dev
```

然后在系统托盘区域查找 PRTS 图标。在 Wayland 下需要确保你的桌面环境支持 StatusNotifierItem 协议（GNOME 需安装 [AppIndicator 扩展](https://extensions.gnome.org/extension/615/appindicator-support/)）。

为当前操作系统生成安装产物：

```sh
npm run dist          # 为当前机器架构构建
npm run dist:linux    # Linux 专属: AppImage + deb
```

产物在 `dist/`。

## 后端支持

这个应用只支持本地 CLI 后端，不直接使用云端 API key，也不支持任意第三方 agent。

支持的本地 CLI：

- Claude Code：`claude`
- Codex CLI：`codex`

后端选择规则：

- 如果本机同时有 `claude` 和 `codex`，右键菜单里可以切换，默认使用 Claude Code。
- 如果本机只有 `claude`，应用会锁定 Claude Code，不显示 Codex 选项。
- 如果本机只有 `codex`，应用会锁定 Codex，不显示 Claude Code 选项。
- 如果两个都没有，弹出窗口顶部显示 `No CLI`，发送按钮禁用，右键菜单显示后端未检测到。

探测会在启动时、打开后端菜单时、发送消息前执行。它会检查当前 `PATH`、常见本地二进制目录，以及 VS Code / Cursor 的 OpenAI 扩展内置 Codex 二进制。

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

可以通过右键菜单「设置聊天目录」设置聊天工作目录，让当前后端在正确的项目目录下工作。

## 数据与记忆存放

应用自己持久化的数据都放在 Electron 的 `userData` 目录里，不会写进这个 repo，也不会写进用户选择的聊天工作目录。可以通过右键菜单的「打开数据文件夹」打开准确位置。

常见路径：

```text
# 打包版（AppImage / deb / AUR）
~/.config/PRTS/

# 开发模式
~/.config/Electron/
```

主要文件：

| 文件 | 用途 |
| --- | --- |
| `settings.json` | 应用设置：当前后端、聊天工作目录、agent mode、自动截图设置、弹出窗口尺寸。 |
| `conversation.json` | 当前可见聊天 session、Claude/Codex 各自的 resume session id、长期记忆 dormant 状态。 |
| `memory/MEMORY.md` | 精选长期记忆：博士的偏好、项目、反复出现的话题和值得记住的事实。 |
| `memory/CONVERSATION_SUMMARY.md` | 有界滚动摘要，用来在长对话时恢复较早上下文。 |
| `memory/CONVERSATION_ARCHIVE.jsonl` | Claude Code 和 Codex 共享的完整 user/assistant 对话档案，约 5 MB 上限，超过后从最旧记录开始裁剪。 |

记忆系统不会主动写入：

- 当前仓库本身。
- 用户选择的聊天工作目录。
- 项目文件本身，除非用户明确要求她改文件，或开启 agent mode 后交给她需要操作文件的任务。

Claude Code 和 Codex 自己仍会把登录状态、CLI session 等写在各自的目录，比如 `~/.claude` 或 `~/.codex`。这个应用不会合并或改写这些官方 CLI 自己的存储。

## 记忆策略

Claude Code 和 Codex 共享同一套应用层记忆。两者的原生 resume session id 仍然分开保存，因为两个 CLI 的底层 session 不能互通；但应用会提供共享的外层上下文：

- 同一份普瑞赛斯 persona prompt。
- 同一份 `MEMORY.md`。
- 同一份滚动对话摘要。
- 同一份有上限的 JSONL 对话档案。
- 同一份当前 UI 聊天历史。

当前 session 内的连续性比较轻量：最近可见的 user/assistant 对话会直接传给当前使用的后端。

长期记忆会尽量克制：

- `MEMORY.md` 只存耐久事实，不存完整流水账。
- `CONVERSATION_SUMMARY.md` 有长度上限，避免 prompt 变慢。
- `CONVERSATION_ARCHIVE.jsonl` 约 5 MB 上限，过大时从最旧记录裁剪。
- 点击「清除对话」后，只清空当前可见聊天和两个后端的 resume id；`MEMORY.md`、`CONVERSATION_SUMMARY.md`、`CONVERSATION_ARCHIVE.jsonl` 都会保留。
- 清空后，长期记忆进入 dormant 模式。新的对话不会主动注入旧记忆，除非用户主动要求回忆，或提到「记得」「记忆」「上次」「之前」「以前」「我们聊过」「你还记得」等线索。

这样普通新 session 会比较省 token 和响应时间；但当用户真的要求回忆时，Claude Code 和 Codex 都能读取同一份历史。

## 关键源码文件

| 文件 | 作用 |
| --- | --- |
| `src/main/persona.js` | 构造普瑞赛斯 / Priestess 的人格 prompt，定义 memory 文件路径，并控制长期记忆何时注入。 |
| `src/main/chat.js` | 探测本地 Claude/Codex CLI，选择当前后端，启动子进程，解析流式输出，持久化 archive/summary，并在两个后端之间共享上下文。 |
| `src/main/main.js` | Electron 主进程：托盘图标、右键菜单、后端菜单、设置持久化、聊天持久化、应用生命周期。 |
| `src/main/settings.js` | 默认设置和 `settings.json` 持久化。 |
| `src/main/preload.js` | Electron 主进程与 renderer 之间的安全 IPC 桥。 |
| `src/renderer/renderer.js` | 弹出窗口 UI、聊天渲染、角色动画、点击/待机/表情逻辑、当前后端显示。 |
| `assets/character/` | 角色表情 PNG 素材目录。 |

## 角色素材

renderer 需要这些文件存在于 `assets/character`：

- `睁眼.png`, `半眯眼.png`, `快闭眼.png`, `闭眼.png`
- `笑.png`, `生气.png`, `威胁.png`, `哭唧唧.png`, `睡觉.png`
- `icon.png`，用于托盘头像

PNG 文件不会被修改。renderer 会在运行时对边缘连通的白色背景做透明处理，让角色干净地显示在弹出窗口面板上。

## 说明

这个仓库不内置第三方版权美术。角色图像请在权利方条款和画师授权范围内使用。
