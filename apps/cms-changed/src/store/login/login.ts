import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoByID, getUserMenusRoleById } from '@/service/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'
import router from '@/router'
// 引入全局token常量
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToBtnPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'
interface ILoginState {
  token: string
  userInfo: any // 服务器返回数据太复杂
  userMenus: any
  btnPermissions: Array<string>
  // btnPermissions: any
}
const useLoginStore = defineStore('login', {
  // 如何指定state类型 ==> 指定返回值的类型 ILoginState
  state: (): ILoginState => ({
    // id: -1,
    // name: '',
    token: '',
    userInfo: {},
    userMenus: [],
    btnPermissions: []
  }),
  actions: {
    async accountLoginRequest(account: IAccount) {
      // 1.帐号登录获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      // const name = loginResult.data.name
      this.token = loginResult.data.token

      // 4.进行本地缓存(第二步需要携带token)
      localCache.setCache(LOGIN_TOKEN, this.token) // local or session 封装

      // 2.获取登录用户角色（用户ID获取角色ID）
      const userInfoResult = await getUserInfoByID(id) // 需携带token，在拦截器中添加
      const userInfo = userInfoResult.data // 保存用户信息
      // console.log(this.userInfo.role) // 空对象类型中不存在role属性 ==> 如何指定state类型
      this.userInfo = userInfo

      // 3.根据角色获取用户权限（角色ID获取菜单menus）
      const userMenusResult = await getUserMenusRoleById(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4.进行本地缓存
      // 刷新后pinia中没有数据是因为在pinia中所有store都是懒加载的，直接使用即可（使用后即会初始化）
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5.重要：获取登录用户的所有按钮权限
      const btnPermissions = mapMenusToBtnPermissions(userMenus)
      this.btnPermissions = btnPermissions
      // this.btnPermissions.find((item) => {})

      // 6.重要: 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 7.登录成功在跳转之前请求部门和角色数据(刷新后会丢失，在下面重新请求)
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 5.页面跳转（main页面）
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.重要：获取登录用户的所有按钮权限
        const btnPermissions = mapMenusToBtnPermissions(userMenus)
        this.btnPermissions = btnPermissions

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export default useLoginStore
