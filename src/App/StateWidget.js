import React from 'react'
import { Switch, Input, Slider, InputNumber, Radio } from 'antd/es'

/**
 * 逻辑组件
 * 只是分析数据，不做UI显示
 * 选择应该使用的value与其widget
 */
export function StateWidgetSeletor({
  activeValue,
  defaultValue,
  originalType,

  onChange = () => {}
}) {
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

  const widgetType = React.useMemo(
    () => getWidgetTypeByTypeString(originalType.trim()),
    [originalType]
  )
  switch (widgetType) {
    case 'boolean': {
      return (
        <StateWidget_Boolean
          activeValue={getWidgeValue('boolean') || false}
          onChange={onChange}
        />
      )
    }
    case 'number': {
      return (
        <StateWidget_Number
          activeValue={getWidgeValue('number') || 0}
          onChange={onChange}
        />
      )
    }
    case 'string': {
      return (
        <StateWidget_String
          activeValue={getWidgeValue('string') || ''}
          onChange={onChange}
        />
      )
    }
    case 'enum': {
      return (
        <StateWidget_Enum
          activeValue={getWidgeValue('enum')}
          onChange={onChange}
          originalType={originalType}
        />
      )
    }
    case 'function': {
      return <StateWidget_Function activeValue={originalType} />
    }
    case 'object': {
      return (
        <StateWidget_Object
          activeValue={getWidgeValue('object') || {}}
          onChange={onChange}
          originalType={originalType}
        />
      )
    }
    case 'radioGroup': {
      return (
        <StateWidget_RadioGroup
          activeValue={activeValue}
          defaultValue={defaultValue}
          onChange={onChange}
          originalType={originalType}
        />
      )
    }
    default: {
      return null
    }
  }
}

/**
 * 以下均为UI控件（StateWidget的）
 */
function StateWidget_String({ activeValue, onChange = () => {} }) {
  return (
    <Input
      value={activeValue}
      onChange={e => {
        onChange(e.target.value)
      }}
    />
  )
}

function StateWidget_Boolean({ activeValue, onChange = () => {} }) {
  return (
    <Switch
      checked={activeValue}
      onChange={checked => {
        onChange(checked)
      }}
    />
  )
}

function StateWidget_Number({ activeValue, onChange = () => {} }) {
  return (
    <div>
      <InputNumber value={activeValue} onChange={num => onChange(num)} />
      <Slider defaultValue={activeValue} onAfterChange={num => onChange(num)} />
    </div>
  )
}

function StateWidget_Enum({ activeValue, onChange = () => {}, originalType }) {
  const enumStrings = originalType
    .trim()
    .split('|')
    .map(str => str.trim().replace(/'|"/g, ''))
  return (
    <Radio.Group
      buttonStyle='solid'
      value={activeValue}
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

function StateWidget_Function({ activeValue }) {
  return <span>{activeValue}</span>
}

function StateWidget_RadioGroup({
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

function StateWidget_Object({
  activeValue,
  originalType,
  onChange = () => {}
}) {
  const entries = Object.entries(
    JSON.parse(originalType.replace(/\w+/g, word => `"${word}"`))
  )
  return (
    <div>
      {'{'}
      <div style={{ marginLeft: 32 }}>
        {entries.map(([key, valueType]) => (
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
              activeValue={activeValue[key] || {}}
              originalType={JSON.stringify(valueType).replace(/"/g, '')}
              onChange={value => {
                onChange({ ...activeValue, [key]: value })
              }}
            />
          </div>
        ))}
      </div>
      {'}'}
    </div>
  )
}
