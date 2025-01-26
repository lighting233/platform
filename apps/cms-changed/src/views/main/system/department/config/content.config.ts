const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: 'selection', width: '55px' },
    { type: 'index', label: '序号', width: '66px' },
    { type: 'normal', label: '部门名称', prop: 'name', width: '150px' },
    // { type: 'normal', label: '部门领导', prop: 'leader', width: '150px' },
    // { type: 'normal', label: '上级部门', prop: 'parentId', width: '150px' },
    { type: 'custom', label: '部门领导', prop: 'leader', width: '150px', slotName: 'leader' },
    { type: 'custom', label: '上级部门', prop: 'parentId', width: '150px', slotName: 'parent' },
    { type: 'time', label: '创建时间', prop: 'createAt' },
    { type: 'time', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ],
  pageListUrl: '/list',
  rowKey: 'id',
  searchDefaultValues: {
    name: '初始值'
  }
}
export default contentConfig
