'use client';

import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gray-950/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4">Log in to <span className='text-2xl font-bold text-yellow-500'>Moovie</span></h1>
        <p className="text-gray-400 mb-6">Enter your details below</p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email or Phone Number
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email or Phone Number"
              className="w-full py-4 px-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full py-4 px-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit" 
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            ><Link href='/'>Log In</Link>
            </button>
            <Link href="/forgot-password" className="text-red-500 hover:underline">
              Forget Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;