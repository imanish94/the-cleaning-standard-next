import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaMapMarkerAlt, FaHome, FaCity, FaBuilding } from 'react-icons/fa';
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Breadcamp from "../../components/Breadcamp";
import { FaArrowRightLong } from "react-icons/fa6";
import { updateProfile } from '@/utils/api/common';
import { validateProfile } from '@/utils/validations/customer-profile-validation';
import { profileFields } from '@/utils/constants/profile-fields';
import { withAuth } from '@/utils/withAuth';

const LoadingSpinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

const Profile = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ...profileFields
  });

  useEffect(() => {
    if (session?.user && !formData.name) {
      console.log("Session user data:", session.user);
      setFormData({
        name: session.user.name || '',
        phoneno: session.user.phoneno || '',
        postcode: session.user.postcode || '',
        town: session.user.town || '',
        county: session.user.county || '',
        street: session.user.street || '',
        house_flat_no: session.user.house_flat_no || ''
      });
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a copy of formData without customer_id
    const { customer_id, ...updateData } = formData;
    
    console.log("updateData", updateData);
    
    const { isValid, errors: validationErrors } = validateProfile(updateData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSuccess(false);
    setErrors({});

    try {
      console.log("updateData", updateData);

     // return;
      const response = await updateProfile(updateData);

      console.log("response - client", response);
      
      if (response.status) {
        setSuccess(true);
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            ...response.data
          }
        };
        await update(newSession);
        // Keep the form data in sync with the updated session
        setFormData(prev => ({
          ...prev,
          ...response.data
        }));
      } else {
        setErrors({ submit: response.message || 'Failed to update profile' });
      }
    } catch (error) {
      setErrors({ 
        submit: error.message || 'An error occurred while updating profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (fieldKey) => {
    const getIcon = (field) => {
      switch (field) {
        case 'name':
          return FaUser;
        case 'phoneno':
          return FaPhone;
        case 'postcode':
        case 'street':
          return FaMapMarkerAlt;
        case 'house_flat_no':
          return FaHome;
        case 'town':
          return FaCity;
        case 'county':
          return FaBuilding;
        default:
          return FaUser;
      }
    };

    const getLabel = (field) => {
      switch (field) {
        case 'name':
          return 'Full Name';
        case 'phoneno':
          return 'Phone Number';
        case 'postcode':
          return 'Postcode';
        case 'town':
          return 'Town';
        case 'county':
          return 'County';
        case 'street':
          return 'Street';
        case 'house_flat_no':
          return 'House/Flat Number';
        default:
          return field;
      }
    };

    const Icon = getIcon(fieldKey);
    return (
      <div key={fieldKey}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {getLabel(fieldKey)}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={fieldKey === 'phoneno' ? 'tel' : 'text'}
            id={fieldKey}
            value={formData[fieldKey] || ''}
            onChange={(e) => {
              setFormData({ ...formData, [fieldKey]: e.target.value });
              if (errors[fieldKey]) {
                setErrors({ ...errors, [fieldKey]: null });
              }
            }}
            placeholder={`Enter your ${getLabel(fieldKey).toLowerCase()}`}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-SecondaryColor-0 focus:border-transparent ${
              errors[fieldKey] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors[fieldKey] && (
          <p className="mt-1 text-sm text-red-500">{errors[fieldKey]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcamp
        breadCampTitle="My Profile"
        breadCampLink="Home"
        breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent="My Profile"
        url="/"
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h1>
            <p className="text-gray-600">Update your personal information</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(profileFields).map(fieldKey => renderField(fieldKey))}
            </div>

            {errors.submit && (
              <div className="text-sm text-red-500 text-center">{errors.submit}</div>
            )}

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="bg-SecondaryColor-0 text-white py-2 px-6 rounded-lg hover:bg-SecondaryColor-1 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 


export const getServerSideProps = withAuth(async context => {
  const session = await getSession(context);
  const { user } = session;

  return {
    props: {
      userDetails: user
    }
  };
});