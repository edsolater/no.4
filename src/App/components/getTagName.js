/**
 * 提取组件标签所代表的函数的 name
 * pure
 * @param {Array|Object} reactNodes
 * @param {string[]} groupNames
 * @returns {Object}
 *
 */
export function getTagName(reactNode) {
  const tag = reactNode.type
  if (typeof tag === 'undefined') return 'text'
  if (typeof tag === 'function') return tag.name
  if (typeof tag === 'object') {
    const innerTag = tag.target
    if (typeof innerTag === 'function') return innerTag.name
  }
  return 'unknown'
}
