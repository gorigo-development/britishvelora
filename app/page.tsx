import { supabase } from "@/lib/supabaseClient";

type Message = { id: string; content: string; created_at: string };

export default async function HomePage() {
  // server-side read
  const { data, error } = await supabase
    .from<Message>("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main id="main" className="mx-auto max-w-5xl p-6">
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">🎉 Autopilot Build Loop is ONLINE</h1>
        <p className="mb-4">Push to GitHub → Vercel auto-deploys. Next.js + Supabase is wired.</p>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-2xl font-semibold mb-3">📬 Messages from Supabase</h2>

        {error && (
          <p className="text-red-600" role="alert">
            Failed to load messages: {error.message}
          </p>
        )}

        {!error && (!data || data.length === 0) && <p>No messages yet.</p>}

        <ul className="space-y-2">
          {data?.map((m) => (
            <li key={m.id} className="rounded-lg border p-3">
              <p>{m.content}</p>
              <p className="text-xs opacity-70">{new Date(m.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}