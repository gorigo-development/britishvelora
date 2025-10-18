cat > app/page.tsx <<'EOF'
export const dynamic = "force-dynamic"; // or: export const revalidate = 0

import { supabase } from "../lib/supabaseClient";
import AddMessage from "../components/AddMessage";
import LiveRefresh from "../components/LiveRefresh";

type Message = {
  id: string;
  content: string;
  created_at: string;
};

export default async function HomePage() {
  // server-side read of messages
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main id="main" className="mx-auto max-w-5xl p-6">
      {/* header */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">🎉 Autopilot Build Loop is ONLINE</h1>
        <p className="mb-4">Push to GitHub → Vercel auto-deploys. Next.js + Supabase is fully wired.</p>
      </section>

      {/* messages + form */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-2xl font-semibold mb-3">📬 Messages from Supabase</h2>

        {error && (
          <p className="text-red-600" role="alert">
            Failed to load messages: {error.message}
          </p>
        )}

        {!error && (!data || data.length === 0) && <p>No messages yet.</p>}

        <ul className="space-y-2">
          {data?.map((m: Message) => (
            <li key={m.id} className="rounded-lg border p-3">
              <p>{m.content}</p>
              <p className="text-xs opacity-70">{new Date(m.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>

        {/* add form */}
        <AddMessage />
        {/* realtime auto-refresh on INSERT */}
        <LiveRefresh />
      </section>
    </main>
  );
}
EOF