import { setCookie } from "nookies";
import { api } from "./api";


interface IUserAccessProps {
    email: string;
    password: string;
}




const userApi = {
    login: async ({ email, password }: IUserAccessProps) => {
        const { data } = await api.post('/user/login', {
            email,
            password
        })

        setCookie(null, 'corelab.token', data.token, {
            maxAge: 30 * 24 * 60 * 60,  // 30 days
            path: '/',
        })

        return true
    },

    register: async ({ email, password }: IUserAccessProps) => {
        const { data } = await api.post('/user/register', {
            email,
            password
        })

        setCookie(null, 'corelab.token', data.token, {
            maxAge: 30 * 24 * 60 * 60,  // 30 days
            path: '/',
        })

        return true
    },
}



export default userApi;