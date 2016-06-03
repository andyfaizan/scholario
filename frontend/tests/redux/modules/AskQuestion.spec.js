import reducer, { initialState } from 'redux/modules/AskQuestion'

describe('(Redux) AskQuestion', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
