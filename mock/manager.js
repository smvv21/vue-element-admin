const demoData = {
  total: 99,
  list: [{
    nickname: '王小虎',
    email: 'xxx@qq.com  ',
    roles: ['admin']
  }, {
    nickname: '王小虎',
    email: 'xxx@qq.com  ',
    roles: ['edit']
  }]
}

export default [
  {
    url: '/manager/list',
    type: 'get',
    response: config => {
      return {
        code: '0000',
        data: demoData
      }
    }
  }
]
