import axios from 'axios'
import QS from 'qs'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://www.baidu.com'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://www.production.com'
}
