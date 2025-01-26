import hyRequest from '..'
import type { IAccount } from '@/types/index'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoByID(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenusRoleById(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
