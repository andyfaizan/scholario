// Constants

export const ADD_MATERIAL = 'ADD_MATERIAL'
export const DELETE_MATERIAL = 'DELETE_MATERIAL'
export const EDIT_MATERIAL = 'EDIT_MATERIAL'
export const OPEN_MATERIAL = 'OPEN_MATERIAL'

// Action Creators
let nextMaterialId = 0
export function add_material (material) {
  return {
    type: ADD_MATERIAL,
    id: nextMaterialId++,
    material
  }
}

export function delete_material (id) {
  return {
    type: DELETE_MATERIAL,
    id
  }
}

export function edit_material (id, material) {
  return {
    type: EDIT_MATERIAL,
    id,
    material
  }
}

export function open_material (id) {
  return {
    type: OPEN_MATERIAL,
    id
  }
}

export const actions = {
  add_material,
  delete_material,
  edit_material,
  open_material
 }

// Reducer
export const initialState = {
  name: null,
  content: null
  //fileType: null
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_MATERIAL':
      return {
        id: action.id,
        name: action.material.name,
        content: action.material.content
      }
    case 'EDIT_MATERIAL':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        material: state.material
      })
    case 'DELETE_MATERIAL':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        material: null
      })
    default:
      return state
  }
}

export default function materialReducer (state = [], action) {
  switch (action.type) {
    case 'ADD_MATERIAL':
      return [
        ...state,
        reducer(undefined, action)
      ]
    case 'EDIT_MATERIAL':
      return state.map(m =>
        reducer(m, action)
      )
    case 'DELETE_MATERIAL':
      return state.map(m =>
        reducer(m, action)
      )
    default:
      return state
  }
}
