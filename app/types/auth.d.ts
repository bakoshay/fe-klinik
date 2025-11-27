export interface AuthLoginForm {
  username: string;
  password: string;
}

export interface AuthData {
  name: string;
  username: string;
  token: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: AuthData;
}
