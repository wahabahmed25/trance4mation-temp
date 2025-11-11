import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
        <h1 className='p-3 bold mr-4 border-red-700 border-2 rounded-xl'>Landing Page</h1>
      <Link
        href="/home"
        className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition w-1/3 text-center"
      >
        Home
      </Link>
    </div>
  )
}

export default Page
