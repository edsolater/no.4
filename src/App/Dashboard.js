import React from 'react'
import {
  Table,
  Card,
  Tooltip,
  Switch,
  Input,
  Slider,
  InputNumber,
  Radio,
  Button
} from 'antd/es'
import { List } from './components/List'

export default function Dashboard({ selectedComponent }) {
  // 组件的API文档可能是一个数组，也可能是一个对象（数组只有一项时的简写）
  // 如果是对象就包一层数组的壳
  const api = Array.isArray(selectedComponent.api)
    ? selectedComponent.api
    : [selectedComponent.api]

  // [useState]: Preview的配置
  const [dashboardSetting, set] = React.useState({})
  const setProperty = (property, value) => {
    set({ ...dashboardSetting, [property]: value })
  }

  // [useEffect]: 最初先加载一次默认样式
  React.useEffect(() => {
    if (selectedComponent.preset) set(selectedComponent.preset[0])
  }, [set, selectedComponent]) //  这两项在传入的 Props 不变的情况下永远不会改变，由此 useEffect 变成了 ComponentDidMount 模式

  // 控件
  // TODO:
  // 想在控件中保存 state，必须得小心改变 dashboardSetting对象 所引起的强制刷新。
  // 猜测不能 setProperty 每次都上传一个完整的配置对象，这是强制刷新所有控件的原因。但没必要现在修正这个问题
  // TOFIX: 内部逻辑混乱
  function DataWidget({
    parentSetting = dashboardSetting,
    record,
    setValue = value => {}
  }) {
    record = Object(record)
    const recordValue = parentSetting[record.property]
    const patterns = [
      // boolean 控件
      {
        pattern: /^boolean$/,
        render() {
          return (
            <Switch
              checked={Boolean(recordValue)}
              onChange={checked => {
                setValue(checked)
              }}
            />
          )
        }
      },
      // number 控件
      {
        pattern: /^number$/,
        render() {
          return (
            <div>
              <InputNumber
                value={
                  (typeof recordValue === 'number' ? recordValue : undefined) ||
                  (typeof record.default === 'number'
                    ? record.default
                    : undefined)
                }
                onChange={number => setValue(number)}
              />
              <Slider
                defaultValue={
                  typeof record.default === 'number' ? record.default : 0
                }
                value={recordValue}
                onChange={number => setValue(number)}
              />
            </div>
          )
        }
      },
      // string / any 控件
      {
        pattern: /^string.*$|^any$/,
        render() {
          return (
            <Input
              placeholder={
                typeof record.default === 'string' ? record.default : undefined
              }
              value={recordValue}
              onChange={e => setValue(e.target.value)}
            />
          )
        }
      },
      // Enum （规定字符串形式的可选值）
      {
        pattern: /^\[.*\|.*\]$/,
        render() {
          const [, matched] = record.type.match(/^\[(.*)\]$/)
          const enumStrings = matched
            .trim()
            .split('|')
            .map(str => str.trim().replace(/'|"/g, ''))
          return (
            <div>
              <Button
                style={{ marginRight: 20 }}
                onClick={() => setProperty(record.property, undefined)}
              >
                unset
              </Button>
              <Radio.Group
                buttonStyle="solid"
                onChange={e => setProperty(record.property, e.target.value)}
                value={recordValue || record.default}
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
      // Object 递归控件
      {
        pattern: /^{.*}$/,
        render() {
          const [, matched] = record.type.match(/^{(.*)}$/)
          const entries = matched
            .trim()
            .split(', ')
            .map(entry => entry.split(': '))
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
                    {DataWidget({
                      record: { property: key, type: valueType },
                      setValue: value => {
                        setValue({ ...recordValue, [key]: value })
                      },
                      parentSetting: recordValue || {},
                      hasParent: true
                    })}
                  </div>
                ))}
              </div>
              {'}'}
            </div>
          )
        }
      },
      // function 控件
      {
        pattern: /^\(.*?\) => .*$/,
        render() {
          return <span>{record.type}</span> // 何必管这么多呢？直接原封不动返回就是
        }
      },

      // 类型中有 “ | ” 的情况  递归控件
      // 目前的切换逻辑只能用于标准值，这个bug不能现在整体还不成熟时解决
      {
        pattern: /.* \| .*/,
        render() {
          const types = record.type.split(' | ') // TODO:  增加对 object、Function、enum 值类型的判断。但这要使render成为组件，并能拥有状态再去解决，也就是要解决强制刷新问题。现在先把问题放一放。
          const changeValueByType = (recordValue, typeStr) => {
            if (/boolean/.test(typeStr)) return Boolean(recordValue)
            if (/number/.test(typeStr)) return Number(recordValue)
            if (/Object|^{.*}$/) return typeStr
            return String(typeStr.replace(/'/g, '')) // 如果是类似 'fill' 'outline' 这种形式一概算作string，并且把两头的 '' 去除
          }
          return (
            <Radio.Group
              // TODO: 问题的原因：value永远是 typeof 返回的几个值
              value={typeof recordValue}
              //value //为了与 Radio的 value匹配的，手动设定 checked 的话，就没必要了
              // onChange={1. Radio.Group 的 value 变成选中的Radio的value; 2. 强制setPropty一下 Radio 内部控件的值}
              onChange={e => {
                setProperty(
                  record.property,
                  changeValueByType(recordValue, e.target.value)
                ) // 例： eval(toPascalCase('boolean'))('asd') = true
              }}
            >
              {types.map((type, idx) => (
                <Radio
                  key={idx}
                  style={{ display: 'block', marginBottom: 8 }}
                  value={type} // 如果 Radio.Group 启用了 Value， 所以单个 Radio 是否被选中，必须由 value 判断 // value 设定为不同值才能使互斥的
                >
                  {DataWidget({
                    record: { ...record, type: type },
                    setValue: setValue
                  })}
                </Radio>
              ))}
            </Radio.Group>
          )
        }
      }
    ]
    let matchedObj
    return (
      ((matchedObj = patterns.find(({ pattern }) =>
        pattern.test(record.type)
      )) &&
        matchedObj.render &&
        matchedObj.render()) ||
      null
    )
  }
  //组件的UI设置
  return (
    <div style={{ padding: 10 }}>
      {api.map((table, idx) => (
        <List key={idx}>
          <List.Title>{table.title}</List.Title>
          {table.data.map(({ property }, idx) => (
            <List.Item key={idx}>{property}</List.Item>
          ))}
        </List>
      ))}
      <Card title={selectedComponent.name}>
        <selectedComponent.Preview {...dashboardSetting} />
        {api.map(table => (
          // Dashboard中的控件们
          <Table
            key={table.title || 'no title'}
            rowKey="property" // 使用每行(record)的 property 属性
            title={() => <p>{table.title}</p>}
            columns={[
              {
                title: 'Property',
                dataIndex: 'property',
                render: (text, record) => (
                  <Tooltip title={record.description}>
                    <span>{text}</span>
                  </Tooltip>
                )
              },
              {
                title: '控件',
                key: '控件',
                render: record =>
                  DataWidget({
                    record,
                    setValue: value => setProperty(record.property, value)
                  }) // TOFIX: 如果这里写成组件的形式，则会出现 <Input> 一次只能输入一个字符的情况。
                // 猜测1：是Table的内部机制会强制刷新所有cell，于是新组件强行覆盖了原来位置的组件。
                // 猜测2：因为直接用props，一旦props改变会刷新组件，于是重新绘制了组件的组件而没有transition。要么把组件树维持在只更新一层（useState传入对象是危险的行为，因为任何改变都会全部刷新），要么用state规避问题，要么用useMemo阻止刷新
                // 返回的是组件，自身却不被React记录在案（不用<>激活，React感知不到），于是就不能用state了，这是无法忍受的。
                // Table机制不适合 Dashboard。因此必须要实现自己的 dashboard 组件。现在暂且忍耐一下
              }
            ]}
            dataSource={table.data}
            pagination={false}
          />
        ))}
      </Card>
    </div>
  )
}
