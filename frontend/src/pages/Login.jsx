import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10 sm:py-16">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-sm py-12 sm:py-10 px-6 sm:px-10 flex flex-col items-center">
        <div className="mb-6 text-lg font-semibold text-gray-800">Logo</div>

        <button className="w-full max-w-[250px] bg-gray-100 hover:bg-orange-400 hover:text-white text-gray-800 text-sm font-medium py-3 rounded-full mb-4 transition-colors cursor-pointer">
          Continue with Github
        </button>

        <div className="flex items-center w-full my-2 mb-6 text-xs text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3">Or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="w-full bg-gray-50 rounded-3xl px-5 sm:px-6 py-7 sm:py-8">
          {isLogin ? (
            <h2 className="text-center text-lg font-semibold text-gray-800 leading-snug mb-6">
              Log in to analyse
              <br />
              Your Idea
            </h2>
          ) : (
            <h2 className="text-center text-lg font-semibold text-gray-800 leading-snug mb-6">
              Create your account
            </h2>
          )}

          {!isLogin && (
            <div className="mb-5">
              <label className="block text-xs text-gray-500 mb-1" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none text-sm py-1.5"
                placeholder=""
              />
            </div>
          )}

          <div className="mb-5">
            <label className="block text-xs text-gray-500 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none text-sm py-1.5"
              placeholder=""
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs text-gray-500 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none text-sm py-1.5"
              placeholder=""
            />
          </div>

          {!isLogin && (
            <div className="mb-7">
              <label className="block text-xs text-gray-500 mb-1" htmlFor="linkedin">
                Linkedin URL
              </label>
              <input
                id="linkedin"
                type="url"
                className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none text-sm py-1.5"
                placeholder=""
              />
            </div>
          )}

          <button
            type="button"
            className="w-full bg-[#FF7A32] hover:bg-[#ff8747] text-white font-semibold text-sm py-3 rounded-full shadow-sm transition-colors mt-2 cursor-pointer"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          {isLogin ? (
            <p>
              Don't have account?{' '}
              <button
                type="button"
                className="text-orange-500 font-medium hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Create new account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="text-orange-500 font-medium hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
