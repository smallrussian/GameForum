import React from 'react';
import Link from 'next/link';

const LandingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
    <div className="text-center text-white space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold">Welcome to Your App</h1>
      <p className="text-xl md:text-2xl">
        A short description of your app or what it does goes here.
      </p>
      <div className="space-x-4">
        <Link
          href="/signup"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-blue-100"
        >
          Sign Up
        </Link>
        <Link
          href="/signin"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-blue-100"
        >
          Sign In
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
