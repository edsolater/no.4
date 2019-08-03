import { groupBy } from 'lodash'
import { toFlatArray } from './_toFlayArray'
import { getTagName } from './getTagName'

/**
 *
 * @param {JSX.Element[]} children
 * @returns {Object}
 */
export function groupByTag(children) {
  const flatChildren = toFlatArray(children)
  return groupBy(flatChildren, node => getTagName(node))
}
