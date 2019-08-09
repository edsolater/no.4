import ComponentModel from './models/ComponentModel'

/** @returns {object} */
export const getCurrentProps = (store = {}) => store.currentProps || {}

/** @returns {object} */
const getComponentCollection = (store = {}) => store.componentCollection || {}

/** @returns {Array} */
export const getAllComponents = (store = {}) =>
  getComponentCollection(store).all || []

/** @returns {ComponentModel} */
export const getCurrentSelection = (store = {}) => {
  const currentSelectionName =
    getComponentCollection(store).currentName || 'button'
  return (
    getAllComponents(store).find(
      componentInfo => componentInfo.name === currentSelectionName
    ) || new ComponentModel()
  )
}

/** @returns {Array} */
export const getRelatedComponents = (store = {}) => {
  const currentCategory = getCurrentSelection(store).category
  return (
    getAllComponents(store).filter(
      ({ category }) => category === currentCategory
    ) || []
  )
}
