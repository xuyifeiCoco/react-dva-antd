import Mock from 'mockjs'

const listData = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 1,
      name: '@cname()' + '医院'
    }
  ]
})

const hospitalList = listData.data

module.exports = hospitalList
