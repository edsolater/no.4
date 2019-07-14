import React from 'react'
import {
  Table,
  Card,
  Tooltip,
  Switch,
  Input,
  Slider,
  InputNumber,
  Radio
} from 'antd/es'

const toPascalCase = str => {
  return str
    .replace(
      /^\w|[A-Z]|\b\w/g, // 挑选出以各种方式标记出的首字母
      word => word.toUpperCase() // 转换成大写形式
    )
    .replace(/\s+/g, '') // 去除分割符中可能有的所有空格
}

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
  // 内部逻辑混乱
  function DataWidget({ record }) {
    const recordValue = dashboardSetting[record.property]
    const patterns = [
      // boolean
      {
        pattern: /^boolean$/,
        render() {
          return (
            <Switch
              checked={Boolean(recordValue)}
              onChange={checked => {
                setProperty(record.property, checked)
              }}
            />
          )
        }
      },
      // number
      {
        pattern: /^number$/,
        render() {
          return (
            <>
              <Slider
                defaultValue={record.default}
                value={recordValue}
                onChange={number => setProperty(record.property, number)}
              />
              <InputNumber
                value={
                  recordValue ||
                  (record.default === '-' ? undefined : record.default)
                }
                onChange={number => setProperty(record.property, number)}
              />
            </>
          )
        }
      },
      // string / any
      {
        pattern: /^string$|^any$/,
        render() {
          return (
            <Input
              placeholder={
                typeof record.default === 'string' ? record.default : undefined
              }
              value={recordValue}
              onChange={e => setProperty(record.property, e.target.value)}
            />
          )
        }
      },
      // enum的可选值（有 '' 包裹）
      {
        pattern: /^Enum:.*$/,
        render() {
          const [, matched] = record.type.match(/^Enum:(.*)/)
          const enumStrings = matched.trim().split(' | ')
          return (
            <Radio.Group
              buttonStyle="solid"
              onChange={e => setProperty(record.property, e.target.value)}
            >
              {enumStrings.map(str => (
                <Radio.Button key={str} value={str}>
                  {str}
                </Radio.Button>
              ))}
            </Radio.Group>
          )
        }
      },
      // function
      {
        pattern: /^\(.*?\) => .*$/,
        render() {
          return <span>{record.type}</span> // 何必管这么多呢？直接原封不动返回就是
        }
      },

      // 类型中有 “ | ” 的情况
      {
        pattern: /.* \| .*/,
        render() {
          const types = record.type.split(' | ')
          const chooseValueType = (recordValue, typeStr) => {
            if (/boolean/.test(typeStr)) return Boolean(recordValue)
            if (/number/.test(typeStr)) return Number(recordValue)
            if (/Object|^{.*}$/) return typeStr
            return String(typeStr.replace(/'/g, '')) // 如果是类似 'fill' 'outline' 这种形式一概算作string，并且把两头的 '' 去除
          }
          return (
            <Radio.Group
              // TODO: 问题的原因：value永远是 typeof 的值
              value={typeof recordValue}
              //value //为了与 Radio的 value匹配的，手动设定 checked 的话，就没必要了
              // onChange={1. Radio.Group 的 value 变成选中的Radio的value; 2. 强制setPropty一下 Radio 内部控件的值}
              onChange={e => {
                setProperty(
                  record.property,
                  chooseValueType(recordValue, e.target.value)
                ) // 例： eval(toPascalCase('boolean'))('asd') = true
              }}
            >
              {types.map((type, idx) => (
                <Radio
                  key={idx}
                  style={{ display: 'block' }}
                  value={type} // 如果 Radio.Group 启用了 Value， 所以单个 Radio 是否被选中，必须由 value 判断 // value 设定为不同值才能使互斥的
                >
                  {DataWidget({
                    record: { ...record, type: type, isGrouped: true }
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

  // 预览组件 + 设定选项 + 预设置参数
  return (
    <div style={{ padding: 10 }}>
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
                // 这条只是个参考，最终要去除
                title: '值类型',
                dataIndex: 'type'
              },
              {
                title: '控件',
                key: '控件',
                render: record => DataWidget({ record }) // TOFIX: 如果这里写成组件的形式，则会出现 <Input> 一次只能输入一个字符的情况。
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
