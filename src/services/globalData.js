import { request, config } from '../utils'

const { api } = config
const { globalData } = api

let cityList = null
let dictList = null
let departmentList = null

export async function getCities() {
  if (!cityList) {
    return request({
      url: globalData.getCities,
      method: 'post',
    }).then((val) => {
      if (val.success) {
        cityList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: cityList,
  })
}

export async function getHospitalDepartmentList() {
  if (!departmentList) {
    return request({
      url: globalData.getHospitalDepartmentList,
      method: 'post',
    }).then((val) => {
      if (val.success) {
        departmentList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: departmentList,
  })
}

export async function getAllDict() {
  if (!dictList) {
    return request({
      url: globalData.getDictList,
      method: 'post',
    }).then((val) => {
      if (val.success) {
        dictList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: dictList,
  })
}

export async function getDict(type) {
  try {
    const ret = await getAllDict()
    if (ret.success) {
      return {
        success: true,
        data: _.find(ret.data, i => i.value === type)
      }
    }
    return {
      success: false,
      data: null,
    }
  } catch (ex) {
    return Promise.resolve({
      success: false,
      data: null,
    })
  }
}
