"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";
import { Markdown } from "@tiptap/markdown";
import { Bold, Italic, Code, SquareCode, List, ListOrdered, Heading3, Quote } from "lucide-react";
import RichText from "@/components/quiz/RichText";

type Mode = "rich" | "markdown";

// Remembered per browser so an instructor who prefers raw Markdown isn't
// switched back on every question.
const MODE_STORAGE_KEY = "cs-learn:question-editor-mode";

function readStoredMode(): Mode {
  try {
    return window.localStorage.getItem(MODE_STORAGE_KEY) === "markdown" ? "markdown" : "rich";
  } catch {
    return "rich";
  }
}

function storeMode(mode: Mode) {
  try {
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    // Storage unavailable (private window etc.) — the toggle still works for this page.
  }
}

/**
 * A question-text / reference-answer field with two modes over the same stored
 * Markdown: a Tiptap rich-text editor (parses and re-serializes Markdown via
 * @tiptap/markdown) or the raw Markdown textarea with a live preview. Students
 * always see the Markdown rendered by RichText, whichever mode wrote it.
 */
export default function MarkdownField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: ReactNode;
}) {
  const [mode, setMode] = useState<Mode>("rich");

  useEffect(() => {
    // Read after mount so server and client render the same first frame.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(readStoredMode());
  }, []);

  const changeMode = (next: Mode) => {
    setMode(next);
    storeMode(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
        <div role="group" aria-label={`${label} editor mode`} className="inline-flex border border-gray-200 text-xs font-semibold">
          {(["rich", "markdown"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => changeMode(option)}
              className={`px-2.5 py-1 ${mode === option ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {option === "rich" ? "Rich text" : "Markdown"}
            </button>
          ))}
        </div>
      </div>

      {mode === "rich" ? (
        <RichTextEditor label={label} value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <>
          <textarea
            value={value}
            aria-label={label}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full text-base border border-gray-200 px-4 py-3 outline-none focus:border-iron-gray"
            placeholder={placeholder}
          />
          {value.trim() && (
            <div className="border border-gray-100 bg-gray-50 px-3 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Preview</p>
              <RichText>{value}</RichText>
            </div>
          )}
        </>
      )}

      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  // The Markdown this editor last emitted, so a parent echoing it back
  // doesn't reset the document (and the cursor) on every keystroke.
  const lastEmitted = useRef(value);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      TableKit,
      Image,
      Placeholder.configure({ placeholder: placeholder ?? "" }),
      Markdown,
    ],
    content: value,
    contentType: "markdown",
    editorProps: {
      attributes: {
        "aria-label": label,
        class:
          "min-h-24 px-4 py-3 text-base outline-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h3]:font-bold [&_h3]:text-lg [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 [&_blockquote]:text-gray-600 [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:text-sm [&_pre]:rounded [&_pre]:p-3 [&_pre]:my-2 [&_code]:font-mono [&_p_code]:bg-gray-100 [&_p_code]:px-1 [&_p_code]:rounded [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-2 [&_th]:py-1 [&_td]:border [&_td]:border-gray-200 [&_td]:px-2 [&_td]:py-1 [&_img]:max-w-md [&_img]:rounded [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:text-gray-400 [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:pointer-events-none",
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.getMarkdown();
      lastEmitted.current = markdown;
      onChange(markdown);
    },
  });

  // Pick up changes made outside this editor (Markdown mode, switching questions).
  useEffect(() => {
    if (!editor || value === lastEmitted.current) return;
    lastEmitted.current = value;
    editor.commands.setContent(value, { contentType: "markdown", emitUpdate: false });
  }, [editor, value]);

  return (
    <div className="border border-gray-200 focus-within:border-iron-gray">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  const active = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor
        ? {
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            code: editor.isActive("code"),
            heading: editor.isActive("heading", { level: 3 }),
            bulletList: editor.isActive("bulletList"),
            orderedList: editor.isActive("orderedList"),
            blockquote: editor.isActive("blockquote"),
            codeBlock: editor.isActive("codeBlock"),
          }
        : null,
  });

  if (!editor) return <div className="h-9 border-b border-gray-100 bg-gray-50" />;

  const buttons = [
    { key: "bold", label: "Bold", icon: Bold, run: () => editor.chain().focus().toggleBold().run() },
    { key: "italic", label: "Italic", icon: Italic, run: () => editor.chain().focus().toggleItalic().run() },
    { key: "code", label: "Inline code", icon: Code, run: () => editor.chain().focus().toggleCode().run() },
    { key: "heading", label: "Heading", icon: Heading3, run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { key: "bulletList", label: "Bulleted list", icon: List, run: () => editor.chain().focus().toggleBulletList().run() },
    { key: "orderedList", label: "Numbered list", icon: ListOrdered, run: () => editor.chain().focus().toggleOrderedList().run() },
    { key: "blockquote", label: "Quote", icon: Quote, run: () => editor.chain().focus().toggleBlockquote().run() },
    { key: "codeBlock", label: "Code block", icon: SquareCode, run: () => editor.chain().focus().toggleCodeBlock().run() },
  ] as const;

  return (
    <div role="toolbar" aria-label="Formatting" className="flex flex-wrap gap-0.5 border-b border-gray-100 bg-gray-50 px-1.5 py-1">
      {buttons.map(({ key, label, icon: Icon, run }) => (
        <button
          key={key}
          type="button"
          title={label}
          aria-label={label}
          aria-pressed={active?.[key] ?? false}
          onClick={run}
          className={`grid size-7 place-items-center rounded ${
            active?.[key] ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Icon size={15} aria-hidden />
        </button>
      ))}
    </div>
  );
}
