import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcamp from "../../components/Breadcamp";
import { FaArrowRightLong } from "react-icons/fa6";
import { resetPassword } from '@/utils/api/common';

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  useEffect(() => {
    // Wait for router to be ready
    if (router.isReady) {
      // Get token from URL query parameters
      const urlToken = router.query.token;
      console.log('Token from URL:', urlToken); // Debug log
      
      if (urlToken) {
        setToken(urlToken);
        setError(''); // Clear any previous error
      } else {
        setError('Invalid or missing reset token');
      }
    }
  }, [router.isReady, router.query]);

  const validatePassword = (password) => {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and allows special characters
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&#\-_+=()[\]{}|;:,.<>]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Debug logs
    console.log('Submitting with token:', token);
    console.log('Password:', password);
    console.log('Password confirmation:', passwordConfirmation);

    if (!token) {
      setError('Invalid or missing reset token');
      setIsLoading(false);
      return;
    }

    if (!password || !passwordConfirmation) {
      setError('Password and confirmation are required');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and can include special characters (@$!%*?&#-_+=()[]{}|;:,.<>)');
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Calling resetPassword API with:', { token, password, password_confirmation: passwordConfirmation });
      const response = await resetPassword({
        token,
        password,
        password_confirmation: passwordConfirmation
      });
      console.log('API Response:', response);

      if (response.status) {
        setIsSubmitted(true);
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          router.push('/account/sign-in');
        }, 3000);
      } else {
        setError(response.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcamp
        breadCampTitle="Reset Password"
        breadCampLink="Home"
        breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent="Reset Password"
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600">
              Enter your new password below
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPasswordConfirmation ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value);
                      setError('');
                    }}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  >
                    {showPasswordConfirmation ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-SecondaryColor-0 text-white py-2 px-4 rounded-lg hover:bg-SecondaryColor-1 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </motion.button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FaLock className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Password Reset Successful</h2>
              <p className="text-gray-600">
                Your password has been reset successfully. You will be redirected to the sign in page.
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

export default ResetPassword; 