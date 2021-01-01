import axios from "axios";

const API_URL = "https://gersgarage-api.herokuapp.com/user/";
const USER = JSON.parse(localStorage.getItem("user"));

class AuthService {
     login(email, password) {
          return axios
               .post(API_URL + "signin", {
                    email,
                    password,
               })
               .then((response) => {
                    if (response.data.accessToken) {
                         localStorage.setItem("user", JSON.stringify(response.data));
                    }

                    return response.data;
               });
     }

     logout() {
          axios.post(API_URL + "signout/" + USER.id);
          localStorage.removeItem("user");
     }

     register(name, email, phone, password, user_type) {
          return axios.post(API_URL + "signup", {
               name,
               email,
               phone,
               password,
               user_type,
          });
     }

     getCurrentUser() {
          return JSON.parse(localStorage.getItem("user"));
     }
}

export default new AuthService();
