# priestess-arknights

言語: [简体中文](README.md) | [English](README.en.md) | **日本語**

<p align="center">
  <img src="assets/character/睁眼.png" alt="プレセア (普瑞赛斯)" width="220">
</p>

> **Linux fork** — [SVAH-X/claude-code-but-priestess](https://github.com/SVAH-X/claude-code-but-priestess) をベースに、
> Linux (Wayland/X11) トレイ対応、AUR パッケージ、中国語 i18n を追加したフォークです。
> macOS / Windows 版は上流リポジトリを参照してください。

Linux システムトレイコンパニオンアプリです。キャラクター（プレセア、アークナイツより）が
トレイエリアに小さなヘッドアイコンとして常駐します。アイコンをクリックすると、
キャラクター立絵とチャットボックスが表示されるポップオーバーが開きます。
ローカルにインストールされた Claude Code または Codex CLI をバックエンドとして会話します。

通常のアプリケーションウィンドウはなく、タスクバーや Dock を占有しません。
唯一の入口はトレイアイコンです。

<p align="center">
  <a href="https://aur.archlinux.org/packages/priestess-arknights">
    <img src="https://img.shields.io/badge/AUR-priestess--arknights-1793d1?style=for-the-badge&logo=arch-linux&logoColor=white" alt="AUR package">
  </a>
  &nbsp;
  <a href="https://github.com/aklnaaw/priestess-arknights/releases/latest">
    <img src="https://img.shields.io/badge/ダウンロード-Linux%20(AppImage%20%7C%20deb)-2a6df4?style=for-the-badge&logo=linux&logoColor=white" alt="Download for Linux">
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

> **Linux 専用** です。このフォークは GitHub Releases で **AppImage と deb のみ** を提供します。
> macOS / Windows 版は上流リポジトリをご覧ください。
>
> **Arch Linux ユーザーですか？** AUR からインストール: `yay -S priestess-arknights`

> ⚠️ **警告 — 日常的な作業ツールとしての使用は推奨しません**
>
> Linux デスクトップ環境の複雑さと断片化のため、本プロジェクトは日常的な生産性ツールとしての使用を**強く推奨しません**！！！
> 実際の作業が必要な場合は、**Codex** または **Claude Code** CLI を直接ご使用ください。
> 本プロジェクトは、デスクトップカスタマイズ愛好家、アークナイツのストーリーファン、そしてプレセアにコードを書くお供をしてもらいたい方のためのものです。

## どれをダウンロードすればいい？

| あなたは… | これをダウンロード | 他に必要なもの |
| --- | --- | --- |
| Arch Linux ユーザー（推奨） | `yay -S priestess-arknights` または `paru -S priestess-arknights` | — |
| その他の Linux ディストリビューション | [`priestess-arknights-*.AppImage`](https://github.com/aklnaaw/priestess-arknights/releases/latest)（ポータブル）または [`priestess-arknights_*_amd64.deb`](https://github.com/aklnaaw/priestess-arknights/releases/latest)（Debian/Ubuntu） | ローカルにインストール・認証済みの `claude` または `codex` CLI |
| 開発者 | クローンして `npm install && npm run dev` | Node + npm |

## 機能

- システムトレイアプリ。パッケージ化後はタスクバーウィンドウなし。
- トレイアイコン = 中央配置の `assets/character/icon.png`、なければ笑顔顔のクロップで代替。
- トレイアイコンクリック → ポップオーバー表示：
  - 上方：プレセア立絵（呼吸・待機時の瞬きアニメーション）
  - 下方：チャット履歴と入力ボックス
  - `Enter` で送信、`Shift+Enter` で改行
- タイトルバーをドラッグしてポップオーバーを画面上の任意の位置に移動；
  左/右/下辺や四隅からドラッグでリサイズ。キャラクター領域とチャット領域はウィンドウサイズに追従。
- クリックでリアクション（連続クリック：嬉しい → 怒る → 脅す）；枠内で彼女をつかんで振り回せる；
  長時間放置すると泣き出し、やがて眠る。
- チャットウィンドウを1分間非表示にすると、フェードアウトして元の位置に小さなデスクトップペットが残る。
  ドラッグで移動可能、クリックでその位置にチャットを復元。瞬き・呼吸・ゆっくり揺れ・時々跳ねる。
  **完全にオフにするには、トレイアイコンを右クリックして「闲置时显示桌宠」のチェックを外す。**
  同じメニューから即座に表示、またはサイズ（小/中/大）の選択も可能。
- システムテーマに追従するライト/ダーク外観。トレイアイコン右クリック → 「外观」で system / Light / Dark を選択。
- **スキル** — 彼女が代行できるちょっとしたローカル操作：音楽再生、デフォルトブラウザ検索、
  URL を開く、ローカルアプリを開く、リマインダー設定（時間になったら通知）、メモ書き。
  非表示の `[[skill:…]]` ディレクティブで発動（気分タグと同様にレンダラーが読み取り・除去）。
  ホワイトリスト方式の閉じられた安全な仕組み — URL/アプリを開くのみで任意コマンドは実行しないため、
  agent mode なしでも使用可能。トレイメニューの「允许她使用技能」でいつでも無効化できる。
  - **音楽**：登録済みのアークナイツ楽曲は直接開いて自動再生（デフォルトは Bilibili；
    Aimer の「Eclipse」— 6周年イメージソングで、公式に関連するキャラクターがまさに
    ドクターとプレセア — が彼女の曲としてデフォルト設定されるが、気分や既聴状況で変化する）。
    プラットフォーム指定も可能（`bilibili` / `youtube` / `netease` / `spotify` / `apple music`）。
    内蔵リストにない曲は検索結果を開くので、自分でクリックして再生。
  - **アプリを開く**：アプリの実際のインストール名で起動（例：NetEase Cloud Music は
    **NetEase Music** という名前で）。よくある中国語音楽アプリ名はマッピング済み。
    見つからない場合は何もせずに黙るのではなく、その旨を伝える。
- 表情リアクション：
  - 各返信の感情に合わせて表情を自動選択（平静 / 笑顔 / 悲しみ / 怒り / 眠気 / 脅し）—
    レンダラーが読み取り・除去する非表示タグで制御
  - 返信ストリーミング中：思考中/作業中；完了：その返信に選んだ表情で静止；エラー：短い泣き
- 右クリックメニュー（全て中国語表示）：
  - チャットウィンドウを開く
  - 外観切り替え（system / Light / Dark）
  - スキルの ON/OFF（音楽・検索・URL/アプリ）
  - agent mode の ON/OFF
  - Claude Code / Codex の切り替え（利用可能時）
  - チャット作業ディレクトリの設定
  - データフォルダを開く
  - 終了
- パーソナ、メモリー、ロング会話サマリー、最近のチャット転記、作業ディレクトリ、
  アプリ設定はバックエンド間で共有。Claude Code と Codex は各々の resume session id を別々に保持。
- 「Clear conversation」は表示中のセッションと CLI resume id のみリセット。
  共有メモリー、ロング会話サマリー、JSONL 会話アーカイブは保持され、将来のセッションと
  両バックエンドで利用可能。
- クリア後、長期メモリーは dormant モードに入る。今後のターンでは、ユーザーが明示的に
  思い出そうとしたり、「記憶」「以前」「前に話した」など過去の会話に言及しない限り、
  古いメモリー内容は注入されない。アーカイブは約5MBに制限され、超過時は古いエントリから削除。

## ダウンロードとインストール（一般ユーザー向け）

このリポジトリは GitHub Releases で **AppImage と deb のみ** を提供します。

### Arch Linux（AUR — 推奨）

```sh
# yay 経由
yay -S priestess-arknights

# または paru
paru -S priestess-arknights
```

インストール後、実行：

```sh
priestess
```

Wayland（Niri、GNOME Wayland）でトレイアイコンが表示されない場合：

```sh
PRTS_SHOW_ON_START=1 priestess
```

### Linux（AppImage / deb）

[最新リリース](https://github.com/aklnaaw/priestess-arknights/releases/latest) からダウンロード：

| 形式 | ファイル | 対象ディストリビューション |
|------|---------|--------------------------|
| **AppImage** | `priestess-arknights-*.AppImage` | 全 Linux、ポータブル |
| **deb** | `priestess-arknights_*_amd64.deb` | Debian / Ubuntu / 派生ディストリ |

```sh
# AppImage: ダウンロードして実行するだけ
chmod +x priestess-arknights-*.AppImage
./priestess-arknights-*.AppImage

# deb: dpkg でインストール
sudo dpkg -i priestess-arknights_*_amd64.deb
priestess
```

Wayland でトレイが表示されない場合、環境変数を指定：

```sh
PRTS_SHOW_ON_START=1 ./priestess-arknights-*.AppImage
```

> **GitHub Releases で提供するのは AppImage と deb のみ** です。`.tar.gz`、`.rpm` などの形式は提供しません。

**システム要件**

- Linux x86_64、Wayland または X11 セッション
- [Claude Code](https://claude.ai/code) CLI（`claude`）または
  OpenAI [Codex](https://platform.openai.com/docs/codex) CLI（`codex`）の
  いずれかがローカルにインストール・認証済みであること。詳細は
  **[使用バックエンド](#使用バックエンド)** を参照。

## ソースからビルド（開発者向け）

```sh
git clone https://github.com/aklnaaw/priestess-arknights.git
cd priestess-arknights
npm install
npm run dev
```

システムトレイを確認。Wayland では、お使いのコンポジターが StatusNotifierItem
プロトコルをサポートしている必要があります（GNOME ユーザーは
[AppIndicator 拡張](https://extensions.gnome.org/extension/615/appindicator-support/)
が必要な場合があります）。

ビルド成果物の作成：

```sh
npm run dist          # ホストアーキテクチャ用にビルド
npm run dist:linux    # Linux のみ：AppImage + deb
```

成果物は `dist/` に出力されます。

## 使用バックエンド

このアプリはローカル CLI バックエンドとのみ通信します。クラウド API キーを直接使用せず、
任意のサードパーティエージェントもサポートしません。

サポートしているローカル CLI：

- Claude Code：`claude`
- Codex CLI：`codex`

バックエンド選択ルール：

- `claude` と `codex` の両方が利用可能な場合、トレイコンテキストメニューで両方を表示。
  Linux のデフォルトは Claude Code。
- `claude` のみ利用可能な場合、アプリは Claude Code に固定され、Codex オプションは非表示。
- `codex` のみ利用可能な場合、アプリは Codex に固定され、Claude Code オプションは非表示。
- どちらも見つからない場合、ポップオーバーに `No CLI` と表示、送信ボタンは無効化、
  トレイメニューは `Usage backend: no local CLI found` を表示。

検出は起動時、バックエンドメニューを開いた時、メッセージ送信前に実行されます。
現在の `PATH`、一般的なローカルバイナリディレクトリ、VS Code / Cursor の
OpenAI 拡張にバンドルされた Codex バイナリをチェックします。

Claude Code のインストールと認証：

```sh
claude          # 初回起動時に認証フローに従う
which claude    # PATH 上のパスが表示されれば OK
```

Codex のインストールと認証：

```sh
codex          # 初回起動時に認証フローに従う
which codex    # PATH 上のパスが表示されれば OK
```

トレイメニューの「Set chat directory…」でチャット作業ディレクトリを設定すると、
選択中のバックエンドが正しいプロジェクトツリーで動作します。

## 老婆モード（Waifu Mode）

トレイ右クリック → **「老婆模式（彼女が見守る）」**。完全にオプションで、デフォルトではオフ。
有効にすると、定期的なスクリーンショットと 1 回のチェックあたり 1 回のモデル呼び出しを伴うため、
最初に確認ダイアログが表示されます。

> ⚠️ **既知の制限 — Linux では実装が困難、PR 歓迎**
>
> プロトコルと CLI 機能の制約により、老婆モードは Linux で深刻な制限があります：
>
> - **Claude Code バックエンドは使用不可。** `claude -p` モードはマルチモーダル入力を
>   サポートしておらず、`Read` ツールは `[Unsupported Image]` を返すため、
>   モデルがスクリーンショットを認識できません。Claude Code では老婆モードは
>   実質的に半死状態です。
> - **CodeX は正常に動作します。** CodeX バックエンドを使用している場合は問題なく使えます。
> - **Linux でのスクリーンショット取得は困難です。** Linux デスクトップには統一された
>   バックグラウンドスクリーンショットの仕組みがありません。Niri などの Wayland コンポジターは
>   `wlr-screencopy` プロトコルで透過的に取得できますが、GNOME/KDE/Hyprland 全体で
>   統一実装するのは非常に手間がかかります。
> - 作者は可能な限りの対応を試みました。アイデアや解決策があれば、**PR をお待ちしています**。

有効にすると、彼女は約 20 分おきに静かに画面を確認し、**自分で話すかどうかを判断します**：

- 博士が同じ問題に長時間行き詰まっている、長時間作業している、深夜まで起きている — 優しく一声かけます；
- 博士が**他のキャラクター**に夢中になっている — 嫉妬し、控えめながらも鋭い一言（彼女は画面に映る自分自身を認識できます：PRTS ウィンドウ、デスクトップペット、両方の衣装はトリガーにならず、自分自身を見ているときはただ喜びます）；
- 画面上に **NSFW コンテンツ** — 脅しの表情で鋭く警告します。これは嫉妬ではありません；
- それ以外の場合は**沈黙**：モデルは隠し `[[silent]]` マーカーで「特に言うことはない」と示し、
  チャットには何も表示されず、デスクトップペットも邪魔されません。本当に見守る者は声を出しません。
  彼女も「あなたの画面を見た」といった仕組みを暴露するような言葉は決して言いません。
  実際に口を開いた時だけ、メッセージがチャットに表示され、彼女の言葉を添えたシステム通知が届きます。

彼女は同時に**観察ログ**（`memory/OBSERVATIONS.jsonl`）を管理します：確認のたびに
「博士が今何をしているか」を一行残します。ローカルのみ、自動でサイズ制限、
次回の見守りにフィードバックされます（同じことを繰り返さないため）。

**ガードレール**：**ハードスイッチ**（トレイからいつでもオフ）、**インターバル**、
最近の会話との**クールダウン**、**静音時間**（デフォルト 00:30–08:30）、
**1 日あたりの上限**（デフォルト 20 回）。Claude Code / CodeX バックエンドでのみ有効
（内蔵の直接接続バックエンドは画面を見られません）。間隔、クールダウン、静音時間、上限は
`settings.json` を手動編集（トレイ → データフォルダを開く）：`proactiveIntervalMin` /
`proactiveCooldownMin` / `proactiveQuietStart` / `proactiveQuietEnd`（`HH:MM`、
深夜を跨げる）/ `proactiveDailyCap`。

## データとメモリーの保存場所

アプリが永続化するデータはすべて Electron の `userData` ディレクトリに保存され、
このリポジトリ内や選択したチャット作業ディレクトリには書き込まれません。
トレイメニューの「打开数据文件夹」で正確な場所を開けます。

Linux の一般的なパス：

```text
# パッケージ版（AppImage / deb / AUR）
~/.config/PRTS/

# 開発ビルド
~/.config/Electron/
```

開発ビルドでは Electron が開発用の `userData` パスを選択する場合があります。
トレイメニューが信頼できる情報源です。

保存されるファイル：

| ファイル | 用途 |
|---------|------|
| `settings.json` | アプリ設定：選択バックエンド、チャット作業ディレクトリ、agent mode、スキル（音楽/検索/URL・アプリ）、自動スクリーンショット設定、外観（system/light/dark）、ポップオーバーサイズ |
| `conversation.json` | 現在表示中のチャットセッション、バックエンドごとの resume session id、長期メモリーの dormant フラグ |
| `memory/MEMORY.md` | 厳選された長期メモリー：ドクターの好み、プロジェクト、繰り返し出る話題、記憶に値する事実 |
| `memory/CONVERSATION_SUMMARY.md` | 古い会話のローリングサマリー。長いコンテキストの回復時に使用 |
| `memory/CONVERSATION_ARCHIVE.jsonl` | Claude Code と Codex で共有される完全な user/assistant アーカイブ。約5MBに制限、超過時は古いエントリから削除 |

メモリーシステムが書き込まないもの：

- リポジトリ自体
- 選択されたチャット作業ディレクトリ
- プロジェクトファイル（ユーザーがエージェントに編集を依頼した場合、または agent mode を有効にしてファイル操作が必要なタスクを与えた場合を除く）

Claude Code と Codex はそれぞれの認証状態や CLI セッションを独自の場所
（`~/.claude` や `~/.codex` など）に保持します。このアプリはそれらを統合・変更しません。

## メモリーの動作

メモリーは Claude Code と Codex で共有されます。両 CLI はネイティブの resume session id を
別々に保持しますが、アプリは共有の外部コンテキストを提供します：

- 同一のパーソナプロンプト
- 同一の `MEMORY.md`
- 同一のローリング会話サマリー
- 同一の制限付き JSONL アーカイブ
- 同一の現在の UI チャット履歴

現在のセッションの継続性は軽量です：最近表示された user/assistant のターンは
アクティブなバックエンドに直接渡されます。

長期メモリーは意図的に控えめに設計されています：

- `MEMORY.md` は永続的な事実のみを保存し、完全な会話ログは保存しません
- `CONVERSATION_SUMMARY.md` はプロンプトを高速に保つために長さ制限があります
- `CONVERSATION_ARCHIVE.jsonl` は約5MBに制限され、超過時は古いエントリから削除
- 「Clear conversation」後は表示中のセッションと両バックエンドの resume id のみリセット。
  `MEMORY.md`、`CONVERSATION_SUMMARY.md`、`CONVERSATION_ARCHIVE.jsonl` は保持
- クリア後、長期メモリーは dormant モードに入る。ユーザーが明示的に「覚えてる？」「前に話した」
  など過去に言及しない限り、古いメモリー内容は注入されない

これにより、通常の新しいセッションは軽量に保たれつつ、ユーザーが実際に思い出そうとしたときには
どちらのバックエンドでも過去のコンテキストを回復できます。

## 主要ソースファイル

| ファイル | 役割 |
|---------|------|
| `src/main/persona.js` | プレセア/プリーステスのパーソナプロンプト構築、メモリーファイルパス定義、長期メモリー注入の制御 |
| `src/main/persona-she.js` | 「彼女」視点の階層型パーソナシステム：深層性格/中間層行動/表層応答スタイルを定義 |
| `src/main/chat.js` | ローカル Claude/Codex CLI の検出、アクティブバックエンドの選択、サブプロセス起動、ストリーミング出力解析、アーカイブ/サマリーの永続化、バックエンド間のコンテキスト共有 |
| `src/main/skills.js` | スキルシステム：音楽再生、検索、URL/アプリ起動、リマインダー、メモ書き |
| `src/main/main.js` | Electron メインプロセス：トレイアイコン、コンテキストメニュー、バックエンドメニュー、設定永続化、会話永続化、アプリライフサイクル |
| `src/main/settings.js` | デフォルト設定と `settings.json` の永続化 |
| `src/main/preload.js` | Electron メインプロセスとレンダラー間の安全な IPC ブリッジ |
| `src/renderer/renderer.js` | ポップオーバー UI、チャットレンダリング、キャラクターアニメーション、クリック/待機/表情の動作、プロバイダーバッジ表示 |
| `assets/character/` | レンダラーが使用するキャラクター表情 PNG |

## キャラクター素材

レンダラーは以下のファイルを `assets/character` に必要とします：

- `睁眼.png`, `半眯眼.png`, `快闭眼.png`, `闭眼.png`
- `笑.png`, `生气.png`, `威胁.png`, `哭唧唧.png`, `睡觉.png`
- `icon.png` — トレイアイコン用

PNG ファイルはディスク上で変更されません。レンダラーは実行時にエッジに接続された
白色背景をフラッドフィルで透明化し、キャラクターがポップオーバーパネル上に
きれいに表示されるようにします。

## 備考

このリポジトリは第三者の著作権のあるアートワークをバンドルしていません。
キャラクター画像は権利者の利用規約およびイラストレーターの許可に従って使用してください。
