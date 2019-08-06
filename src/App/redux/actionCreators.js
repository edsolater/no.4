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
export const componentCollection_setCurrentByName = name => {
  return {
    type: 'componentCollection_setCurrentByName',
    name
  }
}
