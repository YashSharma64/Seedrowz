import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    linkedin: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || (!isLogin && !form.username)) {
      alert('Please fill in the required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register';

      const body = isLogin
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            name: form.username,
            email: form.email,
            password: form.password,
            role: 'user',
          };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = data.error || data.message || 'Something went wrong. Please try again.';
        throw new Error(message);
      }

      if (isLogin) {
        if (!data.token) {
          throw new Error('Login succeeded but no token was returned from the server.');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || {}));

        navigate('/dashboard');
      } else {
        alert('Account created successfully. You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Auth error:', err);
      alert(err.message || 'Unable to complete the request.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                autoComplete="off"
                className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none text-sm py-1.5"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
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
              autoComplete="off"
              className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none text-sm py-1.5"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs text-gray-500 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:outline-none text-sm py-1.5"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
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
                placeholder="Enter your linkedin URL"
                value={form.linkedin}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="button"
            className="w-full bg-[#FF7A32] hover:bg-[#ff8747] text-white font-semibold text-sm py-3 rounded-full shadow-sm transition-colors mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait…' : isLogin ? 'Login' : 'Signup'}
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
