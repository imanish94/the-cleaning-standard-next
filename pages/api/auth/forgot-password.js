import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        status: false,
        message: 'Email is required' 
      });
    }

    const response = await axios.post(
      `${process.env.API_URL}/customer/forgot-password`,
      { email }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(error.response?.status || 500).json({
      status: false,
      message: error.response?.data?.message || 'Something went wrong'
    });
  }
} 