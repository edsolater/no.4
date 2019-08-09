import ComponentModel from './models/ComponentModel'
export const componentCollection_settedProps_set = (key, value) => ({
  type: 'componentCollection_settedProps_set',
  key,
  value
})
export const componentCollection_settedProps_delete = key => ({
  type: 'componentCollection_settedProps_delete',
  key
})
export const componentCollection_settedProps_cover = all => ({
  type: 'componentCollection_settedProps_cover',
  all
})
export const componentCollection_all_cover = all => ({
  type: 'componentCollection_all_cover',
  all
})
/**
 *
 * @param {string|ComponentModel} payload
 */
export const componentCollection_currentName_set = payload => {
  if (typeof payload === 'string') {
    return {
      type: 'componentCollection_currentName_set',
      name: payload
    }
  } else if (typeof payload === 'object' && payload instanceof ComponentModel) {
    return {
      type: 'componentCollection_currentName_set',
      name: payload.name
    }
  } else {
    return {}
  }
}
