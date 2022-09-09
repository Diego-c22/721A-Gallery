import axios from 'axios'

export const getNft = async (url) => (await axios.get(url)).data
