const colorFunctions = {
  // 记录了stage1、2、3的标准颜色名称（向HSL的转换）
  _CSSColor: {
    // 灰色系
    white: [0, 0, 100], // 白
    snow: [0, 100, 99], // 雪
    whitesmoke: [0, 0, 96], // 白烟
    gainsboro: [0, 0, 86], // 亮灰（赶死部落）
    lightgray: [0, 0, 83], // 浅灰
    sliver: [0, 0, 75], // 银
    darkgray: [0, 0, 66], // 深灰色
    gray: [0, 0, 50], // 灰
    dimgray: [0, 0, 41], // 暗灰色
    black: [0, 0, 0], //黑

    //红色系
    hotpink: [330, 100, 71], // 热情的粉红
    lavenderblush: [340, 100, 97], // 薰衣草红
    palevioletred: [340, 60, 65], // 苍紫罗兰红
    crimson: [348, 83, 47], // 绯红
    pink: [350, 100, 88], // 粉红色
    lightpink: [351, 100, 86], // 浅粉红
    lightcoral: [0, 79, 72], // 浅珊瑚色
    rosybrown: [0, 25, 65], // 玫瑰棕
    indianred: [0, 53, 58], // 印第安红
    red: [0, 100, 50], // 红色
    brown: [0, 59, 41], // 棕色
    firebrick: [0, 68, 42], // 火砖
    darkred: [0, 100, 27], // 深红色
    maroon: [0, 100, 25], // 褐红色/栗色
    mistyrose: [6, 100, 94], // 迷雾玫瑰
    salmon: [6, 93, 71], // 鲑鱼肉
    tomato: [9, 100, 64], // 西红柿

    // 橙色系
    darksalmon: [15, 72, 70], // 深色鲑鱼肉
    orangered: [16, 100, 50], // 橙红色
    coral: [16, 100, 66], // 珊瑚色
    lightsalmon: [17, 100, 74], // 浅色鲑鱼肉
    sienna: [19, 56, 40], // 赭
    seashell: [25, 100, 97], // 沙滩贝壳
    chocolate: [25, 75, 47], // 巧克力
    saddlebrown: [25, 76, 31], // 重褐色
    peachpuff: [28, 100, 86], // 桃色
    sandybrown: [28, 87, 67], // 沙棕色
    linen: [30, 67, 94], // 亚麻色
    peru: [30, 59, 53], // 秘鲁色
    bisque: [33, 100, 88], // 浓汤
    darkorange: [33, 100, 50], // 深橘红
    antiquewhite: [34, 78, 91], // 古典白
    burlywood: [34, 57, 70], // 实木
    tan: [34, 44, 69], // 皮革原色（棕褐色）
    navajowhite: [36, 100, 84], // 那瓦白（印第安黄）
    blanchedalmod: [36, 100, 90], // 发白的杏仁
    papayawhip: [37, 100, 92], // 番木
    moccasin: [38, 100, 85], // 鹿皮鞋
    oldlace: [39, 85, 95], // 旧白蕾丝花边
    wheat: [39, 77, 83], // 小麦色
    orange: [39, 100, 50], // 橙色
    floralwhite: [40, 100, 97], // 白色鲜花
    goldenrod: [43, 74, 49], // 秋麒麟
    darkgoldenrod: [43, 89, 38], // 深秋麒麟

    //黄色系
    cornsilk: [48, 100, 93], // 玉米丝
    gold: [51, 100, 50], //金
    lemonchiffon: [54, 100, 90], // 柠檬雪纺衫
    khaki: [54, 77, 75], // 卡其色
    palegoldenrod: [55, 67, 80], // 苍秋麒麟
    darkkhaki: [56, 38, 58], // 深卡其色
    ivory: [60, 100, 97], // 象牙白/乳白
    lightyellow: [60, 100, 94], // 浅黄色
    beige: [60, 56, 91], // 米黄色
    lightgoldenrodyellow: [60, 80, 90], // 浅秋麒麟黄
    yellow: [60, 100, 50], // 黄色
    olive: [60, 100, 25], // 橄榄
    yellowgreen: [80, 61, 50], // 黄绿色
    olivedrab: [80, 60, 35], // 橄榄褐色
    darkolivegreen: [82, 39, 30], // 深橄榄绿
    greenyellow: [84, 100, 59], // 绿黄色

    //绿色系
    chartreuse: [90, 100, 50], // 黄绿色
    lawngreen: [90, 100, 49], // 草坪绿
    darkseagreen: [120, 25, 65], // 深海洋绿
    honeydew: [120, 100, 97], // 白瓜
    palegreen: [120, 93, 79], // 苍绿色
    lightgreen: [120, 73, 75], // 浅绿色
    lime: [120, 100, 50], // 青柠色
    limegreen: [120, 61, 50], // 青柠绿
    forestgreen: [120, 61, 34], // 丛林绿
    green: [120, 100, 25], // 绿色
    darkgreen: [120, 100, 20], // 深绿色
    seagreen: [146, 50, 36], // 草绿色
    mediumseagreen: [147, 50, 47], // 间海洋绿

    //青色系
    mintcream: [150, 100, 98], // 薄荷奶油
    springgreen: [150, 100, 50], // 春绿
    mediumspringgreen: [157, 100, 49], // 间春绿
    aquamarine: [160, 100, 75], // 海蓝宝石/碧绿
    mediumaquamarine: [160, 51, 60], // 间碧绿
    turquoise: [174, 72, 56], // 绿松石
    lightseagreen: [177, 70, 41], // 浅海洋绿
    mediumturquoise: [178, 60, 55], // 间绿松石
    lightcyan: [180, 100, 94], // 淡青色
    azure: [180, 100, 97], // 天蓝色
    paleturquoise: [180, 65, 81], // 苍绿松石
    cyan: [180, 100, 50], // 青色（水色）
    aqua: [180, 100, 50], // 水色（青色）
    darkcyan: [180, 100, 27], // 深青色
    teal: [180, 100, 25], // 水鸭
    darkslategray: [180, 25, 25], // 深石板灰
    darkturquoise: [181, 100, 41], // 深绿松石
    cadeblue: [182, 25, 50], // 军蓝色
    powderblue: [187, 52, 80], // 粉蓝色
    lightblue: [195, 53, 79], // 淡蓝色
    deepskyblue: [195, 100, 50], // 深色天空蓝
    skyblue: [197, 71, 73], // 天空蓝
    lightskyblue: [203, 93, 75], // 浅色天空蓝
    steelblue: [207, 44, 49], // 钢蓝色
    aliceblue: [208, 100, 97], // 爱丽丝蓝

    //蓝色系
    dodgerblue: [210, 100, 56], // 闪蓝色
    slategray: [210, 13, 50], // 石板灰
    cornflowerblue: [219, 79, 66], // 矢车菊
    royalblue: [225, 73, 57], // 皇家蓝
    ghostwhite: [240, 3, 100], // 幽灵白
    lavender: [240, 67, 94], // 薰衣草
    blue: [240, 100, 50], // 蓝色
    middleblue: [240, 100, 40], // 间蓝色
    darkblue: [240, 100, 27], // 深蓝色
    midnightblue: [240, 64, 27], // 午夜蓝
    navy: [240, 100, 25], // 藏青色
    slateblue: [248, 53, 58], // 板岩蓝
    darkslateblue: [248, 39, 39], // 深板岩蓝
    mediumslateblue: [249, 80, 67], // 间板岩蓝
    mediumpurple: [260, 60, 65], // 间紫色

    //品色系
    rebeccapurple: [270, 50, 40], // 基佬紫
    blueviolet: [271, 76, 53], // 蓝紫罗兰
    indigo: [275, 100, 25], // 靛蓝色
    darkorchid: [280, 61, 50], // 深兰花
    darkviolet: [282, 100, 41], // 深紫罗兰
    mediumorchid: [288, 59, 58], // 间兰花色
    thistle: [300, 24, 80], // 蓟花
    plum: [300, 47, 75], // 梅花色
    violet: [300, 76, 72], // 紫罗兰
    fushia: [300, 100, 50], // 桃红色/玫红色（品红色/洋红色）
    magenta: [300, 100, 50], // 品红色/洋红色（桃红色/玫红色）
    darkmagenta: [300, 100, 27], // 深洋红色
    purple: [300, 100, 25], // 紫色
    orchid: [302, 59, 65], // 兰花色
    mediumvioletred: [322, 81, 43], // 间紫罗兰红
    deeppink: [328, 100, 54] // 深粉红
  },
  // 记录了自定义的颜色名称（向hsl的转换）
  _myColor: {
    blackcoffee: [12, 83, 2],
    coco: [10, 37, 25]
  },
  
  /**
   *
   * @param {string} color 需要提取格式关键信息的颜色字符串
   */
  _formatColor(color) {
    let regexResult
    if (
      (regexResult = color.match(
        /hsl\((?<hue>\d{1,3}), *(?<saturation>\d{1,2})%, *(?<lightness>\d{1,2})%\)/
      ))
    ) {
      return {
        colorMode: 'hsl',
        threeColorElement: regexResult.slice(1)
      }
    } else if (
      (regexResult = color.match(/#(?<red>.{2})(?<green>.{2})(?<blue>.{2})/))
    ) {
      return {
        colorMode: '#',
        threeColorElement: regexResult.slice(1)
      }
    } else if (
      (regexResult = color.match(/#(?<red>.{1})(?<green>.{1})(?<blue>.{1})/))
    ) {
      return {
        colorMode: '#',
        threeColorElement: regexResult.slice(1).map(x => `${x}${x}`)
      }
    } else if (
      (regexResult = color.match(
        /rgb\((?<red>\d{1,3}), *(?<green>\d{1,3}), *(?<blue>\d{1,3})\)/
      ))
    ) {
      return {
        colorMode: 'rgb',
        threeColorElement: regexResult.slice(1)
      }
    }
    return console.warn(
      `can't analyze this format: ${color}. Directly pass this color: ${color}`
    )
  },

  /**
   *
   * @param {string} colorname 描述性颜色名称
   * @example TODO
   */
  toHSL(colorname) {
    const hslElements = this._CSSColor[colorname] || this._myColor[colorname]
    if (!hslElements) {
      console.warn(
        `${colorname} doesn't setted in this._CSSColor or this._myColor. Directly pass this color: ${colorname}`
      )
      return colorname
    }
    return `hsl(${hslElements[0]}, ${hslElements[1]}%, ${hslElements[2]}%)`
  },

  /**
   * @param {string} color 需要透明化的颜色
   * @param {number} opacity 不透明度
   * @example TODO
   */
  opacify(color, opacity) {
    color = this.toHSL(color)
    const result = this._formatColor(color) || { colorMode: undefined }
    switch (result.colorMode) {
      case 'hsl':
        const [hue, saturation, lightness] = result.threeColorElement
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`
      case '#':
        const [r, g, b] = result.threeColorElement
        opacity = opacity.toString(16).slice(2, 4)
        if (opacity.startsWith('0')) {
          opacity = `${opacity[1]}0`
        }
        return `#${r}${g}${b}${opacity}`
      case 'rgb':
        const [red, green, blue] = result.threeColorElement
        return `rgba(${red}, ${green}, ${blue}, ${opacity})`
      default:
        console.warn(
          `${color} is already opacified or don't matched any colorMode`
        )
    }
  }
}

colorFunctions.opacify('red', 0.02)
