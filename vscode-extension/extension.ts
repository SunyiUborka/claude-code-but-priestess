import * as vscode from "vscode";
import { WsClient } from "./src/ws-client";
import { ChatPanelProvider } from "./src/chat-panel";
import { ContextCapture } from "./src/context-capture";

let wsClient: WsClient | null = null;
let contextCapture: ContextCapture | null = null;

export function activate(context: vscode.ExtensionContext) {
  console.log("PRTS: activating…");

  wsClient = new WsClient(context);

  // Vibe coding: capture editor context, diagnostics, workspace, activity
  contextCapture = new ContextCapture(wsClient, context);
  context.subscriptions.push(contextCapture);

  const chatProvider = new ChatPanelProvider(context, wsClient, contextCapture);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("prts.chatView", chatProvider, {
      webviewOptions: { retainContextWhenHidden: true },
    })
  );

  // ---- Commands ----

  context.subscriptions.push(
    vscode.commands.registerCommand("prts.openChat", () => {
      vscode.commands.executeCommand("workbench.view.extension.prts-sidebar");
    })
  );

  // Vibe coding: send selection to Priestess
  context.subscriptions.push(
    vscode.commands.registerCommand("prts.sendSelection", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("PRTS: No active editor.");
        return;
      }
      const selection = editor.selection;
      if (selection.isEmpty) {
        vscode.window.showWarningMessage("PRTS: Select some code first.");
        return;
      }
      const text = editor.document.getText(selection);
      const ctx = contextCapture?.getCurrentContext();
      if (wsClient && wsClient.isConnected()) {
        wsClient.send("vscode:selection-to-chat", { text, context: ctx });
        vscode.commands.executeCommand("workbench.view.extension.prts-sidebar");
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("prts.newConversation", () => {
      if (wsClient && wsClient.isConnected()) {
        wsClient.send("conversation:new");
        vscode.window.showInformationMessage("PRTS: started a new conversation");
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("prts.restoreConversation", () => {
      if (wsClient && wsClient.isConnected()) {
        wsClient.send("conversation:restore");
        vscode.window.showInformationMessage("PRTS: restored previous conversation");
      }
    })
  );

  // Vibe coding: toggle companion ↔ advisor (VS Code extension doesn't need full agent)
  context.subscriptions.push(
    vscode.commands.registerCommand("prts.setVibeCodingMode", async () => {
      if (!wsClient || !wsClient.isConnected()) {
        vscode.window.showWarningMessage("PRTS: not connected to the tray app.");
        return;
      }
      try {
        const res: any = await wsClient.send("settings:get");
        const current = (res?.state || {}).vibeCodingMode || "companion";
        const tiers = [
          { value: "companion", label: "\u{1F4AC} Companion", description: "chat only, no tools" },
          { value: "advisor", label: "\u{1F441} Advisor", description: "read-only: Read, Grep, Glob, LS" },
          { value: "agent", label: "\u{26A1} Agent", description: "full access: edits files, runs commands" },
        ];
        const picked = await vscode.window.showQuickPick(
          tiers.map((t) => ({
            label: t.value === current ? t.label + "  \u{2713}" : t.label,
            description: t.description,
            value: t.value,
          })),
          { placeHolder: "PRTS: permission tier (shared with the tray app)" }
        );
        if (!picked || picked.value === current) return;

        // Agent hands over the terminal. The tray asks before granting it, so
        // this path asks too rather than being the quiet way in.
        if (picked.value === "agent") {
          const go = await vscode.window.showWarningMessage(
            "Grant Priestess full access?",
            {
              modal: true,
              detail:
                "She will be able to edit files and run any shell command without asking each " +
                "time, here and in the tray app. While it is on, the tier is shown in the " +
                "panel's status line.",
            },
            "Grant agent access"
          );
          if (go !== "Grant agent access") return;
        }

        await wsClient.send("settings:set", { patch: { vibeCodingMode: picked.value } });
        vscode.window.showInformationMessage("PRTS: " + picked.value);
      } catch (_) { /* ignore */ }
    })
  );

  // Vibe coding: show current editor context info
  context.subscriptions.push(
    vscode.commands.registerCommand("prts.showContextInfo", () => {
      const ctx = contextCapture?.getCurrentContext();
      if (!ctx?.activeFile) {
        vscode.window.showInformationMessage("PRTS: No active editor.");
        return;
      }
      const file = ctx.activeFile.split(/[\\/]/).pop();
      const lines: string[] = [
        `📄 ${file}`,
        `   语言: ${ctx.activeFileLanguage || "unknown"}`,
        `   光标: L${ctx.cursorLine}:${ctx.cursorColumn}`,
      ];
      if (ctx.selection) {
        lines.push(`   已选中: L${ctx.selection.startLine}-${ctx.selection.endLine} (${ctx.selection.text.length} 字符)`);
      }
      const diag = contextCapture?.getDiagnostics();
      if (diag && diag.errors > 0) {
        lines.push(`   ⚠ 诊断: ${diag.errors} 错误, ${diag.warnings} 警告`);
      }
      vscode.window.showInformationMessage(lines.join("\n"), { modal: true });
    })
  );

  // ---- Window focus tracking ----

  context.subscriptions.push(
    vscode.window.onDidChangeWindowState((state) => {
      if (wsClient && wsClient.isConnected()) {
        wsClient.send("vscode:focus", { focused: state.focused });
      }
    })
  );

  // ---- Connection lifecycle ----

  // On first connect: send vscode:active, offer to restore previous conversation
  (wsClient as any).on("connected", () => {
    wsClient!.send("vscode:active");
  });

  // After auth, the server sends conversation:has-previous.
  // Only prompt once per extension session — reconnects shouldn't re-ask.
  let hasPromptedRestore = false;

  (wsClient as any).on("conversation:has-previous", (msg: any) => {
    if (msg.hasPrevious && !hasPromptedRestore) {
      hasPromptedRestore = true;
      vscode.window
        .showInformationMessage(
          "PRTS: You have a previous conversation. Restore it?",
          "Restore",
          "Start Fresh"
        )
        .then((choice) => {
          if (choice === "Restore") {
            wsClient!.send("conversation:restore");
          } else if (choice === "Start Fresh") {
            wsClient!.send("conversation:new");
          }
        });
    }
  });

  console.log("PRTS: activated");
}

export function deactivate() {
  if (contextCapture) {
    contextCapture.dispose();
    contextCapture = null;
  }
  if (wsClient) {
    wsClient.dispose();
    wsClient = null;
  }
}
