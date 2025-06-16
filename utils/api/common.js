import axios from "axios";

export const verifyUser = async params => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/validate-token`,
      {
        headers: {
          Authorization: `Bearer ${params.token}`
        }
      }
    );
    return response.data;
   
  } catch (e) {
    if (e.response) {
      return e.response.data;
    }

    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const updateProfile = async body => {
  try {
    const response = await axios.post("/api/auth/update-profile", body);
    console.log("update-profile response", response.data);
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/services`
    );
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};  

export const createCustomerAccount = async body => {
  try {
    const response = await axios.post("/api/auth/create-customer-account", body);
    console.log("create-customer-account response", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const checkPostcode = async postcode => {
  try {
    const response = await axios.post("/api/postcode-check", { postcode });
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const createBooking = async body => {
  try {
    const response = await axios.post("/api/create-booking", body);
    console.log("create-booking response", response.data);
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post("/api/auth/forgot-password", { email });
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const resetPassword = async body => {
  try {
    const response = await axios.post("/api/auth/reset-password", body);
    console.log("reset-password response", response.data);
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};

export const quoteRequest = async body => {
  try {
    const response = await axios.post("/api/quote-request", body);
    return response.data;
  } catch (e) {
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};


export const getBookings = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/v1/customer/bookings`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    console.log("get-bookings response", response.data);
    return response.data;
   
  } catch (e) {
    console.error("Error in getBookings:", e);
    return {
      status: false,
      code: 200,
      data: {},
      message: e.message
    };
  }
};  