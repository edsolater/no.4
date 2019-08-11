import React from 'react'
import { Switch, Input, Slider, InputNumber, Radio } from 'antd/es'

/**
 * 逻辑组件
 * 只是分析数据，不做UI显示
 * 选择应该使用的value与其widget
 * @param {object} props
 * @param {any} props.activeValue
 * @param {any} props.defaultValue
 * @param {string} props.originalType
 * @param {Function} [props.onChange]
 * @returns
 */
export function StateWidgetSeletor({
  activeValue,
  defaultValue,
  originalType,

  onChange = () => {}
}) {
  // TODO: 可以提取这三个算法的共性，以优化
  function getWidgetTypeByTypeString(originalType) {
    if (/^boolean$|^string$|^number$/.test(originalType)) {
      return originalType
    } else {
      if (/^\(.*?\) => .*$/.test(originalType)) return 'function'
      if (/^{.*}$/.test(originalType)) return 'object'
      if (/^ ?['"]\w+['"] ?(?:\| ?['"]\w+['"] ?)*$/.test(originalType))
        return 'enum'
      if (/^.*\|.*$/.test(originalType)) return 'radioGroup'
      if (/.*/.test(originalType)) return 'string'
    }
    throw new Error(`can't get widgetType by typeString, set: ${originalType}`)
  }
  function getWidgetTypeByValue(value) {
    // 不可能有 RadioGroup
    if (typeof value === 'string') {
      if (originalType.match(value)) {
        console.log('hello')
        return 'enum'
      }
    } // 自定义的模式
    return typeof value
  }
  function getWidgeValue(widgetType) {
    return (
      (getWidgetTypeByValue(activeValue) === widgetType && activeValue) ||
      (getWidgetTypeByValue(defaultValue) === widgetType && defaultValue)
    )
  }

  const widgets = {
    boolean() {
      return (
        <StateWidget_boolean
          value={getWidgeValue('boolean') || false}
          onChange={onChange}
        />
      )
    },
    number() {
      return (
        <StateWidget_number
          value={getWidgeValue('number') || 0}
          onChange={onChange}
        />
      )
    },
    string() {
      return (
        <StateWidget_string
          value={getWidgeValue('string') || ''}
          onChange={onChange}
        />
      )
    },
    enum() {
      return (
        <StateWidget_enum
          value={getWidgeValue('enum')}
          onChange={onChange}
          originalType={originalType}
        />
      )
    },
    function() {
      return <StateWidget_function value={originalType} />
    },
    object() {
      const [, matched] = originalType.trim().match(/^{(.*)}$/)
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
                  <StateWidgetSeletor
                    activeValue={(getWidgeValue('object') || {})[key]}
                    originalType={valueType}
                    // defaultValue={getSettedWidgeValue('object').defaultValue[key]}
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

    radioGroup() {
      return (
        <StateWidget_radioGroup
          activeValue={activeValue}
          defaultValue={defaultValue}
          onChange={onChange}
          originalType={originalType}
        />
      )
    }
  }

  // 第一次渲染的何种控件，中途不可能变成另一种控件，故这样优化。
  // 可以使 RadioGroup 变换操作控件(o゜▽゜)o☆
  const widgetType = React.useMemo(
    () => getWidgetTypeByTypeString(originalType.trim()),
    [originalType]
  )
  return widgets[widgetType] ? widgets[widgetType]() : null
}

/**
 * 以下均为UI控件（StateWidget的）
 */
function StateWidget_string({ value, onChange = () => {} }) {
  return (
    <Input
      value={value}
      onChange={e => {
        onChange(e.target.value)
      }}
    />
  )
}

function StateWidget_boolean({ value, onChange = () => {} }) {
  return (
    <Switch
      checked={value}
      onChange={checked => {
        onChange(checked)
      }}
    />
  )
}
function StateWidget_number({ value, onChange = () => {} }) {
  return (
    <div>
      <InputNumber value={value} onChange={num => onChange(num)} />
      <Slider defaultValue={value} onAfterChange={num => onChange(num)} />
    </div>
  )
}
function StateWidget_enum({ value, onChange = () => {}, originalType }) {
  const enumStrings = originalType
    .trim()
    .split('|')
    .map(str => str.trim().replace(/'|"/g, ''))
  return (
    <Radio.Group
      buttonStyle='solid'
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {enumStrings.map(str => (
        <Radio.Button key={str} value={str}>
          {str}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}
function StateWidget_function({ value }) {
  return <span>{value}</span>
}
function StateWidget_radioGroup({
  activeValue,
  defaultValue,
  originalType,
  onChange = () => {}
}) {
  const originalTypes = originalType.split(/ ?\|(?! ?'| ?")/)
  function getWidgetTypeByTypeString(originalType) {
    if (/^boolean$|^string$|^number$/.test(originalType)) {
      return originalType
    } else {
      if (/^\(.*?\) => .*$/.test(originalType)) return 'function'
      if (/^{.*}$/.test(originalType)) return 'object'
      if (/^ ?['"]\w+['"] ?(?:\| ?['"]\w+['"] ?)*$/.test(originalType))
        return 'enum'
      if (/^.*\|.*$/.test(originalType)) return 'radioGroup'
      if (/.*/.test(originalType)) return 'string'
    }
    throw new Error(`can't get widgetType by typeString, set: ${originalType}`)
  }
  function getWidgetTypeByValue(value) {
    // 不可能有 RadioGroup
    if (typeof value === 'string') {
      if (originalType.match(value)) {
        console.log('hello')
        return 'enum'
      }
    } // 自定义的模式
    return typeof value
  }
  function getWidgetDefaultValue(widgetType) {
    return widgetType === getWidgetTypeByValue(defaultValue)
      ? defaultValue
      : undefined
  }
  const [activeRadioType, changeSelectedRadioType] = React.useState(
    getWidgetTypeByValue(activeValue || defaultValue)
  ) // 根据默认值类型自动判断默认选择项
  const [radioGroupValues, setRadioGroupValues] = React.useState({}) // 用于保存 Radio 的状态值
  React.useEffect(() => {
    if (!activeValue) {
      // 如果点了重置，则activeValue===null,则启用以下逻辑
      setRadioGroupValues({})
      changeSelectedRadioType(getWidgetTypeByValue(defaultValue))
    } else {
      // 因preset而传入了新的设定值时
      changeSelectedRadioType(getWidgetTypeByValue(activeValue))
      setRadioGroupValues({
        ...radioGroupValues,
        [getWidgetTypeByValue(activeValue)]: activeValue
      })
    }
  }, [activeValue, defaultValue])

  return (
    <Radio.Group
      value={activeRadioType} // 可用 useMemo 优化
      onChange={({ target: { value: widgetType } }) => {
        onChange(radioGroupValues[widgetType]) // may be undefined
      }}
    >
      {originalTypes.map((originalType, index) => {
        const widgetType = getWidgetTypeByTypeString(originalType.trim())
        console.log('widgetType: ', widgetType)
        return (
          <Radio
            key={index}
            value={widgetType}
            style={{ display: 'block', marginBottom: 8 }}
          >
            <StateWidgetSeletor
              activeValue={radioGroupValues[widgetType]}
              defaultValue={getWidgetDefaultValue(widgetType)}
              originalType={originalType}
              onChange={radioValue => onChange(radioValue)}
            />
          </Radio>
        )
      })}
    </Radio.Group>
  )
}
