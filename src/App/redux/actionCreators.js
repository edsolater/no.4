import ComponentModel from './models/ComponentModel'
export const currentProps_set = (key, value) => ({
  type: 'currentProps_set',
  key,
  value
})
export const currentProps_delete = key => ({
  type: 'currentProps_delete',
  key
})
export const currentProps_cover = all => ({
  type: 'currentProps_cover',
  all
})
export const componentCollection_cover = all => ({
  type: 'componentCollection_cover',
  all
})
/**
 *
 * @param {string|ComponentModel} payload
 */
export const componentCollection_setCurrent = payload => {
  if (typeof payload === 'string') {
    return {
      type: 'componentCollection_setCurrent_string',
      name: payload
    }
  } else if (typeof payload === 'object' && payload instanceof ComponentModel) {
    return {
      type: 'componentCollection_setCurrent_object',
      componentInfo: payload
    }
  } else {
    return {}
  }
}
