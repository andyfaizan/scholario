// Constants

export const ADD_MATERIAL = 'ADD_MATERIAL'
export const ADD_CHILD_MATERIAL = 'ADD_CHILD_MATERIAL'
export const DELETE_MATERIAL = 'DELETE_MATERIAL'
export const DELETE_CHILD_MATERIAL = 'DELETE_CHILD_MATERIAL'
export const EDIT_MATERIAL = 'EDIT_MATERIAL'
export const OPEN_MATERIAL = 'OPEN_MATERIAL'

// Action Creators
let nextMaterialId = 0
export function add_material (material) {
  return {
    type: ADD_MATERIAL,
    nodeId: nextMaterialId++,
    material
  }
}

export function add_child_material (material, nodeId, childId) {
  return {
    type: ADD_CHILD_MATERIAL,
    nodeId,
    childId,
    material
  }
}

export function delete_material (nodeId) {
  return {
    type: DELETE_MATERIAL,
    nodeId
  }
}

export function delete_child_material (nodeId, childId) {
  return {
    type: DELETE_MATERIAL,
    nodeId,
    childId
  }
}

export function edit_material (nodeId, material) {
  return {
    type: EDIT_MATERIAL,
    nodeId,
    material
  }
}

export function open_material (nodeId) {
  return {
    type: OPEN_MATERIAL,
    nodeId
  }
}

export const actions = {
  add_material,
  delete_material,
  edit_material,
  open_material,
  add_child_material,
  delete_child_material
 }

// Reducer
export const initialState = {
  0: {
      id: 0,
      name: 'Root',
      subtext: 'Some subtext',
      fileType: '',
      childIds: [1]
    },
  1: {
      id: 1,
      name: 'Child',
      subtext: 'Child subtext',
      fileType: '',
      childIds: [2]
    },
  2: {
      id: 2,
      name: 'Nested Child',
      subtext: 'Nested Child subtext',
      fileType: 'pdf',
      childIds: []
    }
}

function childIds(state, action) {
  switch (action.type) {
    case ADD_CHILD_MATERIAL:
      return [ ...state, action.childId ]
    case DELETE_CHILD_MATERIAL:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

function node(state, action) {
  switch (action.type) {
    case ADD_MATERIAL:
      return {
        id: action.nodeId,
        name: action.material.name,
        subtext: action.material.subtext,
        fileType: action.material.fileType,
        childIds: []
      }
    case ADD_CHILD_MATERIAL:
    case DELETE_CHILD_MATERIAL:
      return Object.assign({}, state, {
        childIds: childIds(state.childIds, action)
      })
    default:
      return state
  }
}

// NOTE: No idea what acc is
function getAllDescendantIds(state, nodeId) {
  return state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
}

function deleteMany(state, ids) {
  state = Object.assign({}, state)
  ids.forEach(id => delete state[id])
  return state
}

export default function materialReducer(state = initialState, action) {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_MATERIAL) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return Object.assign({}, state, {
    [nodeId]: node(state[nodeId], action)
  })
}