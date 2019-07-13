import React from 'react'
import {
  Table,
  Card,
  Tooltip,
  Switch,
  Input,
  Slider,
  InputNumber
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
    if(selectedComponent.preset) set(selectedComponent.preset[0])
  }, [set, selectedComponent]) //  这两项在传入的 Props 不变的情况下永远不变

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
                render(record){
                  if (/^boolean$/.test(record.type)) {
                    return (
                      <Switch
                        defaultChecked={record.default}
                        value={dashboardSetting[record.property]}
                        onChange={checked =>
                          setProperty(record.property, checked)
                        }
                      />
                    )
                  }
                  if (/^number$/.test(record.type)) {
                    return (
                      <>
                        <Slider
                          defaultValue={record.default}
                          value={dashboardSetting[record.property]}
                          onChange={number =>
                            setProperty(record.property, number)
                          }
                        />
                        <InputNumber
                          value={
                            dashboardSetting[record.property] || record.default
                          }
                          onChange={number =>
                            setProperty(record.property, number)
                          }
                        />
                      </>
                    )
                  }
                  if (/^string$/.test(record.type)) {
                    return (
                      <Input
                        placeholder={record.default}
                        value={dashboardSetting[record.property]}
                        onChange={e =>
                          setProperty(record.property, e.target.value)
                        }
                      />
                    )
                  }
                  if (/^any$/.test(record.type)) {
                    return (
                      <Input
                        placeholder={record.default}
                        value={dashboardSetting[record.property]}
                        onChange={e =>
                          setProperty(record.property, e.target.value)
                        }
                      />
                    )
                  }
                  // if (/Function.*|\(.*?\) ?=> ?.*/.test(record.type)) {
                  //   const [, ...keyWords] = record.type.match(
                  //     /\((?<param1>\w+)(?:, (\w*))?(?:, (\w*))?(?:, (\w*))?\) ?=> ?(\w+)/
                  //   ) // 最多可识别4个参数
                  //   const output = keyWords[keyWords.length - 1]
                  //   const params = keyWords.slice(0, keyWords.length - 1)
                  //   return (
                  //     <>
                  //       <p>
                  //         传入：
                  //         {params.map((param, idx) => (
                  //           <span
                  //             key={param || idx}
                  //             style={{ marginRight: 10 }}
                  //           >
                  //             {param}
                  //           </span>
                  //         ))}
                  //       </p>
                  //       <p>
                  //         返回：
                  //         <span>{output}</span>
                  //       </p>
                  //     </>
                  //   )
                  // }
                }
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

// 显示组件的预期效果与代码示例
// function Example({ examples }) {
//   return (
//     <>
//       {examples.map(api => (
//         <Table
//           key={api.title}
//           rowKey="property" //每一行数据的 rowKey 即使该对象的 property 属性
//           title={() => <p>{api.title}</p>}
//           columns={[
//             { title: 'Property', dataIndex: 'property' },
//             { title: '说明', dataIndex: 'description' },
//             { title: '值类型', dataIndex: 'type' },
//             { title: '默认值', dataIndex: 'default' }
//           ]}
//           dataSource={api.data}
//           pagination={false}
//         />
//       ))}
//     </>
//   )
// }
