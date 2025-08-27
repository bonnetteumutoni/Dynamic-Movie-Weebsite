'use client';

import { useState } from 'react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-md w-full bg-black bg-opacity-80 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-yellow-500 mb-6 text-center">Sign In</h1>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-semibold py-3 rounded"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="text-yellow-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
