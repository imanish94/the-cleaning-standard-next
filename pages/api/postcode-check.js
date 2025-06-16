import axios from "axios";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { postcode } = req.body;

    if (!postcode) {
      return res.status(400).json({ error: 'Postcode is required' });
    }

    const response = await axios.post(
      `${process.env.API_URL}/postcodes/check`,
      { postcode }
    );

    res.status(response.status).json(response.data);
    res.end();
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response);
      res.end();
    }
  }
}
