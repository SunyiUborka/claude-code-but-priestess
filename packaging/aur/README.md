# PRTS — AUR 打包

## 目录结构

```
packaging/aur/
├── PKGBUILD             # Arch 构建脚本
├── .SRCINFO             # AUR 元数据
├── priestess.install    # 安装后钩子
└── linux-compat.patch   # Linux 兼容性补丁（Wayland、托盘、汉化）
```

## 构建测试

```bash
cd packaging/aur
makepkg -si
```

## 提交到 AUR

AUR 仓库名：`priestess`（上传前请确认可用）

```bash
# 初始化 AUR 仓库（仅首次）
git init
git add PKGBUILD .SRCINFO priestess.install linux-compat.patch
git commit -m "priestess: init 0.5.1-1"

# 提交到 AUR
git remote add aur ssh://aur@aur.archlinux.org/priestess.git
git push aur main

# 更新版本时
# 1. 修改 pkgver/pkgrel
# 2. 更新 .SRCINFO: makepkg --printsrcinfo > .SRCINFO
# 3. git commit + git push
```

## AUR 包说明

- 构建方式：`git clone` 源码 → `npm install` → `electron-builder --linux dir`
- Electron 42 已打包在内（~201MB），不需要系统 electron
- 启动后注册 SNI 托盘图标
- 如果托盘不可见（如 Niri/GNOME Wayland），用 `PRTS_SHOW_ON_START=1 prts` 启动
