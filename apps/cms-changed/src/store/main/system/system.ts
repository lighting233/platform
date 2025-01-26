import { postUserListData, deleteUser, createUser, editUser } from '@/service/main/system/system'
import { postPageListData, deletePage, createPage, editPage } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import getPermission from '@/hooks/usePermissions'

interface IsystemState {
  userList: any[]
  userTotalCount: number

  pageList: any[]
  pageTotalCount: number
}
const useSystemStore = defineStore('useSystemStore', {
  // 放置userList类型为never[]
  state: (): IsystemState => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 用户管理（单独搭建的）
    async postUserListAction(queryInfo: any) {
      // 网络请求是异步请求
      const userListResult = await postUserListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserAction(id: number) {
      // 1.删除数据
      // const deleteResult =
      await deleteUser(id)
      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    // 新建用户
    async createUserAction(userInfo: any) {
      // const createUserResult =
      await createUser(userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    // 编辑用户
    async editUserAction(id: number, userInfo: any) {
      // const editUserResult =
      await editUser(id, userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    },

    // 所有页面 逻辑抽取封装
    /* 针对页面的数据：增删改查 */

    async postPageListAction(pageName: string, queryInfo: any) {
      // 0.获取是否有对应的增删改查的权限
      const { isQuery } = getPermission(pageName)
      if (!isQuery) return
      // 网络请求是异步请求
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async deletePageAction(pageName: string, id: number) {
      // 1.删除数据
      // const deleteResult =
      await deletePage(pageName, id)
      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 新建用户
    async createPageAction(pageName: string, userInfo: any) {
      // const createUserResult =
      await createPage(pageName, userInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 编辑用户
    async editPageAction(pageName: string, id: number, userInfo: any) {
      // const editUserResult =
      await editPage(pageName, id, userInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useSystemStore
