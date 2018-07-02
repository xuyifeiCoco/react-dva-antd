import dva from 'dva'
import createLoading from 'dva-loading'
import './index.less'
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  onError(error) {
    console.log(error)
  },
})

// 2. Plugins
// app.use({})

// 3. Model
app.model(require('./models/home'))
app.model(require('./models/orderList'))
app.model(require('./models/orderDetail'))
app.model(require('./models/login'))
app.model(require('./models/createOrderSucceed'))
app.model(require('./models/createOrder'))
app.model(require('./models/personalCenter'))
app.model(require('./models/memuIndex'))
app.model(require('./models/serviceProcess'))
app.model(require('./models/hospitalList'))
app.model(require('./models/attendantDetail'))
app.model(require('./models/waitingOrderDetail'))
app.model(require('./models/addService'))


// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
