import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:3000/"
})
// Axios.interceptors.request.use(request=>{
//     let token = JSON.parse(localStorage.getItem("token"));
//     if(token){
//         request.headers.Authorization = 'Bearer '+ token
//     }
//     return request
// })
export default Axios