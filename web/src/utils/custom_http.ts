import axios, {AxiosInstance} from "axios"

export const httpWithHeaders = (): AxiosInstance => {
    if (localStorage.getItem("token") === null) {
        throw new Error("No credentials specified")
    }
    return axios.create({
        baseURL: "http://localhost:8000/api",
        timeout: 1000,
        headers: {"Authorization": `Token ${localStorage.getItem("token")}`}
    })
};