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
  function getWidgetTypeByOriginalType(originalType) {
    if (/^boolean$|^string$|^number$/.test(originalType)) {
      return originalType
    } else {
      if (/^\(.*?\) => .*$/.test(originalType)) return 'function'
      if (/^{.*}$/.test(originalType)) return 'object'
      if (/^\[.*\|.*\]$/.test(originalType)) return 'enum'
      if (/^.*\|.*$/.test(originalType)) return 'radioGroup'
      if (/any/.test(originalType)) return 'string'
    }
    return 'unknown'
  }
  function getInitValueByOriginalType(originalType) {
    const regex = [[/^boolean$/, false], [/.*/, undefined]]
    return regex.find(([pattern]) => pattern.test(originalType))[1]
  }
  function getWidgetTypeByValue(value) {
    return typeof value
    value = typeof value !== 'object' ? String(value) : value.toSource()
    const regex = [
      [/^true$|^false$/, { type: 'boolean', init: false }],
      [/^\d+$/, { type: 'number', init: 0 }],
      [/^'.*'*$|^".*"*$/, { type: 'string', init: '' }],
      [/^\({.*}\)$/, { type: 'object', init: {} }]
    ]
    const matched = regex.find(([pattern]) => pattern.test(value))
    const typeObj = matched ? matched[1] : {}
    return typeObj
  }
  const defaultWidgetType = getWidgetTypeByValue(defaultValue)
  //适用于RadioGroup组
  const [activeRadioType, changeSelectedRadioType] = React.useState(
    getWidgetTypeByValue(activeValue)
  ) // 根据默认值类型自动判断默认选择项
  const [radioGroupValues, setRadioGroupValues] = React.useState({}) //用于保存 Radio 的状态值
  function setValueByRadioType(value, widgetType) {
    changeSelectedRadioType(widgetType)
    setRadioGroupValues({ ...radioGroupValues, [widgetType]: value })
    onChangeValue(value)
  }

  //适用于number组，联动 Slider 与 InputNumber
  const defaultSliderNumber = defaultValue || 0
  const [sliderNumber, setSliderNumber] = React.useState(activeValue || 0)
  function handleInputNumber(inputNumber) {
    setSliderNumber(inputNumber)
    onChangeValue(inputNumber)
  }

  // 所有控件设置
  const widgets = {
    boolean() {
      return (
        <Switch
          defaultChecked={defaultValue}
          checked={Boolean(activeValue)}
          onChange={checked => {
            // console.log('checked: ', checked)
            onChangeValue(checked)
          }}
        />
      )
    },
    number() {
      return (
        <div>
          <InputNumber
            defaultValue={defaultSliderNumber}
            value={sliderNumber}
            onChange={handleInputNumber}
          />
          <Slider
            defaultValue={defaultSliderNumber}
            value={sliderNumber}
            onChange={handleInputNumber}
          />
        </div>
      )
    },
    string() {
      return (
        <Input
          defaultValue={
            (typeof defaultValue === 'string' && defaultValue) ||
            activeValue ||
            undefined
          }
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
        <div>
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
        </div>
      )
    },
    object() {
      const [, matched] = availableType.trim().match(/^{(.*)}$/)
      const entries = matched
        .trim()
        .split(', ')
        .map(entry => entry.split(': '))
      console.log('matched: ', matched)
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
      const originalTypes = availableType.split(' | ') // TODO:  增加对 object、Function、enum 值类型的判断。但这要使render成为组件，并能拥有状态再去解决，也就是要解决强制刷新问题。现在先把问题放一放。
      return (
        <Radio.Group
          value={activeRadioType} // 可用 useMemo 优化
          onChange={({ target: { value: widgetType } }) => {
            const radioValue =
              radioGroupValues[widgetType] || //状态中设定的控件值
              (defaultWidgetType === widgetType && defaultValue) || //Property的默认值中的（该控件的）值
              getInitValueByOriginalType(widgetType) //该控件为设定时的值
            setValueByRadioType(radioValue, widgetType)
          }}
        >
          {originalTypes.map((originalType, index) => {
            const widgetType = getWidgetTypeByOriginalType(originalType)
            return (
              <Radio
                key={index}
                value={widgetType}
                style={{ display: 'block', marginBottom: 8 }}
              >
                <Widget
                  activeValue={radioGroupValues[widgetType]}
                  defaultValue={
                    widgetType === defaultWidgetType ? defaultValue : undefined
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
  const widgetType = getWidgetTypeByOriginalType(availableType)
  return widgets[widgetType]()
}
