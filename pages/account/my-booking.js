import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import Breadcamp from "../../components/Breadcamp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { withAuth } from "@/utils/withAuth";
import axios from "axios";

const BookingModal = ({ booking, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-HeadingColor-0">Booking Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="font-medium">{booking.booking_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${
                  booking.status === 'confirmed' ? 'text-green-600' :
                  booking.status === 'cancelled' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Service Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Service Name</p>
                  <p className="font-medium">{booking.service.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="font-medium">${booking.total_price || '0.00'}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Schedule Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{booking.formatted_booking_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{booking.formatted_booking_time}</p>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Additional Notes</h4>
                <p className="text-gray-600">{booking.notes}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyBooking = ({ bookings }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filterBookings = (status) => {
    const today = new Date();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.booking_date);
      if (status === 'upcoming') {
        return bookingDate >= today && booking.status !== 'cancelled';
      } else if (status === 'completed') {
        return bookingDate < today && booking.status !== 'cancelled';
      } else if (status === 'cancelled') {
        return booking.status === 'cancelled';
      }
      return true;
    });
  };

  const filteredBookings = filterBookings(activeTab);

  return (
    <>
      <Breadcamp
        breadCampTitle="AB Booking"
        breadCampLink="Home"
        breadcampIcon={<FaArrowRightLong />}
        breadcampIcon2={<FaArrowRightLong />}
        breadCampContent="AB Booking"
        url="/"
      />

      <section className="py-[120px] bg-gray-50">
        <div className="Container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
              <h3 className="font-Inter font-semibold text-lg text-HeadingColor-0 mb-4">
                Booking Status
              </h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'upcoming'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Upcoming Bookings
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'completed'
                      ? 'bg-green-50 text-green-600 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Completed Bookings
                </button>
                <button
                  onClick={() => setActiveTab('cancelled')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'cancelled'
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Cancelled Bookings
                </button>
              </nav>
            </div>

            {/* Booking List Section */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-Inter font-semibold text-2xl text-HeadingColor-0 mb-6">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Bookings
                </h3>
                <div className="grid gap-6">
                  {filteredBookings && filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Booking ID</p>
                            <p className="font-medium">{booking.booking_id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Service</p>
                            <p className="font-medium">{booking.service.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="font-medium">
                              {booking.formatted_booking_date} at {booking.formatted_booking_time}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <div className="mb-4">
                              <p className="text-sm text-gray-500">Status</p>
                              <p className={`font-medium ${
                                booking.status === 'confirmed' ? 'text-green-600' :
                                booking.status === 'cancelled' ? 'text-red-600' :
                                'text-yellow-600'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              <span>View Details</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No {activeTab} bookings found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
};

export default MyBooking;


export const getServerSideProps = withAuth(async context => {
  try {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const response = await axios.get(`${baseUrl}/api/get-bookings`, {
      headers: {
        cookie: context.req.headers.cookie
      }
    });

    const bookings = response.data.data || [];
    console.log("bookings-getServerSideProps-bookings", bookings);
    return {
      props: {
        bookings,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error.response?.data || error.message);
    return {
      props: {
        bookings: [],
      },
    };
  }
});

