import hyRequest from '@/service'

export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
export function deleteUser(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
export function createUser(userInfo: any) {
  return hyRequest.post({
    url: `/users`,
    data: userInfo
  })
}
export function editUser(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/* 针对页面的网络请求：增删改查 */

export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export function postPageList(pageName: string, url: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}${url}`,
    data: queryInfo
  })
}
export function deletePage(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function createPage(pageName: string, userInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: userInfo
  })
}
export function editPage(pageName: string, id: number, queryInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: queryInfo
  })
}
