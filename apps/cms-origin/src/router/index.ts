import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射表 path => component
  routes: [
    {
      path: '/',
      redirect: '/main' // 后续通过路由守卫，若未登录则跳转login
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue')
    },
    {
      // 页面不存在
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数：to（跳转的位置）form（从哪里跳转过来）返回值：决定导航的路径，不返回或者返回undefined，默认跳转
// / ==> /main to: /login; form: /; 返回值：
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    // 登录成功（token）才能进入main页面
    return '/login'
  }

  if (to.path == '/main') {
    return firstMenu?.url
  }
})

export default router
