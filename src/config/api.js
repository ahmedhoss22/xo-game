const { default: axios } = require("axios");

const Api = axios.create({
    baseURL :process.env.NEXT_PUBLIC_API_SERVER+"/api",
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
      },
})

export const handleApiError = (error) => {
	if (Array.isArray(error.response?.data?.error)) {
		error.response.data.error.map((e) => toast.error(e.message));
	} else {
		const errorMes = error.response?.data?.error || error.response?.data?.message;
		toast.error(errorMes);
	}
	return error.response.data.error;
};

export default Api