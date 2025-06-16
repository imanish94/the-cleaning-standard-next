import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405);
    res.end();
    return;
  }

  try {
    console.log("reset-password req.body", req.body);

    const response = await axios.post(
      `${process.env.API_URL}/customer/reset-password`,
      req.body
    );

    console.log("reset-password response", response.data);

    res.status(response.status).json(response.data);
    res.end();
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response);
      res.end();
    }
  }
} 