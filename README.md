# 任务：(✨—— 新 Feature；🐞—— bug；🎈—— 持久战)

- ✨ 创造预览视窗

- ✨ 要有能展示当前已调制 API 集合的面板

- ✨ 应用能自由切换 dark/light mode

* ✨ 制作 List 组件

* ✨ 制作 Dashboard 组件
  不妨引入生物学分类的方法，使 Dashboard 作为 List 的一种变种

* 🐞💥 Dashboard 中有返回组件的函数，是它成为能保存 state 的单独组件，但组件得能自然地过渡状态而不是被强制刷新覆盖。

* 🎈 完善每个组件的配置 API `长期`

# 成就

- 每个基本控件旁都增设 reset Button
  因为有 RadioGroup， 意外地困难

- 引入 lodash 的 isEqualWith 解决比较 object literal 的问题

- ✨ 把 reducer 仓库的操作逻辑，与数值的判断逻辑分开

- ✨ 一键删除冗余配置（即，与默认设置相同的设置）
  在 Widget 组件上设定了两个 Reducer 自带特性。

- ✨ 控件的值与默认不同时，特殊展示，就是默认值的不显示展示状态
  通过在 Widget 组件内设定了两个 Reducer 以实现此特性。

- ✨ 如果 widget 的新值与默认值相同，则附上 Undefined

- ✨ RadioGroup 的 value 改为 widget 内的值的名称

- ✨ 完善 RadioGroup 的逻辑（RadioGroup 的父组件，能保存 RadioGroup 的状态）

- 🐞💥 改变 Widget 的 props 设置，使 Widget 的责任更清晰、更独立 `中等`

- Dashboard 的 PropWidget 变成了一个组件，并且改变了判断使用何种控件的逻辑

- 🔬 重写组件的配置文件（目前只关心 button.js ）

- 🔬 设定规则地渲染带名称的子组件

- ✨ 把组件图标颜色的设定，单独提出到 style.js 中 `简单`

- ✨ 应用的标题栏的背景颜色随组件图标的主题色改变 `简单`
  既然控件的颜色是依照控件所属的类别决定的，那不妨在 Header 中内置一套组件种类转颜色的逻辑约定。

- ✨ 图标的颜色能 JavaScript 设定`简单`

- ✨ 给组件附上 tags `简单`

（除了以上的，过往不究）
