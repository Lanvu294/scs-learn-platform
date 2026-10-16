import type { Metadata } from "next";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"

export default function Page() {
  return <SimpleEditor />
}

export const metadata: Metadata = { title: "Editor demo" };
