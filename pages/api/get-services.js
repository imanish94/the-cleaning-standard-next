
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await axios.get(`${process.env.API_URL}/services`);
      console.log("response - server", response);
      res.status(response.status).json(response.data);
      res.end();
    } catch (err) {
      if (err.response) {
        res.status(err.response.status).json(err.response);
        res.end();
      }
    }
  } else {
    res.status(405);
    res.end();
  }
}
