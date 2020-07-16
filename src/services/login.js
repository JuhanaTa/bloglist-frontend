import axios from 'axios'

const url = '/api/login'

const login = async userInfo => {
  const response = await axios.post(url, userInfo)
  return response.data
}

export default { login }