import React from 'react';
import { connect } from 'dva';
import styles from './CreateOrder.less';
import { DatePicker, Picker, List, Toast, WingBlank, WhiteSpace, InputItem, TextareaItem, Button, Modal } from 'antd-mobile';
import { showFormError, validators, getDictItemName } from '../utils';
import { createForm } from 'rc-form';

function CreateOrder({ createOrder, dispatch, form , location }) {
  let hos='002'
  let { pathname } = location;
  let innerOrOuter=pathname.split('/').pop()
  if (innerOrOuter==4){
    hos='001'
  }
  const alert = Modal.alert;
  const { getFieldProps, getFieldError, getFieldsValue } = form
  const submitRersevation = () => {
    form.validateFields({ force: true }, (errors) => {
      if (errors) {
        showFormError(errors)
        return
      }
      if (createOrder.initHospital.length === 0) {
        Toast.info('请选择医院', 1);
        dispatch({
          type: 'createOrder/setBtnActive',
          payload: {
            btnActive: false,
          },
        })
        return;
      }
      const alertInstance = alert('提示', '确定提交吗？', [
        { text: '取消', onPress: () => {} },
        { text: '确定', 
          onPress: () => {
            if (createOrder.showSubmitLoading) {
              return;
            }
            dispatch({
              type: 'createOrder/sumbit',
              payload: {
                patientName: getFieldsValue().patientName,
                sex: getFieldsValue().sex[0],
                phone: getFieldsValue().phone.replace(/\s/g, ''),
                contact: getFieldsValue().contact !== undefined ? getFieldsValue().contact : '',
                hospital: createOrder.initHospital[0],
                serviceType: createOrder.initServiceType ? createOrder.initServiceType[0] : '',
                serviceTypeName: getDictItemName((createOrder.serviceType), createOrder.initServiceType[0]),
                buildingNumber: getFieldsValue().section !== undefined ? getFieldsValue().section[0] : '',
                floor: getFieldsValue().section !== undefined ? getFieldsValue().section[1] : '',
                department: getFieldsValue().section !== undefined ? getFieldsValue().section[2] : '',
                bedNumber: getFieldsValue().bedNumber !== undefined ? getFieldsValue().bedNumber : '',
                patientRemark: getFieldsValue().patientRemark !== undefined ? getFieldsValue().patientRemark : '',
                patientAddress: getFieldsValue().detailPlace !== undefined ? getFieldsValue().detailPlace : '',
                beginTime: createOrder.startTime.format('yyyy-MM-dd HH:mm:ss'),
              },
            })
        } },
      ]);
    })
  }
  const setTripleSelect = (e) => {
    const hospitalId = e[0]
    if (hospitalId) {
      dispatch({
        type: 'createOrder/setTripleSelect',
        payload: {
          id: hospitalId,
          data: createOrder.hosData,
        },
      })
    }
  }
  const reviseServiceScen = (e) => {
    const serviceValue = e[0]
    if (serviceValue) {
      dispatch({
        type: 'createOrder/reviseServiceScene',
        payload: {
          data: serviceValue,
        },
      })
    }
  }
  const setStartTime = (e) => {
    dispatch({
      type: 'createOrder/setStartTime',
      payload: {
        startTime: new Date(e),
      },
    })
  }
  const setDefaultService = (e) => {
    const defaultType = e
    dispatch({
      type: 'createOrder/setDefaultServiceType',
      payload: {
        serviceType: defaultType,
      },
    })
  }
  return (<div>
    <form className={styles.normal}>
      <List className="createOrder" renderHeader={() => '患者信息'}>
        <InputItem
          {...getFieldProps('patientName', {
            rules: [
                { required: true, message: '请输入姓名' },
            ],
          })}
          clear
          error={!!getFieldError('name')}
          onErrorClick={() => {
            Toast.info(getFieldError('name').join('、'), 2)
          }}
          placeholder="请输入姓名"
        ><span>*</span>姓名</InputItem>
        <Picker
          data={createOrder.sexData}
          cols={createOrder.cols}
          title="选择性别"
          extra="请选择性别"
          {...getFieldProps('sex', {
            rules: [
              { required: true, message: '请选择性别' },
            ],
          })}
        >
          <List.Item arrow="horizontal"><span>*</span>性别</List.Item>
        </Picker>
        <InputItem
          {...getFieldProps('phone', {
            validate: [{
              trigger: 'onBlur',
              rules: [
                { required: true, message: '请输入手机号' },
                { validator: validators.phone, message: '请输入正确的手机号码' },
              ],
            }],
          })}
          clear
          type="digit"
          placeholder="请输入手机号"
          error={!!getFieldError('phone')}
          onErrorClick={() => {
            Toast.info(getFieldError('phone').join('、'), 2)
          }}
        ><span>*</span>联系电话</InputItem>
        <InputItem
          {...getFieldProps('contact')}
          clear
          placeholder="请输入家属姓名"
        >联系人</InputItem>
      </List>
      <List className="createOrder" renderHeader={() => '服务信息'}>
        <Picker
          extra="请选择服务地点"
          data={createOrder.serviceScene}
          cols={createOrder.cols}
          title="请选择服务地点"
          {...getFieldProps('servicePlace', {
            initialValue: [hos],
            rules: [
              { required: true, message: '请选择服务地点' },
            ],
          })}
          onOk={e => reviseServiceScen(e)}
          onDismiss={e => console.log('dismiss', e)}
        >
          <List.Item arrow="horizontal"><span>*</span>服务场景</List.Item>
        </Picker>
        { !createOrder.showParam && <InputItem
          {...getFieldProps('detailPlace', {
            rules: [
              { required: true, message: '请输入上门地址' },
            ],
          })}
          placeholder="请输入地址(具体到门牌号)"
        ><span>*</span>上门地址</InputItem>}
        <Picker
          extra="请选择医院"
          data={createOrder.hosData}
          cols={createOrder.cols}
          title="请选择医院"
          value={createOrder.initHospital}
          onChange={e => setTripleSelect(e)}
          onOk={e => setTripleSelect(e)}
          onDismiss={e => console.log('dismiss', e)}
        >
          <List.Item arrow="horizontal"><span>*</span>服务医院</List.Item>
        </Picker>
        { createOrder.showParam && <Picker
          extra="请选择科室"
          data={createOrder.tripleSelectData}
          title="请选择科室"
          format={(labels) => { return labels.join('-') }}
          {...getFieldProps('section')}
        >
          <List.Item arrow="horizontal">科室</List.Item>
        </Picker>}
        { createOrder.showParam && <InputItem
          {...getFieldProps('bedNumber')}
          type="number"
          clear
          placeholder="请输入病床号"
        >床号</InputItem>}
        <Picker
          extra="请选择服务类型"
          data={createOrder.serviceType}
          cols={createOrder.cols}
          title="请选择服务类型"
          value={createOrder.initServiceType}
          onChange={e => setDefaultService(e)}
          onOk={e => setDefaultService(e)}
        >
          <List.Item arrow="horizontal"><span>*</span>服务类型</List.Item>
        </Picker>
        <DatePicker
          mode="datetime"
          minuteStep={30}
          value={createOrder.startTime}
          onChange={e => setStartTime(e)}
        >
          <List.Item arrow="horizontal">预约服务时间</List.Item>
        </DatePicker>
      </List>
      <List className="createOrderRemark" renderHeader={() => '备注'}>
        <TextareaItem
          {...getFieldProps('patientRemark')}
          placeholder="如患者病情，特殊要求等"
          rows={5}
          count={50}
        />
      </List>
      <WhiteSpace size="lg" />
      <WingBlank size="md"><Button className={styles.submitBtn} disabled={createOrder.showSubmitLoading} type="primary" onClick={submitRersevation} >提交</Button></WingBlank>
    </form>
    <WhiteSpace size="lg" />
  </div>
  );
}
const createOrderWrapper = createForm()(CreateOrder);
export default connect(({ createOrder, loading }) => ({ createOrder, loading }))(createOrderWrapper);

