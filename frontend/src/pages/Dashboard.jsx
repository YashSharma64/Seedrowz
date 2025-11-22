import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startupTitle: '',
    oneLinePitch: '',
    problemStatement: '',
    proposedSolution: '',
    targetAudience: '',
    businessModel: '',
    competition: '',
    experience: '',
    qualification: '',
    skillsExpertise: '',
    founderRole: '',
    usersWaitlist: '',
    mvpPrototypeReady: '',
    incubationMentorship: '',
    soloOrTeam: '',
    fullTimeCommitted: '',
    vision2to5Years: '',
  });

  const [showBusinessModelDropdown, setShowBusinessModelDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const businessModelOptions = ['B2B', 'B2C', 'SaaS', 'Marketplace', 'Subscription'];
  const dropdownRef = useRef(null);
  
  const inputRefs = {
    startupTitle: useRef(null),
    oneLinePitch: useRef(null),
    problemStatement: useRef(null),
    proposedSolution: useRef(null),
    targetAudience: useRef(null),
    competition: useRef(null),
    experience: useRef(null),
    qualification: useRef(null),
    skillsExpertise: useRef(null),
    founderRole: useRef(null),
    usersWaitlist: useRef(null),
    mvpPrototypeReady: useRef(null),
    incubationMentorship: useRef(null),
    soloOrTeam: useRef(null),
    fullTimeCommitted: useRef(null),
    vision2to5Years: useRef(null),
  };


  const inputOrder = [
    'startupTitle',
    'oneLinePitch',
    'problemStatement',
    'proposedSolution',
    'targetAudience',
    'competition',
    'experience',
    'qualification',
    'skillsExpertise',
    'founderRole',
    'usersWaitlist',
    'mvpPrototypeReady',
    'incubationMentorship',
    'soloOrTeam',
    'fullTimeCommitted',
    'vision2to5Years',
  ];

  // Handle Enter key to move to next field
  // For textareas: Shift+Enter = new line, Enter = next field
  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const currentIndex = inputOrder.indexOf(currentField);
      if (currentIndex < inputOrder.length - 1) {
        const nextField = inputOrder[currentIndex + 1];
        inputRefs[nextField]?.current?.focus();
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBusinessModelDropdown(false);
      }
    };

    if (showBusinessModelDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBusinessModelDropdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Map form data to API request format
      const requestBody = {
        title: formData.startupTitle,
        pitch: formData.oneLinePitch,
        problem: formData.problemStatement,
        solution: formData.proposedSolution,
        marketSize: '', // Not in form, it can be added later if needed
        targetAudience: formData.targetAudience,
        businessModel: formData.businessModel,
        competition: formData.competition,
        experience: formData.experience,
        education: formData.qualification,
        skills: formData.skillsExpertise,
        founderRole: formData.founderRole,
        traction: formData.usersWaitlist,
        mvpReady: formData.mvpPrototypeReady,
        vision: formData.vision2to5Years,
      };

      // Get API base URL from environment or use default
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      console.log('Submitting to:', `${API_BASE_URL}/api/evaluate-idea`);
      console.log('Request body:', requestBody);
      
      const response = await fetch(`${API_BASE_URL}/api/evaluate-idea`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(`API error: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle success response
      if (data.success && data.resultId) {
        // Store evaluation result in localStorage or state management
        // Navigate to results page with resultId
        navigate(`/results/${data.resultId}`, { 
          state: { 
            evaluation: data.evaluation,
            resultId: data.resultId 
          } 
        });
      } else {
        throw new Error('Invalid response from server');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // More detailed error message
      let errorMessage = 'Failed to submit form. ';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage += 'Cannot connect to the server. Please make sure the backend server is running on http://localhost:5000';
      } else if (error.message.includes('API error')) {
        errorMessage += error.message;
      } else {
        errorMessage += error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-[#F4EFEA]">
        {/* Logo */}
        <div 
          className="text-2xl font-bold text-[#8B4513] cursor-pointer"
          onClick={() => navigate('/')}
        >
          Seedrowz
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-12">
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
          
          {/* User Profile Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-700" 
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-28 pb-20 px-8 max-w-4xl mx-auto ">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl text-orange-500 hover:text-orange-300 mb-4 text-center mt-5">
            Get an Honest AI Evaluation for Your Idea
          </h1>
          <p className="text-lg md:text-xl text-gray-700 text-center mt-10">
            Your First Step Into the Startup World
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <div>
              <label htmlFor="startupTitle" className="block text-base font-medium text-gray-700 mb-2">
                Startup Title
              </label>
              <input
                type="text"
                id="startupTitle"
                name="startupTitle"
                ref={inputRefs.startupTitle}
                value={formData.startupTitle}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'startupTitle')}
                placeholder="Your startup's name."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="oneLinePitch" className="block text-base font-medium text-gray-700 mb-2">
                One-Line Pitch
              </label>
              <input
                type="text"
                id="oneLinePitch"
                name="oneLinePitch"
                ref={inputRefs.oneLinePitch}
                value={formData.oneLinePitch}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'oneLinePitch')}
                placeholder="Summarize your idea in one sentence."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Section 2: Problem & Solution */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Problem & Solution
            </h2>

            <div>
              <label htmlFor="problemStatement" className="block text-base font-medium text-gray-700 mb-2">
                Problem Statement
              </label>
              <textarea
                id="problemStatement"
                name="problemStatement"
                ref={inputRefs.problemStatement}
                value={formData.problemStatement}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'problemStatement')}
                placeholder="What exact problem are you solving? Why does it matter?"
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-y"
              />
            </div>

            <div>
              <label htmlFor="proposedSolution" className="block text-base font-medium text-gray-700 mb-2">
                Proposed Solution
              </label>
              <textarea
                id="proposedSolution"
                name="proposedSolution"
                ref={inputRefs.proposedSolution}
                value={formData.proposedSolution}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'proposedSolution')}
                placeholder="How does your product solve the problem?"
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-y"
              />
            </div>
          </div>

          {/* Section 3: Market & Audience */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Market & Audience
            </h2>

            <div>
              <label htmlFor="targetAudience" className="block text-base font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                ref={inputRefs.targetAudience}
                value={formData.targetAudience}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'targetAudience')}
                placeholder="Who will use your product? (eg. Students, founders, restaurants, SMBs)."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Section 4: Business & Competition */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Business & Competition
            </h2>

            <div>
              <label htmlFor="businessModel" className="block text-base font-medium text-gray-700 mb-2">
                Business Model
              </label>
              <div className="relative" ref={dropdownRef}>
                <input
                  type="text"
                  id="businessModel"
                  name="businessModel"
                  value={formData.businessModel}
                  onChange={handleChange}
                  placeholder="B2B, B2C, SaaS, Marketplace, Subscription"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400 pr-32"
                  readOnly
                  onClick={() => setShowBusinessModelDropdown(!showBusinessModelDropdown)}
                />
                <button
                  type="button"
                  onClick={() => setShowBusinessModelDropdown(!showBusinessModelDropdown)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  Select one
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${showBusinessModelDropdown ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {showBusinessModelDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {businessModelOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, businessModel: option }));
                          setShowBusinessModelDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="competition" className="block text-base font-medium text-gray-700 mb-2">
                Competition
              </label>
              <input
                type="text"
                id="competition"
                name="competition"
                ref={inputRefs.competition}
                value={formData.competition}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'competition')}
                placeholder="Existing competitors (optional). What makes you different?"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Section 5: Founder Information */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Founder Information
            </h2>

            <div>
              <label htmlFor="experience" className="block text-base font-medium text-gray-700 mb-2">
                Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                ref={inputRefs.experience}
                value={formData.experience}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'experience')}
                placeholder="Work / Startup / Internship / Industry"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="qualification" className="block text-base font-medium text-gray-700 mb-2">
                Qualification / Education
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                ref={inputRefs.qualification}
                value={formData.qualification}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'qualification')}
                placeholder="Degree, IIT/IIM/BITS/NIT, CA, MBA, BTech CSE, etc."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="skillsExpertise" className="block text-base font-medium text-gray-700 mb-2">
                Skills & Expertise
              </label>
              <input
                type="text"
                id="skillsExpertise"
                name="skillsExpertise"
                ref={inputRefs.skillsExpertise}
                value={formData.skillsExpertise}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'skillsExpertise')}
                placeholder="Tech, Business, Marketing, Finance, AI, Product, Sales, etc."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="founderRole" className="block text-base font-medium text-gray-700 mb-2">
                Founder Role
              </label>
              <input
                type="text"
                id="founderRole"
                name="founderRole"
                ref={inputRefs.founderRole}
                value={formData.founderRole}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'founderRole')}
                placeholder="Tech Founder / Business Founder / Solo Founder / Co-Founder"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Section 6: Traction (Optional) */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Traction (Optional)
            </h2>

            <div>
              <label htmlFor="usersWaitlist" className="block text-base font-medium text-gray-700 mb-2">
                Users / Waitlist
              </label>
              <input
                type="text"
                id="usersWaitlist"
                name="usersWaitlist"
                ref={inputRefs.usersWaitlist}
                value={formData.usersWaitlist}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'usersWaitlist')}
                placeholder="Ex: 120 signups, 10 beta testers"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="mvpPrototypeReady" className="block text-base font-medium text-gray-700 mb-2">
                MVP / Prototype ready?
              </label>
              <input
                type="text"
                id="mvpPrototypeReady"
                name="mvpPrototypeReady"
                ref={inputRefs.mvpPrototypeReady}
                value={formData.mvpPrototypeReady}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'mvpPrototypeReady')}
                placeholder="Yes/No"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="incubationMentorship" className="block text-base font-medium text-gray-700 mb-2">
                Selected in incubation / mentorship?
              </label>
              <input
                type="text"
                id="incubationMentorship"
                name="incubationMentorship"
                ref={inputRefs.incubationMentorship}
                value={formData.incubationMentorship}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'incubationMentorship')}
                placeholder="Yes/Looking for it"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Section 7: Vision */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Vision
            </h2>

            <div>
              <label htmlFor="soloOrTeam" className="block text-base font-medium text-gray-700 mb-2">
                Are you a solo founder or team-based?
              </label>
              <input
                type="text"
                id="soloOrTeam"
                name="soloOrTeam"
                ref={inputRefs.soloOrTeam}
                value={formData.soloOrTeam}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'soloOrTeam')}
                placeholder="Solo founder / Team-based"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="fullTimeCommitted" className="block text-base font-medium text-gray-700 mb-2">
                Are you full-time committed to this idea?
              </label>
              <input
                type="text"
                id="fullTimeCommitted"
                name="fullTimeCommitted"
                ref={inputRefs.fullTimeCommitted}
                value={formData.fullTimeCommitted}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'fullTimeCommitted')}
                placeholder="Yes/Just Testing"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="vision2to5Years" className="block text-base font-medium text-gray-700 mb-2">
                Where do you see this going in 2-5 years?
              </label>
              <textarea
                id="vision2to5Years"
                name="vision2to5Years"
                ref={inputRefs.vision2to5Years}
                value={formData.vision2to5Years}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'vision2to5Years')}
                placeholder="Describe your long-term vision for the startup"
                rows="4"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-y"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex justify-center items-center mx-auto w-full md:w-auto bg-orange-500 border border-orange-500 text-white px-10 py-4 rounded-lg text-lg font-medium transition-colors shadow-md ${
                isLoading 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:bg-white hover:text-orange-500 hover:shadow-lg cursor-pointer'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Evaluating your startup idea…
                </span>
              ) : (
                'Get My Reality Check'
              )}
            </button>
            
            {isLoading && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  👉 Analyzing feasibility, scalability, market potential using AI…
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

