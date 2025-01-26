import type { RouteRecordRaw } from 'vue-router'

// 加载本地路由封装
function loadLocalRoutes() {
  // 1.动态获取所有的路由对象，放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1.读取router/main所有的.ts文件
  // eager true 立即返回结果不异步 路径：函数 ==> 路径：模块
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', { eager: true })

  // 1.2.将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key] // 默认推导是unknow类型，unknown类型所有操作都是非法的
    localRoutes.push(module.default)
  }
  return localRoutes
}

// 导出第一个路由对象
export let firstMenu: any = null

// 映射工具函数
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path == submenu.url)
      if (route) {
        // 1.一级菜单添加重定向功能，但只需添加一次
        if (!routes.find((item) => item.path == menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 2.二级菜单对应路径
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径（当前路径）
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (path == subMenu.url) {
        return subMenu
      }
    }
  }
}

interface IBreadCrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadCrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (path == subMenu.url) {
        // 顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射id列表
 * 递归，调用函数，当函数不符合条件继续执行调用改函数，符合条件则执行想要的操作
 * 只设置最低级的id，因为若有子级会导致子级全选
 * @param menuList
 */
export function mapMenuToIds(menuList: any[]) {
  const ids: number[] = []
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}

/**
 * 菜单列表映射到按钮权限列表
 * @param menuList 菜单列表
 * @returns 权限列表
 */
export function mapMenusToBtnPermissions(menuList: any[]) {
  const permissions: Array<string> = []
  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type == 3) {
        permissions.push(item.permission)
      } else {
        // item.children为 null 或 undefined 会报错，[]则会跳出循环
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(menuList)
  return permissions
}
