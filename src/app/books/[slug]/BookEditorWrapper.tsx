"use client";
import dynamic from "next/dynamic";

const BookEditor = dynamic(() => import("./BookEditor"), { ssr: false });

export default BookEditor;
