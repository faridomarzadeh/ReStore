import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(async (response) =>{
    await sleep();
    return response;
},(error:AxiosError) => {
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

        case 404:
            router.navigate('/not-found');
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error',{
                state: {
                    error: data
                }
            });
            break;
    }
    return Promise.reject(error.response);
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body:object) => axios.post(url,body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
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

const Basket = {
    get : () => requests.get('basket'),
    addItem: (productId: number, quantity =1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId: number, quantity=1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

export const agent = {
    Catalog,
    TestErrors,
    Basket
}