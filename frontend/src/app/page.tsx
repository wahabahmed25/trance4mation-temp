export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
        Welcome to Trance4mation
      </h1>
      <p className="text-lg sm:text-xl max-w-xl text-center mb-8">
        This is the starting point of our internship project. <br />
        Here, we’ll be building everything from scratch using Next.js, React,
        TypeScript, Tailwind, and pnpm inside a shared monorepo.
      </p>
      <div className="flex gap-4">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Next.js Docs
        </a>
        <a
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          Tailwind Docs
        </a>
      </div>
      <footer className="absolute bottom-4 text-sm opacity-80">
        Built with ❤️ by the Trance4mation Interns
      </footer>
    </main>
  );
}
