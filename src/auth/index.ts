export interface SessionUser {
  id: string
}

export interface Credentials {
  email: string,
  password: string
}

export interface googleCredentials {
  email: string,
  name: string
  googleID: string
}

export interface SignUpInfo {
  name: string,
  email: string,
  password: string
}

export interface User {
  id: string
  name: string
  email?: string
}

export interface Authenticated {
  name: string
}

export interface GoogleAuthenticated {
  email: string
  name: string
  id: string
}