// ** VeeValidate Imports
import { object, string } from 'yup'

export const label = {
    rating: 'Rating',
    content: 'Nội dung'
}

export const schema = object({
    rating: string().required(`${label.rating} không được bỏ trống.`),
    content: string().required(`${label.content} không được bỏ trống.`)
})
