import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isSessionValid } from "@/utils/helpers";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!isSessionValid(session)) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const {
        user: { token }
      } = session;

      console.log("Making request to backend with token:", token);
      console.log("Backend URL:", `${process.env.API_URL}/customer/bookings`);

      const response = await axios.get(
        `${process.env.API_URL}/customer/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Backend response:", response.data);

      // Return the entire response data structure
      return res.status(200).json(response.data?.data);

    } catch (err) {
      console.error("Error in get-bookings API:", err?.message);
      console.error("Error details:", err?.response?.data);
      console.error("Error status:", err?.response?.status);
      console.error("Error config:", err?.config);

      return res.status(err.response?.status || 500).json({
        success: false,
        status: err.response?.status || 500,
        message: err.response?.data?.message || "Something went wrong",
        data: {
          data: []
        }
      });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
