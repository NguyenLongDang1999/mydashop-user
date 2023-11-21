// ** VeeValidate Imports
import { object, string } from 'yup'

export const label = {
    email: 'Email',
    password: 'Mật khẩu'
}

export const schema = object({
    email: string()
        .required(`${label.email} không được bỏ trống.`)
        .email(`${label.email} không đúng định dạng.`),
    password: string()
        .required(`${label.password} không được bỏ trống.`)
        .min(6, `${label.password} có độ dài từ 6 - 20 ký tự.`)
        .max(20, `${label.password} có độ dài từ 6 - 20 ký tự.`)
})
