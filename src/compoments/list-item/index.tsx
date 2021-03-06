/**
 * @filename add_task.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 长列表item组件
 */
import Taro, {Component} from '@tarojs/taro'
import {Image, Input, Text, View} from "@tarojs/components";
import {bgColor, color, commonStyles, default as styles, fSize, h, ml, pl, pr, w, wRatio} from "../../utils/style";
import {styleAssign} from "../../utils/datatool";
import TouchableButton from "../touchable-button";

interface Props {
  title: string;
  subTitle?: string;
  value?: string;
  hasEdit?: boolean;
  must?: boolean;
  onCLick?: any;
  notHasUnderline?: boolean;
  onTextChange?: any;
  textColor?: string;
}

export default class ListItem extends Component<Props> {

  render() {
    let {title, subTitle, value, hasEdit, onCLick, notHasUnderline, onTextChange, textColor, must} = this.props;

    return (
      <View style={styleAssign([wRatio(100)])}>
        <TouchableButton
          onClick={() => {
            if (onCLick) {
              onCLick(title);
            }
          }}
          customStyle={styleAssign([wRatio(100), h(55), bgColor(commonStyles.whiteColor), styles.udr, styles.uac,
            styles.ujb, pl(20), pr(20)])}>
          <View style={styleAssign([styles.uac, styles.udr])}>
            {
              must && <Text style={styleAssign([fSize(14), color(commonStyles.redColor)])}>*</Text>
            }
            <Text style={styleAssign([fSize(14), color(textColor ? textColor : '#0C0C0C')])}>{title}</Text>
          </View>
          {
            hasEdit ? <Input type='text' value={value}
                             maxLength={subTitle && subTitle.includes('手机') ? 11 : -1}
                             placeholder={subTitle}
                             style={styleAssign([fSize(14), {textAlign: 'right'}])}
                             onInput={onTextChange}/> :
              <View style={styleAssign([styles.uac, styles.udr])}>
                <Text
                  style={styleAssign([fSize(14), color(value && value.length !== 0 ? '#0C0C0C' : '#979797')])}>{value ? value : subTitle}</Text>
                <Image style={styleAssign([w(8), h(14), ml(9)])} src={require('../../assets/ico_next.png')}/>
              </View>
          }
        </TouchableButton>
        {
          !notHasUnderline && <View
            style={styleAssign([wRatio(90), h(1), bgColor(commonStyles.pageDefaultBackgroundColor), {marginLeft: '5%'}])}/>
        }
      </View>
    )
  }
}
