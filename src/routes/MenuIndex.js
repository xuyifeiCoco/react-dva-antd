import React from 'react';
import { routerRedux } from 'dva/router'
import { connect } from 'dva';
import styles from './MenuIndex.less';
import { Button, Carousel, Grid, WhiteSpace, List} from 'antd-mobile';

function MenuIndex({menuIndex, dispatch }) {
  const Item = List.Item;
  const Brief = Item.Brief;
  const setImgHeight = () => {
    dispatch({
      type: 'setImgHeight',
    })
  }
  const pickProject = (el, index) => {
    const typeData = index === 0 ? 'heart' : index === 2 ? 'manyperson' : 'month'

    if (index === 3) {
      dispatch({
        type: 'menuIndex/toCreatePage',
      })
    } else if(index===2){
      dispatch(routerRedux.push({
        pathname: '/add-service',
      })
    )
    } else {
      dispatch({
        type: 'menuIndex/toServicePage',
        payload: {
          type: typeData,
        },
      })
    }
  }
  const pickSource = (el, index) => {
    if (index === 0) {
      dispatch({
        type: 'menuIndex/toHospitalList',
      })
    } else {
      window.location.href='https://shop2343602.wd.1000.com/'
    }
  }
  const pickAds = (el, index) => {
    window.location.href = menuIndex.transferData[index].staticUrl
  }
  const pickGolden = () => {
    dispatch({
      type: 'menuIndex/toGoldenCare',
    })
  }
  return (
    <div className={styles.normal}>
      <Carousel
        autoplay
        infinite
        selectedIndex={0}
      >
        {menuIndex.carouselData.map(val => (
          <a
            key={val.staticLocation}
            href={val.staticUrl}
            dotstyle={ {background: 'red'}}
            style={{ display: 'inline-block', width: '100%', height: menuIndex.imgHeight }}
          >
            <img
              src={val.staticPig}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                setImgHeight()
              }}
            />
          </a>
        ))}
      </Carousel>
      <Grid className="iconLine" data={menuIndex.gridData} hasLine={false} onClick={pickProject} />
      <div className="gridContainer">
        <Grid className="moduleLine" data={menuIndex.marketingData} columnNum="2" hasLine={false} onClick={pickSource} />
        <Grid className="moduleLine" data={menuIndex.transferData} columnNum="2" hasLine={false} onClick={pickAds} />
      </div>
      <List className="my-menulist">
        <Item multipleLine align="middle" thumb={require('../assets/golden.png')} onClick={pickGolden} >
          金牌护理员 <Brief>专业、放心、用心呵护您的健康</Brief>
        </Item>
      </List>
    </div>
  );
}

export default connect(({ menuIndex, loading }) => ({ menuIndex, loading }))(MenuIndex);

