/**
 * @filename choose_customer.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 选择客户界面
 */
import Taro, {Component, Config} from '@tarojs/taro'
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  op,
  pl,
  pr,
  radiusA,
  w,
  wRatio,
  screenHeight,
  pb
} from "../../utils/style";
import {parseData, styleAssign, toast} from "../../utils/datatool";
//@ts-ignore
import {connect} from "@tarojs/redux";
import * as actions from "../../actions/customer";
import TopHeader from "../../compoments/top-header/index";
import {Image, Input, ScrollView, Text, View} from "@tarojs/components";
import GuanLianCustomer from "../../compoments/guanlian-customer/index";
import {CustomerModel} from "../../const/global";

interface Props {
  getCustomerList?: any;
}

interface State {
  customerList: CustomerModel[];
  name: string;
  chooseCustomerIds: number[];
  chooseIds: number[];
}

@connect(state => state.login, {...actions})
class ChooseCustomer extends Component<Props, State> {
  private viewRef;
  private pageNo;
  private pageSize;
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {}

  constructor(props) {
    super(props);
    console.log('呵呵', parseData(this.$router.params.chooseIds));
    this.pageNo = 1;
    this.pageSize = 1000;
    this.state = {
      chooseIds: parseData(this.$router.params.chooseIds),
      customerList: [],
      name: '',
      chooseCustomerIds: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.refresh();
  }

  componentDidHide() {
  }

  refresh = () => {
    this.pageNo = 1;
    this.getCustomerList(true);
  }

  loadMore = () => {
    this.pageNo++;
    this.getCustomerList();
  }


  /**
   * @author 何晏波
   * @QQ 1054539528
   * @function: 获取客户列表
   */
  getCustomerList = (refresh?: boolean) => {

    let {name, chooseIds} = this.state;

    this.viewRef && this.viewRef.showLoading();
    let params = {pageNo: this.pageNo, pageSize: this.pageSize};

    if (name) {
      Object.assign(params, {name});
    }
    this.props.getCustomerList(params).then((res) => {
      console.log('获取客户列表', res, chooseIds);
      this.viewRef && this.viewRef.hideLoading();
      if (refresh) {
        let customerArray: any = [];

        for (let i = 0; i < res.records.length; i++) {
          console.log('打印',chooseIds);
          if (!chooseIds || chooseIds.indexOf(res.records[i].id)=== -1) {
            customerArray.push(res.records[i]);
          }
        }
        this.setState({customerList: customerArray});
      } else if (res.records && res.records.length !== 0) {
        this.setState({customerList: this.state.customerList.concat(res.records)});
      } else {
        toast('没有客户了');
      }

    }).catch(e => {
      this.viewRef && this.viewRef.hideLoading();
      console.log('报错啦', e);
    });
  }


  render() {
    let {customerList, chooseCustomerIds} = this.state;

    return (
      <CustomSafeAreaView customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          ref={(ref) => {
                            this.viewRef = ref;
                          }}>
        <TopHeader title={'选择客户'}/>
        <View
          style={styleAssign([wRatio(100), h(63), bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
            pl(20), pr(20), pb(10)])}>
          <View style={styleAssign([{width: '85%'}, h(31), op(0.7), bgColor('#F5F5F5'),
            radiusA(26), styles.uac, styles.udr])}>
            <Image style={styleAssign([w(21), h(21), ml(16)])} src={require('../../assets/ico_search.png')}/>
            <Input type='text' placeholder='搜索客户姓名' style={styleAssign([ml(16), fSize(14)])}
                   onInput={(e) => {
                     this.setState({name: e.detail.value}, () => {
                       this.refresh();
                     })
                   }}/>
          </View>
          <Text style={styleAssign([fSize(16), color(commonStyles.colorTheme)])}
                onClick={() => {
                  let chooseCustomers: CustomerModel[] = [];

                  for (let i = 0; i < customerList.length; i++) {
                    for (let j = 0; j < chooseCustomerIds.length; j++) {
                      if (customerList[i].id === chooseCustomerIds[j]) {
                        chooseCustomers.push(customerList[i]);
                        break;
                      }
                    }
                  }
                  Taro.eventCenter.trigger('chooseCustomer', chooseCustomers);
                  Taro.navigateBack();
                }}>确定</Text>
        </View>
        {
          customerList.length === 0 ?
            <View
              style={styleAssign([styles.uf1, styles.uac, styles.ujc, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
              <View style={styleAssign([styles.uac])}>
                <Image style={styleAssign([w(78), h(69)])} src={require('../../assets/ico_no_data.png')}/>
                <Text style={styleAssign([fSize(15), color('#343434'), mt(31)])}>当前暂无客户</Text>
              </View>
            </View> :
            <ScrollView
              style={styleAssign([h(screenHeight()), bgColor(commonStyles.pageDefaultBackgroundColor)])}
              scrollY
              onScrollToUpper={() => {
                this.refresh();
              }}
              onScrollToLower={() => {
                // this.loadMore();
              }}>
              <View style={styleAssign([styles.uf1, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
                {
                  customerList.map((value, index) => {
                    return <GuanLianCustomer
                      customer={value} key={index}
                      backgroundColor={commonStyles.pageDefaultBackgroundColor}
                      marginTop={10}
                      hascheck={true}
                      isChecked={chooseCustomerIds.includes(value.id)}
                      onChoose={(id: number) => {
                        let hasData = false;

                        for (let i = 0; i < chooseCustomerIds.length; i++) {
                          if (id === chooseCustomerIds[i]) {
                            hasData = true;
                            this.state.chooseCustomerIds.splice(i, 1);
                            this.setState({chooseCustomerIds: this.state.chooseCustomerIds},
                              () => {
                                console.log('点击', this.state.chooseCustomerIds);
                              });
                            break;
                          }
                        }
                        if (!hasData) {
                          this.state.chooseCustomerIds.push(id);
                          this.setState({chooseCustomerIds: this.state.chooseCustomerIds},
                            () => {
                              console.log('点击', this.state.chooseCustomerIds);
                            });
                        }
                      }
                      }/>;
                  })
                }
              </View>
            </ScrollView>
        }
      </CustomSafeAreaView>
    )
  }
}


export default ChooseCustomer
