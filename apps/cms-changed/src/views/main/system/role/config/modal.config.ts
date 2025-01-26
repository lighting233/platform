const modalConfig = {
  pageName: 'role',
  header: {
    createTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
      initialValue: '摸鱼人'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    // 作用域插槽，自定义，无渲染组件
    {
      type: 'custom',
      slotName: 'menuList'
    }
  ]
}

export default modalConfig
