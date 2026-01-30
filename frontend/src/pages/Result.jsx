import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultId } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.evaluation) {
      setEvaluation(location.state.evaluation);
      setLoading(false);
    } else if (resultId) {
      fetchEvaluation(resultId);
    } else {
      navigate('/dashboard');
    }
  }, [resultId, location.state, navigate]);

  const fetchEvaluation = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/evaluation/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEvaluation(data);
      } else if (response.status === 401) {
        navigate('/login');
      } else {
        console.error('Failed to fetch evaluation');
      }
    } catch (error) {
      console.error('Error fetching evaluation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-[#F4EFEA] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No evaluation data found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#F4EFEA]">
      {/* Nav  */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 max-w-7xl mx-auto w-full border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-[#F4EFEA]">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src="/new.png" alt="Seedrowz logo" className="h-9 object-contain cursor-pointer" />
        </div>
        
        <div className="hidden md:flex items-center gap-4 sm:gap-8 md:gap-12 text-sm sm:text-base">
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
          
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden">
            <img
              src="logonew.png"
              alt="User avatar"
              className="h-7 w-7 object-contain"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-28 pb-20 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-normal text-orange-500 mb-4"
          >
            Your Startup Reality Check
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700"
          >
            Analyzing feasibility, scalability, market potential score using AI...
          </motion.p>
        </div>

        <div className="bg-white rounded-lg border-2 border-orange-500 p-6 sm:p-8 shadow-lg">
          <div className="mb-8 text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
              className={`inline-block px-6 py-3 rounded-full text-xl font-semibold ${
              evaluation.verdict?.includes('Pass') 
                ? 'bg-green-100 text-green-800' 
                : evaluation.verdict?.includes('Risky')
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {evaluation.verdict || 'Evaluation Complete'}
            </motion.div>
          </div>

          {evaluation.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{evaluation.summary}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <p className="text-sm text-gray-600 mb-2">Feasibility</p>
              <p className="text-3xl font-bold text-orange-500">{evaluation.feasibility || 0}%</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <p className="text-sm text-gray-600 mb-2">Market Potential</p>
              <p className="text-3xl font-bold text-orange-500">{evaluation.marketPotential || 0}%</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <p className="text-sm text-gray-600 mb-2">Competition</p>
              <p className="text-3xl font-bold text-orange-500">{evaluation.competition || 0}%</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <p className="text-sm text-gray-600 mb-2">Scalability</p>
              <p className="text-3xl font-bold text-orange-500">{evaluation.scalability || 0}%</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <p className="text-sm text-gray-600 mb-2">Execution Difficulty</p>
              <p className="text-3xl font-bold text-orange-500">{evaluation.executionDifficulty || 0}%</p>
            </motion.div>
          </div>

          {evaluation.nextSteps && evaluation.nextSteps.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Steps</h2>
              <ul className="space-y-3">
                {evaluation.nextSteps.map((step, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 + (index * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 flex-1">{step}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.techStack && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Tech Stack</h2>
              <p className="text-gray-700 text-lg">{evaluation.techStack}</p>
            </div>
          )}

          {evaluation.fundingStage && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Funding Stage</h2>
              <p className="text-gray-700 text-lg font-semibold">{evaluation.fundingStage}</p>
            </div>
          )}

          {evaluation.investorMatches && evaluation.investorMatches.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Investors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evaluation.investorMatches.map((investor, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-1">{investor.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">Type: {investor.type}</p>
                    {investor.ticketSize && (
                      <p className="text-sm text-gray-600">Ticket Size: {investor.ticketSize}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Evaluate Another Idea
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}


