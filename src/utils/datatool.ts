import Taro, {pxTransform} from "@tarojs/taro";
export let defaultPixel = 2;//iphone6的像素密度

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/18
 * @function: 尺寸适配
 */
export function scaleSize(size: number) {

  return pxTransform(size * defaultPixel);
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/21
 * @function: 字体大小适配
 */
export function setSpText(size: number) {

  return pxTransform(Math.round(size * defaultPixel + 0.5));
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/9/21
 * @function: 将样式数组进行合并
 */
export function styleAssign(styles: any[]) {
  styles.unshift({display: 'flex'});
  styles.unshift({flexDirection: 'column'});
  styles.unshift({position: 'relative'});
  //@ts-ignore
  return Object.assign(...styles);
}

/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2018/10/22
 * @function: 定时器任务
 */
export function debounce(fn, wait) {
  let timer;

  return function () {
    let that = this;

    let args = arguments;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(that, args);
    }, wait)
  }
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: 缓存保存
 */
export function save(key, value) {
  Taro.setStorage({key, data: value});
}


/**
 * @author 何晏波
 * @QQ 1054539528
 * @date 2019/12/28
 * @function: 缓存保存
 */
export function get(key, callback) {
  Taro.getStorage({key})
    .then((res: any) => {
      console.log('获取用户数据', res.data);
      callback(res.data);
    });
}
