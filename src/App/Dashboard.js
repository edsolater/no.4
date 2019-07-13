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
  // 想在控件中保存 state，必须得小心改变 dashboardSetting值所引起的强制刷新。
  // 猜测不能 setProperty 每次都上传一个完整的配置对象，这是强制刷新所有控件的原因。但没必要现在修正这个问题
  function DataWidget({ record }) {
    const widgetValue = dashboardSetting[record.property]
    const patterns = [
      // boolean
      {
        pattern: /^boolean$/,
        render() {
          return (
            <Switch
              checked={widgetValue}
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
                value={widgetValue}
                onChange={number => setProperty(record.property, number)}
              />
              <InputNumber
                value={
                  widgetValue ||
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
              value={widgetValue}
              onChange={e => setProperty(record.property, e.target.value)}
            />
          )
        }
      },
      // enum的可选值（有 '' 包裹）
      {
        pattern: /^'\w+'$/,
        render() {
          return record.type.replace(/'/g, '')
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
          return (
            <Radio.Group
              value={typeof widgetValue}
              // onChange={1. Radio.Group 的 value 变成选中的Radio的value; 2. 强制setPropty一下 Radio 内部控件的值}
            >
              {types.map((type, idx) => (
                <Radio
                  key={idx}
                  style={{ display: 'block' }}
                  value={type} // 因为 Radio.Group 启用了 Value， 所以单个 Radio 是否被选中，必须由 value 判断
                >
                  {DataWidget({ record: { ...record, type: type } })}
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
                render: record => DataWidget({ record }) // 如果这里写成组件的形式，则会出现 <Input> 一次只能输入一个字符的情况。解耦不完全？实验下来还是强制刷新的问题
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
