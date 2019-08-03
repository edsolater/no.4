/**
 * 提取组件标签所代表的函数的 name
 * pure
 * @param {JSX.Element} reactNode
 * @returns {string}
 */
export function getTagName(reactNode) {
  const tag = reactNode.type
  if (typeof tag === 'undefined') return 'text'
  if (typeof tag === 'function') return tag.name
  if (typeof tag === 'object') {
    const innerTag = tag.target
    if (typeof innerTag === 'function') return innerTag.name
  }
  return 'undefined'
}
