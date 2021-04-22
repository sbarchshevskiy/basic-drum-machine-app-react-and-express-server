import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (username, email, password) => {
    return axios.post(API_URL + "register", {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "api/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.success) {
                response.data.data.accessToken = response.data.token;
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};