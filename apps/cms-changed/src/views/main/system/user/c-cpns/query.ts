import { defineQuery, useQuery } from '@pinia/colada'
import { ref, computed, watch } from 'vue'
import { postUserListData, postPageListData } from '@/service/main/system/system'
import { getGoodsCategorySale } from '@/service/main/analysis/analysis'

interface IPageParams {
  offset: number
  size: number
  [key: string]: any
}

interface IPaginationInfo {
  currentPage: number
  pageSize: number
}

// 定义请求函数的类型
type RequestFunction = (url: string, params: IPageParams) => Promise<any>

// 创建一个工厂函数来生成查询
export const createPageListQuery = (requestFn: RequestFunction) => {
  return defineQuery(() => {
    const pageName = ref('')
    const apiUrl = ref('')
    const currentPage = ref(1)
    const pageSize = ref(10)
    const params = ref<IPageParams>({
      offset: 0,
      size: 10
    })

    const currentList = ref<any[]>([])
    const currentTotalCount = ref(0)

    const query = useQuery({
      key: () => [pageName.value, params.value],
      query: async () => {
        const res = await requestFn(apiUrl.value, params.value)
        return res.data
      },
      refetchOnWindowFocus: false
    })

    watch(
      () => query.data.value,
      (newData) => {
        if (newData) {
          currentList.value = newData.list
          currentTotalCount.value = newData.totalCount
        }
      }
    )

    const list = computed(() => currentList.value)
    const totalCount = computed(() => currentTotalCount.value)

    // 设置页面名称
    const setPageName = (name: string, url: string) => {
      pageName.value = name
      apiUrl.value = url
    }

    // 更新分页参数
    const updatePagination = ({ currentPage: page, pageSize: size }: IPaginationInfo) => {
      currentPage.value = page
      pageSize.value = size
      params.value = {
        ...params.value,
        offset: (page - 1) * size,
        size
      }
      query.refresh()
    }

    // 更新查询参数
    const updateSearchParams = (searchParams: Record<string, any> = {}) => {
      params.value = {
        ...params.value,
        ...searchParams
      }
      query.refresh()
    }

    // 重置所有参数
    const reset = () => {
      currentPage.value = 1
      pageSize.value = 10
      params.value = {
        offset: 0,
        size: 10
      }
      query.refresh()
    }

    return {
      currentPage,
      pageSize,
      list,
      totalCount,
      loading: computed(() => query.asyncStatus.value === 'loading'),
      error: computed(() => query.error.value),
      setPageName,
      updatePagination,
      updateSearchParams,
      reset,
      refresh: query.refresh
    }
  })
}

// 同样的处理方式用于分类查询
type CategoryRequestFunction = () => Promise<any>

export const createCategoryQuery = (requestFn: CategoryRequestFunction) => {
  return defineQuery(() => {
    const query = useQuery({
      key: () => ['get-category'],
      query: async () => {
        const res = await requestFn()
        return res.data
      },
      refetchOnMount: false
    })
    
    return {
      list: computed(() => query.data.value ?? [])
    }
  })
}
