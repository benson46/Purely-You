import axios from 'axios';
import { toast } from 'sonner';

const adminAxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api/admin',
  timeout: 5000,
});

export default adminAxiosInstance;

let isRefreshing = false;

adminAxiosInstance.interceptors.response.use(
  (response)=> response,
  async (error)=> {
    const originalRequest = error.config;
    
    if(error.status == 401 && !originalRequest._retry){
      console.log('access token expire trigger for admin');
        originalRequest._retry = true;

        if(!isRefreshing) {
          isRefreshing = true;
          try {
            await adminAxiosInstance.post('/auth/refresh')
            isRefreshing = false;

            return adminAxiosInstance(originalRequest);
          } catch (error) {
            isRefreshing = false;

            toast.info('please login again');
            localStorage.removeItem('adminSession');
            window.location.href = '/';
            return Promise.reject(error)
          }
        }
    }
  }
)