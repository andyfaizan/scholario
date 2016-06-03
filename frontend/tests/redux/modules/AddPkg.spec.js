import reducer, { initialState } from 'redux/modules/AddPkg'

describe('(Redux) AddPkg', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
