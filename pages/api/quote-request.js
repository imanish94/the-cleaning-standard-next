import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("quote-request req.body", req.body);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/quote-request`,
        req.body
      );

      console.log("quote-request response", response.data);

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
