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
import { color } from './settings/style'

export const Dashboard = ({ selectedComponent }) => {
  const [widgetBackground, dispatchWidgetBackground] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'set': {
          const newState = { ...state }
          newState[action.key] = action.value
          console.log(
            `[set a new widgetBackground] ${action.key}: ${action.value}`
          )
          return newState
        }
        case 'delete': {
          const newState = { ...state }
          delete newState[action.key]
          console.log(
            `[delete a widgetBackground] ${action.key}: ${action.value}`
          )
          return newState
        }
        default: {
          throw new Error('unknown action type for widget background')
        }
      }
    },
    {}
  )

  // TODO:可以把判断是否等同默认值的逻辑提取出来，数据库就保留数据库的原始操作方法。且不应该使用其他库的方法，引起混乱
  // dashboard的全部 widgets配置
  const [widgetSettings, dispatchWidgetSetting] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'set': {
          const newState = { ...state }
          newState[action.key] = action.value
          console.log(
            `[set a new widgetSetting] ${action.key}: ${action.value}`
          )
          return newState
        }
        case 'cover all': {
          const newState = action.all
          console.log(`[cover all widgetSettings] use: ${action.all}`)
          return newState
        }
        case 'delete': {
          const newState = { ...state }
          delete newState[action.key]
          console.log(`[delete an exist widgetSetting] ${action.key}`)
          return newState
        }
        default: {
          throw new Error('unknown action type for dashboard setting')
        }
      }
    },
    {}
  )

  function setValue(value, propInfo) {
    function theSame(newValue, defaultValue) {
      // 当设定的新值与默认值相同时，等同于没有设定
      // 当新值是布尔值时，默认值的undefined就是false
      return (
        newValue ===
        (typeof defaultValue === undefined
          ? Boolean(defaultValue)
          : defaultValue)
      )
    }
    if (theSame(value, propInfo.default)) {
      dispatchWidgetSetting({ type: 'delete', key: propInfo.name })
      dispatchWidgetBackground({ type: 'delete', key: propInfo.name })
    } else {
      dispatchWidgetSetting({ type: 'set', key: propInfo.name, value: value })
      dispatchWidgetBackground({
        type: 'set',
        key: propInfo.name,
        value: color.componentColorInGroup[selectedComponent.class]
      })
    }
  }

  // 如果有的话，最初先加载一次默认样式
  React.useEffect(() => {
    if (selectedComponent.presets)
      dispatchWidgetSetting({
        type: 'cover all',
        all: selectedComponent.presets[0]
      })
  }, [selectedComponent]) //  这两项在传入的 Props 不变的情况下永远不会改变，由此 useEffect 变成了 ComponentDidMount 模式

  //组件的UI设置
  return (
    <div style={{ padding: 10 }}>
      {Object.entries(selectedComponent.reactProps).map(
        ([name, properties]) => (
          <List key={name} title={name}>
            {properties.map(propInfo => (
              <List.Item
                key={propInfo.name}
                style={{
                  background: widgetBackground[propInfo.name],
                  display: 'flex',
                  marginBottom: 16
                }}
              >
                <div style={{ width: 180 }}>
                  <Tooltip title={propInfo.description}>
                    {propInfo.name}
                  </Tooltip>
                </div>
                <div>
                  <Widget
                    activeValue={widgetSettings[propInfo.name]}
                    availableType={propInfo.type}
                    defaultValue={propInfo.default}
                    onChange={value => setValue(value, propInfo)}
                  />
                </div>
              </List.Item>
            ))}
          </List>
        )
      )}
    </div>
  )
}

const Widget = ({
  activeValue,
  defaultValue,

  availableType,

  onChange
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

  function getWidgetValue(widgetType) {
    switch (widgetType) {
      case 'boolean':
        return typeof activeValue === 'boolean' ? activeValue : defaultValue
      case 'number':
        return activeValue || defaultValue || 0
      case 'string':
        return activeValue || defaultValue
      case 'enum':
        return activeValue || defaultValue
      case 'function':
        return availableType
      case 'object':
        return {
          activeValue: Object(activeValue),
          defaultValue: defaultValue || {}
        }
      default:
        throw new Error('no this widget type')
    }
  }

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
    onChange(value)
  }

  // ------------所有的可用控件------------
  const widgets = {
    boolean() {
      return (
        <Switch
          checked={getWidgetValue('boolean')}
          onChange={checked => onChange(checked)}
        />
      )
    },
    number() {
      return (
        <div>
          <InputNumber
            value={getWidgetValue('number')}
            onChange={num => onChange(num)}
          />
          <Slider
            value={getWidgetValue('number')}
            onChange={num => onChange(num)}
          />
        </div>
      )
    },
    string() {
      return (
        <Input
          value={getWidgetValue('string')}
          onChange={e => {
            onChange(e.target.value)
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
            onClick={() => onChange(undefined)}
          >
            (reset)
          </Button>
          <Radio.Group
            buttonStyle="solid"
            onChange={e => onChange(e.target.value)}
            value={getWidgetValue('enum')}
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
                    activeValue={getWidgetValue('object').activeValue[key]}
                    availableType={valueType}
                    defaultValue={getWidgetValue('object').defaultValue[key]}
                    isObjectChild
                    onChange={value => {
                      onChange({ ...activeValue, [key]: value })
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
      return <span>{getWidgetValue('function')}</span> // 何必管这么多呢？直接原封不动返回就是
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
                  onChange={value => {
                    setValueByRadioType(value, widgetType)
                  }}
                />
              </Radio>
            )
          })}
        </Radio.Group>
      )
    }
  }

  // 第一次渲染的何种控件，中途不可能变成另一种控件，故这样优化。
  // 可以使 RadioGroup 变换操作控件(o゜▽゜)o☆
  const widgetType = React.useMemo(
    () => getWidgetTypeByTypeString(availableType),
    [availableType]
  )
  return widgets[widgetType] ? widgets[widgetType]() : null
}
