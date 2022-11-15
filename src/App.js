import React, { useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import './scss/app.scss'

import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, test } from './redux/slices/filterSlice'

export const SearchContext = React.createContext('')



function App() {
    const [searchValue, setSearchValue] = useState('')

    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    return (
        <div className="wrapper">
            <button
                aria-label="Increment value"
                onClick={() => dispatch(test())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    )
}

export default App
