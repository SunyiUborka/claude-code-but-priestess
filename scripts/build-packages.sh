#!/bin/bash
# 构建 PRTS 全平台安装包
# Usage: ./scripts/build-packages.sh [version]

set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== PRTS 全平台构建 ==="
echo ""

# 检查依赖
command -v node >/dev/null 2>&1 || { echo "需要 node.js"; exit 1; }
command -v npx >/dev/null 2>&1 || { echo "需要 npx"; exit 1; }

# 安装依赖
echo "[1/4] 安装依赖..."
npm install

# 确保 assets/build/debian 脚本可执行
chmod 755 assets/build/debian/postinst 2>/dev/null || true
chmod 755 assets/build/debian/prerm 2>/dev/null || true

# 构建
echo "[2/4] 构建 Linux 包 (AppImage + deb + rpm)..."
npx electron-builder --linux

echo "[3/4] 构建 macOS 包..."
npx electron-builder --mac 2>/dev/null || echo "  macOS 构建跳过（非 macOS 系统）"

echo "[4/4] 构建 Windows 包..."
npx electron-builder --win 2>/dev/null || echo "  Windows 构建跳过（非 Windows 系统）"

echo ""
echo "=== 构建完成 ==="
echo "输出目录: dist/"
ls -lh dist/*.{AppImage,deb,rpm,dmg,zip,exe,msi} 2>/dev/null || ls -lh dist/
