"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const datatool_1 = require("../../utils/datatool");
const style_1 = require("../../utils/style");
const loading_1 = require("../loading");
class CustomSafeAreaView extends taro_1.Component {
    constructor(props) {
        super(props);
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/25
         * @function: 显示进度条
         */
        this.showLoading = () => {
            this.setState({ showLoading: true });
        };
        /**
         * @author 何晏波
         * @QQ 1054539528
         * @date 2019/9/25
         * @function: 隐藏进度条
         */
        this.hideLoading = () => {
            this.setState({ showLoading: false });
        };
        this.state = {
            paddingTop: 0,
            paddingBottom: 0,
            showLoading: false,
        };
    }
    componentWillMount() {
        //这里只要是针对微信小程序设置自定义tabBar后的iphoneX高度适配
        if (style_1.iphoneX()) {
            this.setState({ paddingTop: 45, paddingBottom: 94 });
        }
        else {
            this.setState({ paddingTop: 20, paddingBottom: 64 });
        }
    }
    render() {
        let { customStyle, children, notNeedSafe } = this.props;
        let { paddingTop, paddingBottom, showLoading } = this.state;
        console.log('距离顶部', paddingTop);
        return (<components_1.View style={datatool_1.styleAssign([style_1.wRatio(100), style_1.hRatio(100), style_1.bgColor(style_1.commonStyles.whiteColor), style_1.pt(notNeedSafe ? 0 : paddingTop), style_1.pb(paddingBottom), customStyle])}>
        {children}
        {showLoading && <loading_1.default />}
      </components_1.View>);
    }
}
exports.default = CustomSafeAreaView;
//# sourceMappingURL=index.weapp.jsx.map