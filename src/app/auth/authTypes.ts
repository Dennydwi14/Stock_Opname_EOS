export interface LoginAuthBodyDTO {
  email: string
  password: string
}

export interface LoginAuthResponse {
  access_token: string
}