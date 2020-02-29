/**
 * @filename radarscan.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/8
 * @Description: 雷达
 */
import Taro, {Component, Config} from '@tarojs/taro'
import {Image, ScrollView, Text, View} from '@tarojs/components'
import CustomSafeAreaView from "../compoments/safe-area-view/index";
import {styleAssign, toast} from "../utils/datatool";
import styles, {bgColor, color, commonStyles, fSize, h, mt, w, wRatio} from "../utils/style";
import RadarItem from "./pagecomponent/radar-item/index";
import * as actions from '../actions/radar';
import {connect} from "@tarojs/redux";
import {RadarModel} from "../const/global";
import NavigationBar from "../compoments/navigation_bar/index";

interface Props {
  //查询我的雷达数据列表
  getTraceList: any;
}

interface State {
  records: RadarModel[];
}

@connect(state => Object.assign(state.taskCenter, state.login), {...actions})
class Radarscan extends Component<Props, State> {
  private pageNo;
  private pageSize;
  private viewRef;
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    disableScroll: true
  }

  constructor(props) {
    super(props);
    this.pageNo = 1;
    this.pageSize = 10;
    this.state = {
      records: []
    }
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  refresh = () => {
    this.pageNo = 1;
    this.getTraceList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.getTraceList();
  }

  /**
   * @author 何晏波
   * @QQ 1054539528
   * @date 2020/2/10
   * @function: 查询我的雷达数据列表
   */
  getTraceList = (refresh?: boolean) => {
    this.viewRef && this.viewRef.showLoading();
    this.props.getTraceList({pageNo: this.pageNo, pageSize: this.pageSize}).then((res) => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('查询我的雷达数据列表', res);
      if (refresh) {
        this.setState({records: res.records});
      } else if (res.records && res.records.length !== 0) {
        this.setState({records: this.state.records.concat(res.records)});
      } else {
        toast('没有记录了');
      }
    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }

  render() {
    let {records} = this.state;

    return (
      <CustomSafeAreaView
        customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
        notNeedBottomPadding={true}
        ref={(ref) => {
          this.viewRef = ref;
        }} >
        {/*雷达、访客切换*/}
        <NavigationBar>
          <View style={styleAssign([wRatio(100), styles.uac, styles.ujc])}>
            <Text style={styleAssign([fSize(18)])}>雷达</Text>
          </View>
        </NavigationBar>
        {
          records.length === 0 ?
            <View style={styleAssign([styles.uf1, styles.uac, styles.ujc,bgColor(commonStyles.pageDefaultBackgroundColor)])}>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(78), h(69)])} src={require('../assets/ico_no_data.png')}/>
                <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂记录</Text>
              </View>
            </View> :
            <ScrollView
              style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}
              scrollY
              onScrollToUpper={() => {
                this.refresh();
              }}
              onScrollToLower={() => {
                this.loadMore();
              }}>
              {
                records.map((value, index) => {
                  console.log(value);
                  return (<RadarItem key={index} item={value}/>);
                })
              }
            </ScrollView>
        }
      </CustomSafeAreaView>
    )
  }
}

export default Radarscan;