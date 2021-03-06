/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 商品管理item
 */
import Taro, {Component} from "@tarojs/taro";
import {Image, Text, View} from "@tarojs/components";
import {parseData, styleAssign, transformTime} from "../../utils/datatool";
import styles, {
  absL,
  absT,
  bdColor,
  bgColor,
  bo,
  color,
  commonStyles,
  fSize,
  h,
  ml,
  mt,
  pl,
  pr,
  radiusA,
  w,
  wRatio
} from "../../utils/style";
import {Goods} from "../../const/global";
import {cloudBaseUrl} from "../../api/httpurl";
import SingleLineText from "../singleline-text";


interface Props {
  itemData: Goods;
  moreCallback: any;
  xiajiaCallback: any;
  onChooseCallback: any;
  notTopGoodsCallback: any;
  showAllOperate: boolean;
  checked: boolean;
}

interface State {
}

export default class GoodsManageItem extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    let {itemData, moreCallback, xiajiaCallback, notTopGoodsCallback, showAllOperate, onChooseCallback,checked} = this.props;

    return (
      <View style={styleAssign([wRatio(100), h(189), bgColor(commonStyles.whiteColor), mt(10)])}
            onClick={(e) => {
              e.stopPropagation();
              if (!showAllOperate) {
                Taro.navigateTo({
                  url: `/pages/mine/goods_detail?id=${itemData.id}`
                });
              } else {
                onChooseCallback(itemData.id);
              }
            }}>
        <View style={styleAssign([styles.uac, styles.udr, ml(20), mt(16)])}>
          {
            showAllOperate &&
            <Image style={styleAssign([w(19), h(19)])}
                   src={checked ? require('../../assets/ico_choosed.png') : require('../../assets/ico_choose_normal.png')}/>
          }
          <View style={styleAssign([w(90), h(90), ml(15)])}>
            <Image style={styleAssign([w(90), h(90), radiusA(4)])} src={parseData(itemData.carouselUrl)[0]}/>
            {
              itemData.showHomepage === 1 && <Image style={styleAssign([w(36), h(36), styles.upa, absL(0), absT(0)])}
                                                    src={`${cloudBaseUrl}ico_top.png`}/>
            }
          </View>
          <View style={styleAssign([ml(12)])}>
            <Text style={styleAssign([fSize(18), color('#343434')])}>{itemData.name.length > 10 ? itemData.name.substring(0, 11) + '...' : itemData.name}</Text>
            {
              itemData.price !== 0 && <View style={styleAssign([styles.uac, styles.udr, mt(16)])}>
                <Text style={styleAssign([fSize(12), color('#A6A6A6')])}>参考价格：</Text>
                <Text style={styleAssign([fSize(18), color('#FA541C')])}>{`¥${itemData.price}`}</Text>
              </View>
            }
            <Text
              style={styleAssign([fSize(12), color('#A6A6A6'), mt(4)])}>{`创建时间：${transformTime(itemData.createTime)}`}</Text>
          </View>
        </View>
        <View
          style={styleAssign([wRatio(95), h(1), {marginLeft: '2.5%'}, bgColor(commonStyles.pageDefaultBackgroundColor), mt(20)])}/>
        {/*底部操作栏*/}
        <View style={styleAssign([styles.uf1, bgColor(commonStyles.whiteColor), styles.udr, styles.uac, styles.ujb,
          pl(20), pr(20)])}>
          <View style={styleAssign([styles.udr, styles.uac])}>
            {/*更多*/}
            <View
              style={styleAssign([w(52), h(28), radiusA(4), bo(1), bdColor(commonStyles.colorTheme),
                {borderStyle: 'solid'}, styles.uac, styles.ujc])}
              onClick={(e) => {
                e.stopPropagation();
                moreCallback(itemData);
              }}>
              <Text style={styleAssign([fSize(12), color('#343434')])}>更多</Text>
            </View>
            {/*下架商品*/}
            <View
              onClick={(e) => {
                e.stopPropagation();
                xiajiaCallback(itemData);
              }}
              style={styleAssign([ml(32), w(72), h(28), radiusA(4), bo(1), bdColor(commonStyles.colorTheme),
                {borderStyle: 'solid'}, styles.uac, styles.ujc])}>
              <Text
                style={styleAssign([fSize(12), color('#343434')])}>{`${itemData.status === 0 ? '上架商品' : '下架商品'}`}</Text>
            </View>
          </View>
          {/*是否展示操作*/}
          <View
            onClick={(e) => {
              e.stopPropagation();
              notTopGoodsCallback(itemData);
            }}
            style={styleAssign([w(72), h(28), radiusA(4), bgColor(commonStyles.colorTheme), styles.uac, styles.ujc])}>
            <Text
              style={styleAssign([fSize(12), color(commonStyles.whiteColor)])}>{`${itemData.showHomepage ? '取消展示' : '首页展示'}`}</Text>
          </View>
        </View>
      </View>
    );
  }
}
