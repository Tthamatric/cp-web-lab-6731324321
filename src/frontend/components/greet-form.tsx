"use client";

import { useState } from "react";

export function GreetForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const url = name
        ? "/api/greet?name=" + encodeURIComponent(name)
        : "/api/greet";
      const res = await fetch(url);
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
        Greeting demo
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">
        Say hello
      </h1>

      <label className="mt-6 block text-sm font-medium text-zinc-600">
        Your name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-2 text-zinc-950"
        />
      </label>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Get greeting"}
      </button>

      {message && (
        <p className="mt-6 text-base leading-7 text-zinc-600">{message}</p>
      )}
    </article>
  );
}
