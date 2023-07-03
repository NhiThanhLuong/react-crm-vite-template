/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { LOGIN_PATH } from '@/data/constant'
import { getLocalStorage } from '@/utils'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Add "lang: currentLang" to API's params method get
    if (config.method === 'get') {
      config.params = config.params
        ? {
            ...(config.params as object),
            lang: getLocalStorage('lang'),
          }
        : undefined
    } else {
      // Add "lang: currentLang" to API's data method PUT,PATCH,POST
      config.data = {
        ...(config.data as object),
        lang: getLocalStorage('lang'),
      }
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 401) {
      // clear token ...
      localStorage.removeItem('token')
      window.location.replace(LOGIN_PATH)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
