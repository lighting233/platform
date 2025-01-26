import useLoginStore from '@/store/login/login'

function getPermission(pageName: any) {
  // 0.获取是否有对应的增删改查的权限
  const loginStore = useLoginStore()
  // const { btnPermissions } = storeToRefs(loginStore) // ref对象不能用find方法
  const { btnPermissions } = loginStore
  // 不能用函数体 {} 写法（没有花括号）⭐
  // !取反转为布尔值
  const isCreate = !!btnPermissions.find((item) => item.includes(`${pageName}:create`))
  const isDelete = !!btnPermissions.find((item) => item.includes(`${pageName}:delete`))
  const isUpdate = !!btnPermissions.find((item) => item.includes(`${pageName}:update`))
  const isQuery = !!btnPermissions.find((item) => item.includes(`${pageName}:query`))

  return {
    isCreate,
    isDelete,
    isUpdate,
    isQuery
  }
}

export default getPermission
