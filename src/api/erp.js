import axios from "axios";
import process from "process";

const serverERP = axios.create({
    baseUR: process.env.VUE_APP_PATH_API
})

console.log(process.env.VUE_APP_PATH_API)

export default serverERP