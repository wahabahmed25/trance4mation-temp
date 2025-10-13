import Link from "next/link";
export default function Home() {
   return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
         <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">Welcome to Trance4mation</h1>
         <p className="text-lg sm:text-xl max-w-xl text-center mb-8">
            This is the starting point of our internship project. <br />
            Here, we’ll be building everything from scratch using Next.js, React, TypeScript, Tailwind, and pnpm inside a shared monorepo. *This is
            not the official Home page*
         </p>
         <div className="flex gap-4">
            <a
               href="https://nextjs.org/docs"
               target="_blank"
               rel="noopener noreferrer"
               className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
               Next.js Docs
            </a>
            <a
               href="https://tailwindcss.com/docs"
               target="_blank"
               rel="noopener noreferrer"
               className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition">
               Tailwind Docs
            </a>
         </div>
         <footer className="absolute bottom-4 text-sm opacity-80">Built with ❤️ by the Trance4mation Interns</footer>
         <div className="p-3">
            <h1 className="p-3">*FEATURES ROUTES BELOW*</h1>
            <Link href="/social" className="mt-6 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
               Social Feed
            </Link>
            <Link href="/discussion-circle" className="mt-6 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
               Discussion circle
            </Link>
            <Link href="/mood-calendar" className="mt-6 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
               Mood Calendar
            </Link>
            <Link href="/landing" className="mt-6 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
               Landing
            </Link>
         </div>
      </main>
   );
}
