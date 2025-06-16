import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isSessionValid } from "@/utils/helpers";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (!isSessionValid(session)) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const {
        user: { token }
      } = session;

      console.log("req.body", req.body);

      const response = await axios.post(
        `${process.env.API_URL}/customer/update-profile`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("response - server", response.data);

      return res.status(response.status).json(response.data);

    } catch (err) {
      console.error("Error:", err?.message);

      return res.status(err.response?.status || 500).json({
        success: false,
        status: err.response?.status || 500,
        message: err.response?.data?.message || "Something went wrong",
        data: err.response?.data || {}
      });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
