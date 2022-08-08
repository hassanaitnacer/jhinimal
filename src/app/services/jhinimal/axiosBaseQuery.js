// axios
import axios from 'axios';

// store
import { store } from '../../store';

// ----------------------------------------------------------------------

export default ({ baseUrl, prepareHeaders = null }) =>
  async ({ endpoint, ...config }) => {
    try {
      if (prepareHeaders) {
        const headers = prepareHeaders({}, { getState: store.getState });

        if (Object.keys(headers).length) {
          config.headers = headers;
        }
      }

      const result = await axios(baseUrl + endpoint, config);

      return {
        data: {
          status: result.status,
          data: result.data,
          meta: {
            totalItems: result.headers['x-total-count'] && parseInt(result.headers['x-total-count'], 10),
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
