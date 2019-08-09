import ComponentModel from './models/ComponentModel'
export const settedProps_set = (key, value) => ({
  type: 'settedProps_set',
  key,
  value
})
export const settedProps_delete = key => ({
  type: 'settedProps_delete',
  key
})
export const settedProps_cover = all => ({
  type: 'settedProps_cover',
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
      type: 'componentCollection_setCurrent',
      name: payload
    }
  } else if (typeof payload === 'object' && payload instanceof ComponentModel) {
    return {
      type: 'componentCollection_setCurrent',
      name: payload.name
    }
  } else {
    return {}
  }
}
