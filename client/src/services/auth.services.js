import api from "../api/api";


export const SignupService = async(formData) => {
    const res = await api.post("/auth/signup", formData);

    return res.data;
};

export const LoginService = async(formData) => {
    const res = await api.post("/auth/login", formData);
    return res.data;
};