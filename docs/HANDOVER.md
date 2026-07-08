# PRTS (priestess-arknights) — 交接文档

> 更新日期：2026-07-09
> 维护者：aklnaaw

---

## 项目概要

基于 Electron 的 Linux 系统托盘桌宠应用「普瑞赛斯」，对接本地 Claude Code / Codex / Open Code CLI 作为聊天推理后端。

- GitHub: https://github.com/aklnaaw/claude-code-but-priestess
- AUR: `priestess-arknights`
- Release: https://github.com/aklnaaw/claude-code-but-priestess/releases

---

## 当前版本：v0.7.8

### 已完成功能

| 功能 | 状态 | 说明 |
|------|------|------|
| 系统托盘（Wayland / X11） | ✅ | SNI 协议，GNOME 需 AppIndicator 扩展 |
| popover 聊天窗口 | ✅ | 拖拽/缩放/表情 |
| 桌宠模式 | ✅ | 闲置淡出，桌面可拖 |
| 情绪系统 | ✅ | 9 种表情，流式回复实时切换 |
| 换装 | ✅ | 正装/休闲两套 |
| 技能系统 | ✅ | 放歌/搜索/打开应用/提醒 |
| 老婆模式 | ✅ | 代码截图观察（Codex ✅ / Claude ⚠️ / OpenCode ❌）|
| Agent mode | ✅ | 完整屏幕+文件控制 |
| Co-author 提交 | ✅ | git commit 署名普瑞赛斯 |
| 附件系统 | ✅ | 文件/图片拖拽 |
| HTML 预览面板 | ✅ | 代码渲染为网页预览 |
| 暗色/亮色主题 | ✅ | 跟随系统或手动切换 |

### 后端支持

| 后端 | 状态 | 特点 |
|------|------|------|
| Claude Code | ✅ 默认 | 功能最全，支持 Read 工具看图 |
| Codex CLI | ✅ | 图像识别通过 `-i` 传入，妻子模式最佳 |
| Open Code | ✅ v0.7.8 新增 | 纯文本，不支持图像识别/截图/附件 |
| Priestess (built-in) | ✅ | 任何 OpenAI 兼容 API |

### Linux 桌面兼容

| 桌面环境 | 状态 | 备注 |
|---------|------|------|
| KDE Plasma (Wayland) | ✅ v0.7.8 修复 | 窗口移动/桌宠拖拽已修复，滚轮缩放有限 |
| Niri (Wayland) | ✅ | 回退右上角定位，`setPosition` |
| GNOME Wayland | ✅ | 需 AppIndicator 扩展 |
| Hyprland | ⚠️ 社区反馈 | 需 `PRTS_SHOW_ON_START=1` |
| X11 | ✅ | 基本稳定 |

### 截图工具适配

自动检测各发行版原生工具：spectacle → gnome-screenshot → grim → import → maim → scrot → desktopCapturer

---

## 代码结构

```
src/
├── main/
│   ├── main.js                 # 入口：窗口/托盘/IPC/生命周期
│   ├── chat.js                 # 聊天引擎：provider 管理/流式处理/会话
│   ├── cli-spawn.js            # CLI 子进程管理
│   ├── persona.js              # 人格系统/记忆/存档
│   ├── persona-prts.js         # 普瑞赛斯人格数据（SHE 深度校准）
│   ├── platform.js             # 平台检测函数
│   ├── preload.js              # IPC 桥接
│   ├── priestess-provider.js   # 内置 HTTP 后端
│   ├── proactive.js            # 老婆模式/主动检查
│   ├── settings.js             # 设置管理
│   └── skills.js               # 技能系统
├── renderer/
│   ├── index.html / renderer.js / styles.css  # 主聊天界面
│   ├── desktop-pet.*           # 桌宠窗口
│   ├── priestess-settings.*    # 内置后端设置页
│   ├── persona-notes.*         # 人格补充校准页
│   └── credits.*               # 制作者名单页
assets/
├── character/                  # 角色立绘（正装）
│   └── casual/                 # 休闲装
scripts/
├── run-electron.js             # 开发启动
├── build-packages.sh           # 全平台构建脚本
├── check-assets.js             # 素材校验
└── flatten-character-assets.js # 精灵图背景移除
packaging/
└── aur/                        # AUR 打包文件
.github/workflows/
├── aur-publish.yml             # AUR 自动发布（推 tag 触发）
└── sync-upstream.yml           # 上游同步（已禁用）
```

---

## 关键系统设计

### Provider 检测机制

`chat.js` → `scanProviderAvailability()` 遍历所有 provider，`detectProvider()` 按以下顺序搜索每个 CLI：

1. **providerCandidates** — ~/.claude/local/、~/.local/bin/（claude）；VS Code 扩展（codex）
2. **pathCandidates** — $PATH 环境变量
3. **binCandidates** — commonBinDirs()：~/.local/bin/、~/.npm-global/bin/、NVM 目录、/usr/local/bin/、/usr/bin/、/bin/

检测成功条件：文件可执行 + `--version` 返回 exit code 0  
Codex 是 Node.js 脚本，需要 `node` 在 PATH 中 → spawn 时自动补充 NVM node 路径

### 窗口移动架构

```
KDE:      -webkit-app-region: drag（原生）→ KWin 合成器处理
非 KDE:   JS pointer event → IPC movePopoverDelta → setBounds/setPosition
桌宠:     顶部 24px 透明 drag handle（KDE） 或 JS drag（非 KDE）
```

### 流式回复处理

```
CLI stdout → JSON Lines 解析 → handleClaudeStreamEvent / handleCodexStreamEvent / handleOpenCodeStreamEvent
→ appendAssistant → 打字机效果 → finalizeAssistant
```

---

## 构建与发布

### 本地构建

```bash
npm install
npm run dist:linux          # AppImage + deb + rpm
npm run dist:appimage       # 单独 AppImage
npm run dist:deb            # 单独 deb
npm run dist:rpm            # 单独 rpm
```

### 全流程发布

1. `package.json` 更新版本号
2. `packaging/aur/PKGBUILD` 和 `.SRCINFO` 更新版本
3. `git tag vX.Y.Z && git push origin vX.Y.Z` → 自动触发 AUR 发布
4. 构建包：`rm -rf dist/linux-unpacked && npm run dist:linux`
5. `gh release create vX.Y.Z --prerelease --notes "..."`（首次预告）
6. 上传构建产物到 release
7. `gh release edit vX.Y.Z --title "..." --notes-file ...`（更新正式说明）

### 注意事项

- **electron-builder 缓存**：修改源码后必须 `rm -rf dist/linux-unpacked` 再重建
- **rpm 构建**：Fedora 需 `libxcrypt-compat`（`dnf install libxcrypt-compat`）
- **AUR 发布**：需要 `AUR_SSH_KEY` secret 在 GitHub 仓库中
- **ASAR version 必须匹配 tag**：否则 GitHub Actions 验证失败

---

## 已知问题 / TODO

| 问题 | 优先级 | 说明 |
|------|--------|------|
| KDE 桌宠滚轮缩放 | 低 | KWin 拦截部分 wheel 事件 |
| Open Code 无图像识别 | 低 | 纯文本模型限制 |
| GNOME Wayland 托盘扩展 | 低 | 需用户自行安装 |
| 老婆模式 Claude Code 截图 | 低 | claude -p 不支持多模态 |
| Niri 托盘 | 低 | 无传统托盘，需 PRTS_SHOW_ON_START |

---

## 环境

当前开发环境：
- **OS**: Fedora Linux 44
- **Kernel**: 7.1.3-200.fc44.x86_64
- **Desktop**: KDE Plasma (Wayland)
- **GPU**: NVIDIA RTX 4060 Ti
- **CLI**: claude 2.1.204 / codex 0.142.5 / opencode 1.17.15

旧开发环境（已归档）：
- CachyOS Linux / niri (Wayland compositor)
