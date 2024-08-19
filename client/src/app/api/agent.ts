import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";


axios.defaults.baseURL = 'http://localhost:5000/api/';

axios.interceptors.response.use((response) =>{
    return response;
},(error) => {
    const {data, status} = error.response as AxiosResponse;
    switch(status)
    {
        case 400 :
            if(data.errors)
            {
                const modelStateErrors = [];
                for(const key in data.errors){
                    modelStateErrors.push(data.errors[key])
                }
                throw modelStateErrors.flat();
            }
             toast.error(data.title);
             break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
            break;
    }
    return Promise.reject(error.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body:{}) => axios.post(url,body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error :() => requests.get('buggy/bad-request'),
    get404Error: () =>requests.get('buggy/not-found'),
    get401Error :() => requests.get('buggy/authorized'),
    getValidationError :() => requests.get('buggy/validation-error'),
    get500Error :() => requests.get('buggy/server-error')
}

export const agent = {
    Catalog,
    TestErrors
}