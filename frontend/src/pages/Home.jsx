import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center w-full">
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full border-b border-gray-200 fixed top-3 left-0 right-0 z-50 bg-white">
        <div className="text-2xl font-bold text-[#8B4513] cursor-pointer">
          <img src="/new.png" alt="Seedrowz logo" className="h-9 object-contain cursor-pointer" />
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          <a 
            href="#top-startups" 
            className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors"
          >
            Top Startups
          </a>
          <a 
            href="#about" 
            className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors"
          >
            About Us
          </a>
          
          <div className="flex items-center gap-4 ml-4">
            {currentUser && (
              <>
                <span className="hidden md:inline text-gray-700 text-sm">
                  Hi, {currentUser.name || currentUser.email || 'Founder'}
                </span>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg cursor-pointer hover:text-orange-500 hover:bg-white border border-orange-500"
                >
                  Go to Dashboard
                </button>
              </>
            )}
            {!currentUser && (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg cursor-pointer hover:text-orange-500 hover:bg-white border border-orange-500"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Login/Signup
              </button>
            )}
          </div>
        </div>
      </nav>


      <section className="px-8 py-20 md:py-20 lg:py-24 max-w-7xl mx-auto home-hero">
        <div className="max-w-5xl">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-5xl font-normal text-gray-800 mb-4 leading-tight mt-20 home-title">
            Hey Founders,
          </h1>
          
          {/* Welcome Message */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-3 flex-nowrap home-heading">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-normal text-gray-800 leading-tight whitespace-nowrap home-heading-main">
                Welcome to
              </h2>
              <div className="relative inline-block">
                <h3 className="text-6xl sm:text-9xl md:text-11xl lg:text-12xl ml-0 sm:ml-3 font-normal text-orange-500 leading-none whitespace-nowrap home-heading-brand">
                  Seedrowz
                </h3>
                <div className="flex items-center mt-3 home-hero-underline-wrap justify-center sm:justify-start">
                  <div className="h-2 md:h-1.6 bg-orange-500 w-full max-w-[200px] sm:max-w-[600px] home-underline"></div>
                  
                </div>
              </div>
            </div>
          </div>
          
  
          <p className="text-center text-xl sm:text-2xl md:text-3xl text-gray-700 mb-5 font-normal leading-relaxed max-w-4xl mx-auto">
            AI that grades your startup idea before investors do.
          </p>

          <p className="text-center text-base sm:text-lg md:text-xl text-dark-blue-500 mb-14 font-normal leading-relaxed max-w-3xl mx-auto ">
            Get an instant reality check, roadmap & investor recommendations powered by AI
          </p>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="mx-auto flex justify-center items-center bg-orange-500 hover:bg-white hover:text-orange-500 border border-orange-500 text-white px-10 py-5 rounded-4xl text-lg md:text-xl font-medium transition-colors shadow-lg hover:shadow-xl cursor-pointer"
          >
            Get the Reality Check
          </button>
        </div>
      </section>
        

      <section className="px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-800 text-center sm:text-left">
          How Seedrowz works?
        </h2>
      </section>
    </div>
  );
}
