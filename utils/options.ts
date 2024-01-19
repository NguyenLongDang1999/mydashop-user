// ** Types Imports
import type { IOptions } from '~/types/core.type'

export const sortOption: IOptions[] = [
    {
        id: 1,
        label: 'Mặc định'
    },
    {
        id: 2,
        label: 'Ngày cũ nhất'
    },
    {
        id: 3,
        label: 'Tên: A - Z'
    },
    {
        id: 4,
        label: 'Tên: Z - A'
    },
    {
        id: 5,
        label: 'Giá: Thấp - cao'
    },
    {
        id: 6,
        label: 'Giá: Cao - thấp'
    }
]

export const paginationOption: string[] = ['12', '24', '36', '48']

export const ratingList: IOptions[] = [
    {
        id: 1,
        label: '5 Sao'
    },
    {
        id: 2,
        label: '4 Sao'
    },
    {
        id: 3,
        label: '3 Sao'
    },
    {
        id: 4,
        label: '2 Sao'
    },
    {
        id: 5,
        label: '1 Sao'
    }
]
