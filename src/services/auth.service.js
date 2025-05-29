import axios from "axios";
import Cookies from "js-cookie"; // ✅ ใช้ js-cookie

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/`;

const register = async (username, password, confirmPassword, role_name) => {
    return await axios.post(API_URL + "signup", {
        username,
        password,
        confirmPassword,
        role_name: [role_name]
    })
};

const login = async (username, password) => {
    return await axios.post(API_URL + "signin", { username, password, })
        .then((response) => {
            if (response.data.data.accessToken) {
                localStorage.setItem("token", JSON.stringify(response.data.data.accessToken));

                //ตั้ง cookie ให้ middleware อ่านได้
                Cookies.set("accessToken", response.data.data.accessToken);
            }
            return response.data.data.accessToken;
        });
};

const logout = async () => {
    localStorage.removeItem("token");
    Cookies.remove("accessToken");
    return await axios.post(API_URL + "signout").then((response) => {
        return response.data;
    });
};

const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            axios.defaults.headers.common["x-access-token"] = token; // ถ้ามี token ให้ส่งไปกับ header ทุก request
        }
        else {
            delete axios.defaults.headers.common["x-access-token"];// ถ้าไม่มี ให้ลบ header ออก
        }
        return token;
    }
    return null; //ถ้าไม่อยู่ในclient return null
};

const AuthService = {
    register,
    login,
    logout,
    getToken,
}
export default AuthService;