// BookSynopsisEditorWrapper.tsx
"use client";
import dynamic from "next/dynamic";

const BookSynopsisEditor = dynamic(() => import("./BookSynopsisEditor"), {
  ssr: false,
});

export default BookSynopsisEditor;
