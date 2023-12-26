export interface IOptions {
    id: number
    label: string
}

export interface ICrudTableOptions<T> {
    dataTable: T[]
    isFetching: boolean
    dataAggregations: number
}

export interface IAggregations {
    aggregations: number
}

export interface IWebsiteSetup {
    slug: string
    value: string
}
