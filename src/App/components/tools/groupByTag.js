import { groupBy } from 'lodash'
import  flatChildren  from './_flatChildren'
import  getTagName  from './_getTagName'

/**
 *
 * @param {JSX.Element[]} children
 * @returns {{}}
 */
export default function groupByTag(children) {
  return groupBy(flatChildren(children), node => getTagName(node))
}
