import reducer, { initialState } from 'redux/modules/Misc'

describe('(Redux) Misc', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
