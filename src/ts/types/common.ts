import { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import { ReactNode } from 'react'

export type BreadcrumbsType = {
  title: string
  url?: string
}

export type PageParams = {
  page?: number
  perPage?: number
}

export type DateRangeParams = {
  createdFrom?: string
  createdTo?: string
}

export type Status = {
  value: number
  label: string
  color: string
}

export type QueryOptions<T, TQueryData = unknown> = Omit<
  UseQueryOptions<TQueryData, unknown, T, QueryKey>,
  | 'queryKey'
  | 'refetchInterval'
  | 'refetchOnMount'
  | 'refetchOnReconnect'
  | 'refetchOnWindowFocus'
  | 'useErrorBoundary'
>

export type ImageData = Record<
  128 | 240 | 360 | 480 | 720 | 1080 | 'original' | 'thumbnail',
  {
    id: string
    size: number
  }
>

export type DescriptionsRecord = {
  isShow?: boolean
  isRequired?: boolean
  labelText: string
  descriptionElement: ReactNode
}

type NumericValues<T> = {
  [K in keyof T]: K extends string ? T[K] : never
}
export type NumberEnumUnion<T> = NumericValues<T>[keyof NumericValues<T>]

export type ListData<T> = {
  total: number
  data: T[]
}

// K is the union keyof T whose type is required,
// the remaining keys of T have the same type
export type RequiredKeys<T, K extends keyof T> = Required<
  Pick<T, Extract<keyof T, K>>
> &
  Omit<T, Extract<keyof T, K>>

export type ValueLabelType = {
  value: number
  label: string
}
