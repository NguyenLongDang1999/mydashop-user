export interface IAuthLogin {
    email: string
    password: string
}

export interface IAuthRegister {
    name: string
    email: string
    phone: string
    password: string
    confirm_password: string
}

export interface IAuthProfile {
    id: number
    name: string
    email: string
    phone: string
    image_uri?: string
}

export interface IAuthUpdateProfileFormInput {
    name: string
    email: string
    phone: string
    address?: string
}
