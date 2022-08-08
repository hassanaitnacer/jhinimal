// axios
import axios from 'axios';

// ----------------------------------------------------------------------

export default ({ baseUrl }) =>
  async ({ endpoint, ...config }) => {
    try {
      const result = await axios(baseUrl + endpoint, {
        params: {
          key: process.env.REACT_APP_IMGBB_API_KEY,
        },
        ...config,
      });

      return {
        data: {
          status: result.status,
          data: result.data,
          meta: {
            method: result.config.method,
          },
        },
      };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
          meta: {
            method: err.config.method,
          },
        },
      };
    }
  };
