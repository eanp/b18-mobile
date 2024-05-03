import axios from "axios";

const base_url = "https://recipe-one-kappa.vercel.app";

export const authLogin = (data) => async (dispatch, getState) => {
    try {
        dispatch({ type: "POST_AUTH_PENDING" });
        const res = await axios.post(base_url + "/auth/login",data, {
			headers: {
				"Content-Type" : "application/x-www-form-urlencoded"
			}
		});
		console.log("data")
		console.log(data)
		console.log("res")
		console.log(res)
        dispatch({ type: "POST_AUTH_SUCCESS", payload: res.data });
    } catch (err) {
		console.log("err")
		console.log(err)
        console.log(err?.message ? err.message : err);
        dispatch({ type: "POST_AUTH_ERROR",payload: err?.response?.data?.messages ?? "login error"  });
    }
};

export const authLogout = () => async (dispatch,getState) => {
	dispatch({type: "AUTH_LOGOUT"})
}