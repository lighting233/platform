import { getEntireDepartments, getEntireRoles, getEntireMenus } from '@/service/main/mian'
import { defineStore } from 'pinia'

interface ImainState {
  entireDepartments: any[]
  entireRoles: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): ImainState => ({
    entireDepartments: [],
    entireRoles: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const entireDepartmentsResult = await getEntireDepartments()
      this.entireDepartments = entireDepartmentsResult.data.list
      const entireRolesResult = await getEntireRoles()
      this.entireRoles = entireRolesResult.data.list
      const entireRolesMenusResult = await getEntireMenus()
      this.entireMenus = entireRolesMenusResult.data.list
    }
  }
})

export default useMainStore
