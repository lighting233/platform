<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handlCreateClick" v-if="isCreate">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <!-- children: 'xxxx'指定绑定的表格数据中哪个字段包含子级（不可以随便加 type属性，会影响table树类型的数据的显示） -->
      <!-- :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" -->
      <el-table :data="isQuery ? pageList : []" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'time'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button text type="primary" icon="Edit" size="small" @click="editclick(scope.row)" v-if="isUpdate"
                  >编辑</el-button
                >
                <el-button
                  text
                  type="danger"
                  icon="Delete"
                  size="small"
                  @click="deleteClick(scope.row.id)"
                  v-if="isDelete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'custom'">
            <!-- v-bind用于绑定所有scope中属性 -->
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <!-- 向父组件传递两个props：scope，item.prop，父组件将会使用v-slot绑定一个对象变量接收所有的props -->
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="isQuery ? pageTotalCount : 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import getPermission from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: {}
  }
}
const props = defineProps<IProps>()

// 0.获取是否有对应的增删改查的权限
const { isCreate, isDelete, isQuery, isUpdate } = getPermission(props.contentConfig.pageName)

// 1.发起action，请求userList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 监听store中action，但发生编辑、删除、新增时，使页码变为1
// 将name解构出来
systemStore.$onAction(({ name, after }) => {
  // 在 action 返回或解决后的钩子
  after(() => {
    if (name == 'deletePageAction' || name == 'editPageAction' || name == 'createPageAction') {
      currentPage.value = 1
    }
  })
})

// 2.获取userList数据进行展示
// 由于网络请求异步，需要响应式的获取数据：1.computed；2.storeToRefs

const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.分页器
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数，发送网络请求
function fetchPageListData(searchForm: any = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = {
    size,
    offset
  }
  const queryInfo = { ...pageInfo, ...searchForm }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

defineExpose({ fetchPageListData })
const emits = defineEmits(['createClick', 'editClick'])

function handlCreateClick() {
  emits('createClick')
}

function editclick(itemData: any) {
  emits('editClick', itemData)
}
function deleteClick(id: number) {
  systemStore.deletePageAction(props.contentConfig.pageName, id)
}
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
