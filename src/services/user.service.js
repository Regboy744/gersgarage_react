import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://gersgarage-api.herokuapp.com/user/";
const API_ADDRESS_URL = "https://gersgarage-api.herokuapp.com/address/";
const API_VEHICLE_URL = "https://gersgarage-api.herokuapp.com/vehicles/";
const API_OS_URL = "https://gersgarage-api.herokuapp.com/servicesorder/";

const USER = JSON.parse(localStorage.getItem("user"));

class UserService {
     getPublicContent() {
          return axios.get(API_URL);
     }

     getAdminBoard() {
          return axios.get(API_URL + "admin", { headers: authHeader() });
     }

     getCustomerBoard() {
          return axios.get(API_URL + "customer", { headers: authHeader() });
     }

     patchUser(id, name, email, phone, password, user_type) {
          return axios.patch(API_URL + "update", {
               id,
               name,
               email,
               phone,
               password,
               user_type,
          });
     }

     registerVehicle(make, model, year, register, engine) {
          return axios.post(API_VEHICLE_URL + "register/" + USER.id + "/" + USER.accessToken, {
               make,
               model,
               year,
               register,
               engine,
          });
     }

     registerAddress(address_type, street, city, code, area) {
          return axios.post(API_ADDRESS_URL + "register/" + USER.id + "/" + USER.accessToken, {
               address_type,
               street,
               city,
               code,
               area,
          });
     }

     registerServiceOrders(v_id, status, service_type, issue_description, start_date) {
          return axios.post(API_OS_URL + "register/", {
               v_id,
               status,
               service_type,
               issue_description,
               start_date,
          });
     }

     patchAddress(address_type, street, city, code, area) {
          return axios.patch(API_ADDRESS_URL + "update/" + USER.id + "/" + USER.accessToken, {
               address_type,
               street,
               city,
               code,
               area,
          });
     }

     patchVehicles(vid, make, model, year, register, engine) {
          return axios.patch(API_VEHICLE_URL + "update/" + USER.id + "/" + USER.accessToken, {
               vid,
               make,
               model,
               year,
               register,
               engine,
          });
     }

     // GET THE USER BASIC INFO BY HIS ID -  THE TOKEN IS A SECURITY CHECK
     getUserBoard() {
          return axios.get(API_URL + USER.id + "/" + USER.accessToken);
     }

     // GET THE USER ADDRESS BY HIS ID - THE TOKEN IS A SECURITY CHECK
     getAddressBoard() {
          return axios.get(API_ADDRESS_URL + USER.id + "/" + USER.accessToken);
     }

     // GET THE USER ADDRESS BY HIS ID - THE TOKEN IS A SECURITY CHECK
     getVehicleBoard() {
          return axios.get(API_VEHICLE_URL + USER.id + "/" + USER.accessToken);
     }
}

export default new UserService();
