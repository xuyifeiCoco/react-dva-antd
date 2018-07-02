import Mock from 'mockjs'

const listData = Mock.mock({
  'data|80-100': [
    {
      'hospitalId|+1': 1,
      'hospitalDepict|+1': ['医院不错医院不错医院不错医院不错医院不错', '这个可以的'],
      'hospitalName|+1': ['天津市第五中心医院', '首都医院', '东小口医院'],
      hospitalPhone: '18322601625',
      hospitalPic: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3347431942,364442122&fm=173&app=12&f=JPEG?w=218&h=146&s=C8318F504A9169E72E8054C50300A0E1',
    },
  ],
})

const singleServiceList = listData.data

module.exports = singleServiceList
