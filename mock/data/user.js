import Mock from 'mockjs'

const LoginUsers = [
  {
    avatar: 'http://k2.jsqq.net/uploads/allimg/1704/7_170418145254_4.jpg',
    phone: '13526731887',
    token: '0cbde825-fc2a-472c-a02b-8e544e97abdc',
    userId: 4
  }
]

const Users = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

module.exports = { LoginUsers, Users }
