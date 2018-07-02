import { routerRedux } from 'dva/router'
import queryString from 'query-string'

const menu = ['heart', 'manyperson', 'month']
const beizhuStyle='font-size:28px;color:black;padding:0;';
const free = [
  {
    title: '收费标准',
    type:'full',
    src: 'assets/expense',
    // expenses:[
    //   '服务级别', '贴心护（一对一）', '多人护（多对多）',
    // ],
    // content: ' 1、收费标准根据医院、科室、病情级别、服务类型而定<br />2、目前护理费用大概为150～300元/天；',
  },
  {
    title: '服务流程',
    src: 'assets/serviceProcess',
    type: 'small',
  },
]
const prompt={
  content: `温馨提示：<br /> 1、提交预约单后，预约助理会在几分钟内联系您。<br />
            2、护工上岗前会先安排见面，您和家属满意后再上岗。<br />
            3、按要求填写《患者护理评估表》，以便我们更好地服务。`,
}
const returnTitle = (title) => {
  return document.title = title;
}
export default {
  namespace: 'serviceProcess',
  state: {
    heart: [
      {
        src: 'assets/heart',
        type: 'full',
      },
      {
        title: '服务介绍',
        content: `【贴心护】一位护理员陪护一位患者的服务模式。该服务模式优势是护理员全程了解服务需求，提供全天候无缝隙贴身专注服务。<br />
        【多人护】是指一定数量的护理员组成服务小组，倒班为所服务区域的患者提供生活护理的服务模式。`,
      },
      {
        title: '适用人群',
        content: '1、需要管道及其他专业护理，病情不稳定需要24小时陪护的患者（术前、术后）。<br /> 2、生活不能完全自理或者治疗期间需要严格卧床的患者。',
      },
      {
        title: '护理内容',
        type:'full',
        src: 'assets/SingleAndNumber',
      },
      ...free,
      {
        title: '服务地址（医院）',
        city:[
          {
            name:'忻州',
            content:`
                1、忻州市人民医院（山西省忻州市健康街12号）<br />
                2、忻州市中医医院（忻州市和平西街）`,
            beizhu:'备注：忻州市以上医院只提供院内护理服务',
          },
          {
            name:'大同',
            content:`大同市第五人民医院（山西省大同市御东文兴路北）`,
            beizhu:'备注：大同市以上医院只提供院内护理服务',
          },
          {
            name:'天津',
            content:`
                1、天津市胸科医院（天津市津南区台儿庄南路261号）<br />
                2、天津市安定医院（天津市河西区柳林路13号）<br />
                3、天津市第五中心医院（天津市滨海新区浙江路41号`,
            beizhu:'备注：天津市以上医院只提供院内护理服务',
          },
          {
            name:'沈阳',
            content:`
            1、中国医科大学附属第一医院（沈阳市和平区南京北街155号）<br/>
            2、沈阳军区总医院（沈阳市沈河区文化路83号）<br/>
            3、中国医科大学附属盛京医院-南湖区（沈阳市和平区三好街36号）<br/>
           4、辽宁省金秋医院（沈阳市沈河区小南街317号）<br/>
           5、中国医科大学附属盛京医院滑翔院区（沈阳市铁西区滑翔路39号）<br/>
           6、中国医科大学附属盛京医院沈北院区（辽宁省沈阳市沈北新区蒲河大道16号）<br/>
           7、辽宁省人民医院（沈阳市沈河区文艺路33号）`,
           'beizhu':'备注：沈阳市以上医院只提供院内护理服务',
            // src: 'assets/shenyang',
          },
          {
            name:'哈尔滨',
            content:` 
                1、哈尔滨市第一医院（哈尔滨市道里区地段街151号 ）<br/>
                2、中国人民解放军第二一一医院（哈尔滨市南岗区学府路45号）<br/>
                3、哈尔滨医科大学附属第一医院（哈尔滨南岗区邮政街23号）<br/>
                4、哈尔滨医科大学附属第一医院群力分院（哈尔滨市群力第七大道2075号） `,
            beizhu:'备注：哈尔滨市以上医院只提供院内护理服务',
          },
          {
            name:'长春',
            content:`
            吉林大学中日联谊医院（长春市仙台大街126号）`,
            beizhu:'备注：长春市以上医院只提供院内护理服务',
          },
          {
            name:'松原',
            content:`
            1、松原市中心医院（松原市宁江区文化路1188号）<br/>
            2、吉林油田总医院（松原市宁江区沿江西路960号）`,
            beizhu:'备注：松原市以上医院只提供院内护理服务',
          },
          {
            name:'四平',
            content:`
            吉林省脑科医院（四平市中央西路98号）`,
            beizhu:'备注：四平市以上医院只提供院内护理服务',
          },
          {
            name:'太原',
            content:`
            1、山西医科大学第二医院（山西省太原市五一路382号）<br/>
            2、山西省人民医院（太原市双塔寺街29号）`,
            beizhu:'备注：太原市以上医院只提供院内护理服务',
          },
          {
            name:'石家庄',
            content:`
            1、河北省中医院（石家庄市中山东路389号）<br/>
            2、河北省胸科医院（石家庄市长安区胜利北街372号）<br/>
            3、石家庄市第一医院（石家庄市长安区范西路36号）<br/>
            4、河北医科大学第四医院（河北省石家庄市健康路12号）`,
            beizhu:'备注：石家庄市以上医院只提供院内护理服务',
          },
          {
            name:'郑州',
            content:`
            郑州市骨科医院（郑州市陇海中路58号）`,
            beizhu:'备注：郑州市以上医院只提供院内护理服务',
          },
        ],
      },
      ...prompt,
    ],
    manyperson: [
      {
        src: 'assets/manyPerson',
        type: 'full',
      },
      {
        title: '服务介绍',
        content: '【多人护】是指一定数量的护理员组成服务小组，倒班为所服务区域的患者提供生活护理的服务模式。',
      },
      {
        title: '适用人群',
        content: `1、需要管道及其他专业护理，病情不稳定需要24小时陪护的患者（术前、术后）。<br />
         2、生活不能完全自理或者治疗期间需要严格卧床的患者 。<br />
         3、服务区域一般为ICU、CCU、普通病区。`,
      },
      {
        title: '服务内容',
        type:'full',
        src: 'assets/SingleAndNumber',
        // content: `1、晨间护理：患者晨起后的个人清洁（洗脸、梳头、漱口）和仪容等护理工作，床单的整理；<br />
        //                 2、晚间护理：患者睡前的个人清洁（包括但不限于租不清洁，会阴清洗等）护理工作，床单的整理；<br />
        //                 3、饮食护理：餐前个人清洁，协助餐食购买、进餐及餐后整理服务，登记进食记录；<br />
        //                 4、排泄护理：协助患者如厕，床上使用便器，留置尿管看护；<br />
        //                 5、服药辅助：提醒服药，协助服药；<br />
        //                 6、观察测量：<br />
        //                     （1）输液看护，出入量记录；<br />
        //                     （2）卧床护理：协助更衣，翻身、移动等；<br />
        //                     （3）康复锻炼：按医嘱，协助离床活动；`,
      },
      ...free,
    ],
    month: [
      {
        src: 'assets/monthService',
        type: 'full',
      },
      {
        title: '服务介绍',
        content: '【居家护理】是指满足居家长期护理需求的整月护理服务。',
      },
      {
        title: '适用人群',
        content: '术后刚出院回家需要康复的人群。',
      },
      {
        title: '护理内容',
        type:'full',
        src: 'assets/monthAndMonth',
      },
      ...free,
      {
        title: '服务范围（上门）',
        city:[
          {
            name:'忻州',
            content:`服务范围：市辖区（忻府区）`,
            src: 'assets/qizhou',
          },
          {
            name:'大同',
            content:`服务范围：市辖区（平城、云冈、新荣、云州）`,
            src: 'assets/datong',
          },
          {
            name:'天津',
            content:`服务范围：市内6区（和平、南开、河东、河西、河北、红桥）+塘沽`,
            src: 'assets/tianjin',
          },
          {
            name:'沈阳',
            content:`服务范围：由重工南街、重工北街、白山路、陵东街、金山路、观泉路、高官台街、新立堡东街、沈水东路、沈水路、玉屏路、揽军路组成的二环以内区域`,
            src: 'assets/shenyang',
          },
          {
            name:'哈尔滨',
            content:` 服务范围：市辖区（松北、道里、南岗、道外、香坊、平房、呼兰、阿城）`,
            src: 'assets/haerbin',
          },
          {
            name:'长春',
            content:`服务范围：市辖区（南关区、宽城区、朝阳区、二道区、绿园区、双阳区、九台区）`,
            src: 'assets/changchun',
          },
          {
            name:'松原',
            content:`服务范围：市辖区（宁江）`,
            src: 'assets/songyuan',
          },
          {
            name:'四平',
            content:`服务范围：市辖区（铁东、铁西）`,
            src: 'assets/siping',
          },
          {
            name:'太原',
            content:`服务范围：市辖区（小店、迎泽、杏花岭、尖草坪、万柏林、晋源）`,
            src: 'assets/taiyuan',
          },
          {
            name:'石家庄',
            content:`服务范围：市辖区（新华、桥西、长安、裕华、井陉、藁城、鹿泉、栾城）`,
            src: 'assets/shijia',
          },
          {
            name:'郑州',
            content:`服务范围：市辖区（中原、二七、管城、金水、上街、惠济）`,
            src: 'assets/zhengzhou',
          },
        ],
      },
      ...prompt,
    ],
  },
  reducers: {},
  effects: {
  },
  subscriptions: {
    setup({ history }) {
      history.listen((location) => {
        location.query = queryString.parse(location.search)
        const type = location.query.type
        if (location.pathname === '/service-process') {
          switch (type) {
            case menu[0]:
              returnTitle('医院护理')
              break;
            case menu[1]:
              returnTitle('居家护理')
              break;
            case menu[2]:
              returnTitle('居家护理')
              break;
            default:
              break;
          }
        }
      })
    },
  },
};
