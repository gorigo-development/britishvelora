export default function HomePage() {
  return (
    <main id="main" className="mx-auto max-w-5xl p-6">
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h1 className="text-3xl font-bold mb-2">🎉 Autopilot Build Loop is ONLINE</h1>
        <p className="mb-4">
          Push to GitHub → Vercel auto-deploys. This is your new Next.js base.
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>Accessible layout with focus rings & readable text</li>
          <li>Tailwind ready — modern responsive styling</li>
          <li>Supabase integration coming next (auth + DB)</li>
        </ul>
        <a
          className="inline-block rounded-xl border px-4 py-2"
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
        >
          Powered by Vercel
        </a>
      </section>
    </main>
  );
}
