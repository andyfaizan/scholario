import reducer, { initialState } from 'redux/modules/Material'

describe('(Redux) Material', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
