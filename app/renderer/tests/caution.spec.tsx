import * as React from 'react'
import * as Renderer from 'react-test-renderer'

import Hello from '../pages/hello'

test('page Caution', () => {
  const component = Renderer.create(
    <Hello />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
