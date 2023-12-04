const { default: axios } = require("axios");

const Api = axios.create({
    baseURL :process.env.NEXT_PUBLIC_API_SERVER+"/api",
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
      },
})


export default Api