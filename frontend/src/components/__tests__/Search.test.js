import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../utils/store/store'
import { StaticRouter } from 'react-router-dom/server'
import Body from '../Body'

test('checking for search is integarted or not ', () => {
    const search = render(
        <StaticRouter>
            <Provider store={store}>
                <Body />
            </Provider>
        </StaticRouter>
    )
    
    const searchfn = search.getByTestId("search")
    console.log(searchfn)
})