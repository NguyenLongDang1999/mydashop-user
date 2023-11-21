// ** VeeValidate Imports
import { object, string } from 'yup'

export const label = {
    fullname: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    content: 'Nội dung'
}

export const schema = object({
    fullname: string()
        .max(60, ({ max }) => `${label.fullname} không được vượt quá ${max} ký tự.`)
        .required(`${label.fullname} không được bỏ trống.`),
    email: string()
        .email(`${label.email} không đúng định dạng.`)
        .required(`${label.email} không được bỏ trống.`),
    phone: string().test('phone', `${label.phone} không đúng định dạng.`, v => {
        if (!v) { return true }

        return /^\+?\d{6,15}$/.test(v)
    }),
    content: string()
        .max(255, ({ max }) => `${label.content} không được vượt quá ${max} ký tự.`)
        .required(`${label.content} không được bỏ trống.`)
})
