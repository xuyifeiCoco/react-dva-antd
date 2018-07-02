import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import Home from './routes/Home.js'
import Login from './routes/Login.js'
import CreateOrder from './routes/CreateOrder.js'
import CreateOrderSucceed from './routes/CreateOrderSucceed.js'
import OrderDetail from './routes/OrderDetail.js'
import OrderList from './routes/OrderList.js'
import PersonalCenter from './routes/PersonalCenter.js'
import MenuIndex from './routes/MenuIndex.js'
import ServiceProcess from './routes/ServiceProcess.js'
import HospitalList from './routes/HospitalList.js'
import AttendantDetail from './routes/AttendantDetail'
import WaitingOrderDetail from './routes/WaitingOrderDetail'
import Agreement from './routes/Agreement'
import AddService from './routes/AddService'

export default function ({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MenuIndex} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/create-order/:orderId/:serviceType" component={CreateOrder} />
        <Route exact path="/create-order-succeed/:phoneNo/:orderId" component={CreateOrderSucceed} />
        <Route exact path="/order-detail/:orderId" component={OrderDetail} />
        <Route exact path="/waiting-order-detail/:orderId" component={WaitingOrderDetail} />
        <Route exact path="/order-list" component={OrderList} />
        <Route exact path="/personal-center" component={PersonalCenter} />
        <Route exact path="/menu-index" component={MenuIndex} />
        <Route exact path="/service-process" component={ServiceProcess} />
        <Route exact path="/hospital-list" component={HospitalList} />
        <Route exact path="/attendant-detail" component={AttendantDetail} />
        <Route exact path="/agreement" component={Agreement} />
        <Route exact path="/add-service" component={AddService} />
      </Switch>
    </Router>
  );
}
