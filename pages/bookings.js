import { useRouter } from 'next/router';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaArrowRightLong } from 'react-icons/fa';
import Breadcamp from '../components/Breadcamp';
import withAuth from '@/components/withAuth';
import { getBookings } from '@/utils/api/common';

const Bookings = ({ bookings = [] }) => {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcamp
        breadCampTitle="My Bookings"
        breadCampLink="Home"
        breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent="My Bookings"
        url="/"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven&apos;t made any bookings yet.</p>
              <button
                onClick={() => router.push('/book-appointment')}
                className="bg-SecondaryColor-0 text-white px-6 py-3 rounded-lg hover:bg-SecondaryColor-1 transition-colors"
              >
                Book a Service
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {booking.service.name}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      Booking ID: {booking.booking_id}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <FaCalendarAlt className="w-5 h-5 text-SecondaryColor-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">{booking.formatted_booking_date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaClock className="w-5 h-5 text-SecondaryColor-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium">{booking.formatted_booking_time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-SecondaryColor-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{booking.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaUser className="w-5 h-5 text-SecondaryColor-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-medium">{booking.full_name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaPhone className="w-5 h-5 text-SecondaryColor-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{booking.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaEnvelope className="w-5 h-5 text-SecondaryColor-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{booking.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Property Details</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-gray-800">
                            <span className="font-medium">Type:</span> {booking.property_details.cleaning_type}
                          </p>
                          <p className="text-gray-800">
                            <span className="font-medium">Size:</span> {booking.property_details.property_size} sq ft
                          </p>
                          {booking.property_details.event_type && (
                            <p className="text-gray-800">
                              <span className="font-medium">Event Type:</span> {booking.property_details.event_type}
                            </p>
                          )}
                          {booking.property_details.guest_count && (
                            <p className="text-gray-800">
                              <span className="font-medium">Guest Count:</span> {booking.property_details.guest_count}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Price</p>
                        <p className="text-2xl font-bold text-SecondaryColor-0">£{booking.total_price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Bookings);

export const getServerSideProps = withAuth(async (context) => {
  try {
    const response = await getBookings();
    const bookings = response?.data || [];
    console.log(bookings);
    return {
      props: {
        bookings
      }
    };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return {
      props: {
        bookings: []
      }
    };
  }
}); 