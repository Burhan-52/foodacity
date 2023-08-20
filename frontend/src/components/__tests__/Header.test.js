import { render } from '@testing-library/react'
import Header from '../Header'
import { Provider } from 'react-redux'
import store from '../../utils/store/store'
import {StaticRouter} from 'react-router-dom/server'

test('checking for logo is there or not in header ', () => {
    const header = render(
        <StaticRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </StaticRouter>
    )
    const logo = header.getByTestId("logo")
    expect(logo.src).toBe("http://localhost/dummy.png")

    
    console.log(header)
})

test('checking for cart is intially is 0 ', () => {
    const header = render(
        <StaticRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </StaticRouter>
    )
    const cart = header.getByTestId("cart")
    expect(cart.innerHTML).toBe("Cart 0")

    console.log(header)
})

test('checking for Login is there or not', () => {
    const header = render(
        <StaticRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </StaticRouter>
    )
    const login = header.getByTestId("login")
    expect(login.innerHTML).toBe("Login")

    console.log(header)
})