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
                  valueType={propInfo.type}
                  defaultValue={propInfo.default}
                  activeValue={dashboardSetting[propInfo.name]}
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
  valueType,
  defaultValue,
  activeValue,

  isRadioGroupChild = false,

  onChangeValue
}) => {
  //适用于RadioGroup组
  const [selectedRadioIndex, changeRadioIndex] = React.useState(undefined)
  const [activeRadioValue, setRadioValue] = React.useState({})
  function setValueByRadioIndex(value, index) {
    setRadioValue({ ...activeRadioValue, [index]: value })
  }

  //适用于number组
  const defaultSliderNumber =
    typeof defaultValue === 'number' ? defaultValue : 0
  const [sliderNumber, setSliderNumber] = React.useState(
    typeof activeValue === 'number' ? activeValue : 0
  )
  function handleInputNumber(inputNumber) {
    setSliderNumber(inputNumber)
    onChangeValue(inputNumber)
  }

  // 用于判断适用组件
  const regex = {
    boolean: {
      pattern: /^boolean$/,
      widget() {
        return (
          <Switch
            defaultChecked={defaultValue}
            onChange={checked => {
              onChangeValue(checked)
            }}
          />
        )
      }
    },
    number: {
      pattern: /^number$/,
      widget() {
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
      }
    },
    string: {
      pattern: /^string.*$|^any$/,
      widget() {
        return (
          <Input
            defaultValue={
              (typeof defaultValue === 'string' && defaultValue) ||
              activeValue ||
              undefined
            }
            onChange={e => {
              onChangeValue(e.target.value)
            }}
          />
        )
      }
    },
    enum: {
      pattern: /^\[.*\|.*\]$/,
      widget() {
        const [, matched] = valueType.match(/^\[(.*)\]$/)
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
      }
    },
    object: {
      pattern: /^{.*}$/,
      widget() {
        const [, matched] = valueType.match(/^{(.*)}$/)
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
                      defaultValue={defaultValue[key]}
                      valueType={valueType}
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
      }
    },
    function: {
      pattern: /^\(.*?\) => .*$/,
      widget() {
        return <span>{valueType}</span> // 何必管这么多呢？直接原封不动返回就是
      }
    },
    radioGroup: {
      pattern: /.* \| .*/,
      widget() {
        const types = valueType.split(' | ') // TODO:  增加对 object、Function、enum 值类型的判断。但这要使render成为组件，并能拥有状态再去解决，也就是要解决强制刷新问题。现在先把问题放一放。
        const changeValueByType = (activeValue, typeStr) => {
          if (/boolean/.test(typeStr)) return Boolean(activeValue)
          if (/number/.test(typeStr)) return Number(activeValue)
          if (/Object|^{.*}$/) return typeStr
          return String(typeStr.replace(/'/g, '')) // 如果是类似 'fill' 'outline' 这种形式一概算作string，并且把两头的 '' 去除
        }
        return (
          <Radio.Group
            value={selectedRadioIndex}
            //value //为了与 Radio的 value匹配的，手动设定 checked 的话，就没必要了
            // onChange={1. Radio.Group 的 value 变成选中的Radio的value; 2. 强制setPropty一下 Radio 内部控件的值}
            onChange={e => {
              const targetIndex = e.target.value
              changeRadioIndex(targetIndex)
              onChangeValue(changeValueByType(activeValue, targetIndex)) // 例： eval(toPascalCase('boolean'))('asd') = true
            }}
          >
            {types.map((type, idx) => (
              <Radio
                key={idx}
                value={idx} // 如果 Radio.Group 启用了 Value， 所以单个 Radio 是否被选中，必须由 value 判断 // value 设定为不同值才能使互斥的
                style={{ display: 'block', marginBottom: 8 }}
              >
                <Widget
                  activeValue={activeRadioValue[idx]}
                  defaultValue={defaultValue}
                  valueType={type}
                  onChangeValue={value => setValueByRadioIndex(value, idx)}
                />
              </Radio>
            ))}
          </Radio.Group>
        )
      }
    },
    default: {
      pattern: /.*/,
      widget() {
        return null
      }
    }
  }
  return Object.values(regex)
    .find(({ pattern }) => pattern.test(valueType))
    .widget()
}
