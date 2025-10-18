"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AddMessage() {
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!content.trim()) return;

    setBusy(true);
    const { error } = await supabase.from("messages").insert({ content });
    setBusy(false);

    if (error) {
      setErr(error.message);
      return;
    }
    setContent("");
    router.refresh(); // reload server data list
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mt-6">
      <label htmlFor="msg" className="block font-medium mb-2">
        Add a new message
      </label>
      <div className="flex gap-2 items-start">
        <input
          id="msg"
          name="msg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 rounded-xl border px-3 py-2"
          aria-describedby="msg-help"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !content.trim()}
          className="rounded-xl border px-4 py-2"
          aria-live="polite"
        >
          {busy ? "Saving..." : "Add"}
        </button>
      </div>
      <p id="msg-help" className="text-sm opacity-70 mt-1">
        Press Enter to submit. Works with screen readers and keyboard only.
      </p>
      {err && (
        <p role="alert" className="text-red-600 mt-2">
          {err}
        </p>
      )}
    </form>
  );
}
