import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store/'
import { HashRouter as Router } from 'react-router-dom'

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={ store }>
      <Router>
        { children }
      </Router>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }