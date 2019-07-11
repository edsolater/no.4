### antd 组件

```javascript
const arr = []
const set = new Set()
const res = []

var start = new Date()
for (let index = 0; index < 1000000; index++) {
  arr.push(index)
}
var end = new Date()
console.log(end - start)

var start = new Date()
for (let index = 0; index < 1000000; index++) {
  set.add(index)
}
var end = new Date()
console.log(end - start)

var start = new Date()
arr.forEach(n => res.push(n * n))
var end = new Date()
console.log(end - start)

var start = new Date()
set.forEach(n => res.push(n * n))
var end = new Date()
console.log(end - start)

var start = new Date()
Array.from(set).forEach(n => res.push(n * n))
var end = new Date()
console.log(end - start)
```
