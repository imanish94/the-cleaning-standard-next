import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Breadcamp from "../../components/Breadcamp";
import { FaArrowRightLong } from "react-icons/fa6";
import { forgotPassword } from '@/utils/api/common';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await forgotPassword(email);
      if (response.status) {
        setIsSubmitted(true);
      } else {
        setError(response.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcamp
        breadCampTitle="Forgot Password"
        breadCampLink="Home"
        breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent="Forgot Password"
        url="/"
      />
      
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h1>
            <p className="text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-SecondaryColor-0 text-white py-2 px-4 rounded-lg hover:bg-SecondaryColor-1 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </motion.button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FaEnvelope className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Check Your Email</h2>
              <p className="text-gray-600">
                We&apos;ve sent a password reset link to {email}
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/account/sign-in"
              className="inline-flex items-center text-sm font-medium text-SecondaryColor-0 hover:text-SecondaryColor-1"
            >
              <FaArrowLeft className="mr-2" />
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword; 