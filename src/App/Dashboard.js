import React from 'react'
import {
  Tooltip,
  Switch,
  Input,
  Slider,
  InputNumber,
  Radio,
  Button
} from 'antd/es'
import { List } from './components/List'

export const Dashboard = ({ selectedComponent }) => {
  // 组件的API文档可能是一个对象，也可能是一个数组（组件没有附属子组件时的简写）
  // 格式化
  const reactProps = Array.isArray(selectedComponent.reactProps)
    ? { [selectedComponent.name]: selectedComponent.reactProps }
    : selectedComponent.reactProps

  // [useState]: Preview的配置
  const [dashboardSetting, set] = React.useState({})
  const setProperty = (property, value) => {
    set({ ...dashboardSetting, [property]: value })
  }

  // List.Item background
  const [itemBackgroundColor, setBackgroundColor] = React.useState({})
  function handleChangeWidgetValue({ type, itemKey, value }) {
    switch (type) {
      case 'change value':
        setBackgroundColor({ ...itemBackgroundColor, [itemKey]: '#eee' })
        break
      default:
        throw new Error('no type defined')
    }
  }

  // [useEffect]: 最初先加载一次默认样式
  React.useEffect(() => {
    if (selectedComponent.presets) set(selectedComponent.presets[0])
  }, [set, selectedComponent]) //  这两项在传入的 Props 不变的情况下永远不会改变，由此 useEffect 变成了 ComponentDidMount 模式

  //组件的UI设置
  return (
    <div style={{ padding: 10 }}>
      {Object.entries(reactProps).map(([name, properties]) => (
        <List key={name} title={name}>
          {properties.map(propInfo => (
            <List.Item
              key={propInfo.name}
              style={{
                background: itemBackgroundColor[propInfo.name],
                display: 'flex',
                marginBottom: 16
              }}
            >
              <div style={{ width: 180 }}>
                <Tooltip title={propInfo.description}>{propInfo.name}</Tooltip>
              </div>
              <div>
                <Widget
                  activeValue={dashboardSetting[propInfo.name]}
                  availableType={propInfo.type}
                  defaultValue={propInfo.default}
                  onChangeValue={value => {
                    handleChangeWidgetValue({
                      type: 'change value',
                      itemKey: propInfo.name,
                      value: value
                    })
                    setProperty(propInfo.name, value)
                  }}
                />
              </div>
            </List.Item>
          ))}
        </List>
      ))}
    </div>
  )
}

/**
 *
 * @param {boolean} isObjectChild
 */
const Widget = ({
  activeValue,
  availableType,
  defaultValue,

  onChangeValue
}) => {
  // TODO: 可以提取这三个算法的共性，以优化
  function getWidgetTypeByTypeString(originalType) {
    if (/^boolean$|^string$|^number$/.test(originalType)) {
      return originalType
    } else {
      if (/^\(.*?\) => .*$/.test(originalType)) return 'function'
      if (/^{.*}$/.test(originalType)) return 'object'
      if (/^\[.*\|.*\]$/.test(originalType)) return 'enum'
      if (/any/.test(originalType)) return 'string'
      if (/^.*\|.*$/.test(originalType)) return 'radioGroup'
    }
    throw new Error("can't get widgetType by typeString")
  }
  function getWidgetTypeByValue(value) {
    // 不肯能有 RadioGroup
    if (typeof value === 'string' && availableType.match(value)) return 'enum' // 自定义的模式
    return typeof value
  }
  function getInitValueByWidgetType(widgetType) {
    const regex = [
      [/^boolean$/, false],
      [/^string$/, ''],
      [/^number$/, 0],
      [/.*/, undefined]
    ]
    return regex.find(([pattern]) => pattern.test(widgetType))[1]
  }

  // const [widgetInitValue, setWidghtDefaultValue] = React.useState(
  //   getInitValueByWidgetType(getWidgetTypeByTypeString(availableType))
  // ) // 设定该控件的默认值

  // ------------RadioGroup控件们的状态------------
  // 自己配置babel、webpack后把这些特化的逻辑放到对应的组件配置中，
  // 或者单独把各个控件提取为单独的组件。现在为了开发速度还不需要
  const [activeRadioType, changeSelectedRadioType] = React.useState(
    getWidgetTypeByValue(activeValue || defaultValue)
  ) // 根据默认值类型自动判断默认选择项
  const [radioGroupValues, setRadioGroupValues] = React.useState({}) // 用于保存 Radio 的状态值
  function setValueByRadioType(value, widgetType) {
    changeSelectedRadioType(widgetType)
    setRadioGroupValues({ ...radioGroupValues, [widgetType]: value })
    onChangeValue(value)
  }

  // ------------number控件的状态------------
  // 自己配置babel、webpack后把这些特化的逻辑放到对应的组件配置中，
  // 或者单独把各个控件提取为单独的组件。现在为了开发速度还不需要
  const [sliderNumber, setSliderNumber] = React.useState(defaultValue || 0)
  function handleInputNumber(inputNumber) {
    setSliderNumber(inputNumber)
    onChangeValue(inputNumber)
  }

  // ------------所有的可用控件------------
  const widgets = {
    boolean() {
      return (
        <Switch
          checked={Boolean(activeValue || defaultValue)}
          onChange={checked => onChangeValue(checked)}
        />
      )
    },
    number() {
      return (
        <div>
          <InputNumber value={sliderNumber} onChange={handleInputNumber} />
          <Slider value={sliderNumber} onChange={handleInputNumber} />
        </div>
      )
    },
    string() {
      return (
        <Input
          placeholder={defaultValue}
          value={activeValue}
          onChange={e => {
            onChangeValue(e.target.value)
          }}
        />
      )
    },
    enum() {
      const [, matched] = availableType.match(/^\[(.*)\]$/)
      const enumStrings = matched
        .trim()
        .split('|')
        .map(str => str.trim().replace(/'|"/g, ''))
      return (
        <>
          <Button
            style={{ marginRight: 20 }}
            onClick={() => onChangeValue(undefined)}
          >
            reset
          </Button>
          <Radio.Group
            buttonStyle="solid"
            onChange={e => onChangeValue(e.target.value)}
            value={activeValue || defaultValue}
          >
            {enumStrings.map(str => (
              <Radio.Button key={str} value={str}>
                {str}
              </Radio.Button>
            ))}
          </Radio.Group>
        </>
      )
    },
    object() {
      const [, matched] = availableType.trim().match(/^{(.*)}$/)
      const entries = matched
        .trim()
        .split(', ')
        .map(entry => entry.split(': '))
      return (
        <div>
          {'{'}
          <div style={{ marginLeft: 32 }}>
            {entries.map(([key, valueType]) => {
              return (
                <div style={{ display: 'flex' }} key={`${key}`}>
                  <span
                    style={{
                      marginRight: 20,
                      opacity: 0.6,
                      flex: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >{`${key} :   `}</span>
                  <Widget
                    activeValue={Object(activeValue)[key]}
                    availableType={valueType}
                    defaultValue={defaultValue && defaultValue[key]}
                    isObjectChild
                    onChangeValue={value => {
                      onChangeValue({ ...activeValue, [key]: value })
                    }}
                  />
                </div>
              )
            })}
          </div>
          {'}'}
        </div>
      )
    },
    function() {
      return <span>{availableType}</span> // 何必管这么多呢？直接原封不动返回就是
    },
    radioGroup() {
      const originalTypes = availableType.split(/ \| (?!'|")/) //如果有前置判断就报错，是babel的关系？
      function getWidgetDefaultValue(widgetType) {
        return widgetType === getWidgetTypeByValue(defaultValue)
          ? defaultValue
          : undefined
      }
      return (
        <Radio.Group
          value={activeRadioType} // 可用 useMemo 优化
          onChange={({ target: { value: widgetType } }) => {
            const radioValue =
              radioGroupValues[widgetType] || //状态中设定的控件值
              getWidgetDefaultValue(widgetType) || //Property的默认值中的（该控件的）值
              getInitValueByWidgetType(widgetType) //该控件为设定时的值
            setValueByRadioType(radioValue, widgetType)
          }}
        >
          {originalTypes.map((originalType, index) => {
            const widgetType = getWidgetTypeByTypeString(originalType)
            return (
              <Radio
                key={index}
                value={widgetType}
                style={{ display: 'block', marginBottom: 8 }}
              >
                <Widget
                  activeValue={radioGroupValues[widgetType]}
                  defaultValue={getWidgetDefaultValue(widgetType)}
                  availableType={originalType}
                  onChangeValue={value => {
                    setValueByRadioType(value, widgetType)
                  }}
                />
              </Radio>
            )
          })}
        </Radio.Group>
      )
    },
    unknown() {
      return null
    }
  }

  // 第一次渲染的何种控件，中途不可能变成另一种控件，故这样优化。
  // 可以使 RadioGroup 变换操作控件(o゜▽゜)o☆
  const widgetType = React.useMemo(
    () => getWidgetTypeByTypeString(availableType),
    [availableType]
  )
  return widgets[widgetType]()
}
