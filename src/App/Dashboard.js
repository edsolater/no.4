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
  console.log('dashboardSetting: ', dashboardSetting)
  const setProperty = (property, value) => {
    set({ ...dashboardSetting, [property]: value })
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
              style={{ display: 'flex', marginBottom: 16 }}
            >
              <div style={{ width: 180 }}>
                <Tooltip title={propInfo.description}>{propInfo.name}</Tooltip>
              </div>
              <div>
                <Widget
                  activeValue={dashboardSetting[propInfo.name]}
                  availableType={propInfo.type}
                  defaultValue={propInfo.default}
                  defaultValueType={propInfo.defaultType}
                  onChangeValue={value => setProperty(propInfo.name, value)}
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
    // 没有 RadioGroup 的 value
    if(typeof value === 'string' && availableType.match(value)) return 'enum' // 自定义的模式
    return typeof value
  }
  const defaultWidgetType = getWidgetTypeByValue(defaultValue)

  // RadioGroup控件们的状态
  const [activeRadioType, changeSelectedRadioType] = React.useState(
    getWidgetTypeByValue(activeValue)
  ) // 根据默认值类型自动判断默认选择项
  const [radioGroupValues, setRadioGroupValues] = React.useState({}) // 用于保存 Radio 的状态值
  function setValueByRadioType(value, widgetType) {
    changeSelectedRadioType(widgetType)
    setRadioGroupValues({ ...radioGroupValues, [widgetType]: value })
    onChangeValue(value)
  }

  //number控件的状态
  const [sliderNumber, setSliderNumber] = React.useState(defaultValue || 0)
  function handleInputNumber(inputNumber) {
    setSliderNumber(inputNumber)
    onChangeValue(inputNumber)
  }

  // 所有控件设置
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
            unset
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
      console.log('matched: ', defaultValue)
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
      const originalTypes = availableType.split(/ \| (?!'|")/) //前置判断报错，是babel的关系？
      function getInitValueByTypeString(originalType) {
        const regex = [
          [/^boolean$/, false],
          [/^string$/, ''],
          [/^number$/, 0],
          [/.*/, undefined]
        ]
        return regex.find(([pattern]) => pattern.test(originalType))[1]
      }
      console.log('activeRadioType: ', activeRadioType) // TOFIX: unknown
      return (
        <Radio.Group
          value={activeRadioType} // 可用 useMemo 优化
          onChange={({ target: { value: widgetType } }) => {
            const radioValue =
              radioGroupValues[widgetType] || //状态中设定的控件值
              (defaultWidgetType === widgetType && defaultValue) || //Property的默认值中的（该控件的）值
              getInitValueByTypeString(widgetType) //该控件为设定时的值
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
                  defaultValue={
                    (console.log('defaultWidgetType: ', defaultWidgetType),
                    console.log('defaultValue: ', defaultValue),
                    widgetType === defaultWidgetType ? defaultValue : undefined)
                  }
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
  const widgetType = getWidgetTypeByTypeString(availableType)
  return widgets[widgetType]()
}
