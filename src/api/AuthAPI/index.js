import ApiInstance from '@/api/index'

export const AuthAPI = {
  login(login, password){ 
     const url = '/auth/login';
     const loginRequest = {login, password}; 
     return ApiInstance.post(url, loginRequest);
  }, 
  register(registerRequest) {
    const url = '/auth/register';
    return ApiInstance.post(url, registerRequest); 
  },
  recovery(email) {
    const url = '/auth/recovery';
    return ApiInstance.post(url, email);
  }
}