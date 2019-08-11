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
  // const [is]

  //#region ------------RadioGroup控件们的状态------------
  // 自己配置babel、webpack后把这些特化的逻辑放到对应的组件配置中，
  // 或者单独把各个控件提取为单独的组件。现在为了开发速度还不需要
  const [activeRadioType, changeSelectedRadioType] = React.useState(
    getWidgetTypeByValue(activeValue || defaultValue)
  ) // 根据默认值类型自动判断默认选择项
  const [radioGroupValues, setRadioGroupValues] = React.useState({}) // 用于保存 Radio 的状态值
  function setValue({ key, value }) {
    setRadioGroupValues({ ...radioGroupValues, [key]: value })
    onChange(value)
  }

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
  //#endregion

  // ------------所有的可用控件------------
  const widgets = {
    boolean() {
      return (
        <StateWidget_boolean
          value={getWidgeValue('boolean') || false}
          onChange={checked => onChange(checked)}
        />
      )
    },
    number() {
      return (
        <StateWidget_number
          value={getWidgeValue('number') || 0}
          onChange={num => onChange(num)}
        />
      )
    },
    string() {
      return (
        <StateWidget_string
          value={getWidgeValue('string') || ''}
          onChange={string => {
            onChange(string)
          }}
        />
      )
    },
    enum() {
      const enumStrings = originalType
        .trim()
        .split('|')
        .map(str => str.trim().replace(/'|"/g, ''))
      return (
        <StateWidget_enum
          value={getWidgeValue('enum')}
          onChange={selectedValue => onChange(selectedValue)}
          enumStrings={enumStrings}
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
      const originalTypes = originalType.split(/ ?\|(?! ?'| ?")/) //如果有前置判断就报错，是babel的关系？
      function getWidgetDefaultValue(widgetType) {
        return widgetType === getWidgetTypeByValue(defaultValue)
          ? defaultValue
          : undefined
      }
      return (
        <Radio.Group
          value={activeRadioType} // 可用 useMemo 优化
          onChange={({ target: { value: widgetType } }) => {
            setValue({
              key: widgetType,
              value: radioGroupValues[widgetType] // may be undefined
            })
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
                  onChange={radioValue => {
                    setValue({ key: widgetType, value: radioValue })
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
    () => getWidgetTypeByTypeString(originalType.trim()),
    [originalType]
  )
  return widgets[widgetType] ? widgets[widgetType]() : null
}

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
function StateWidget_enum({ value, onChange = () => {}, enumStrings }) {
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
