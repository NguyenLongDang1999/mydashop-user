// ** VeeValidate Imports
import { object, ref, string } from 'yup'

export const label = {
    name: 'Họ và tên',
    phone: 'Số điện thoại',
    email: 'Email',
    password: 'Mật khẩu',
    confirm_password: 'Xác nhận mật khẩu'
}

export const schema = object({
    name: string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    email: string()
        .required(`${label.email} không được bỏ trống.`)
        .email(`${label.email} không đúng định dạng.`),
    phone: string(),
    password: string()
        .required(`${label.password} không được bỏ trống.`)
        .min(6, `${label.password} có độ dài từ 6 - 20 ký tự.`)
        .max(20, `${label.password} có độ dài từ 6 - 20 ký tự.`),
    confirm_password: string()
        .oneOf(
            [
                ref('password'), undefined
            ],
            `${label.confirm_password} không trùng khớp.`
        )
})
