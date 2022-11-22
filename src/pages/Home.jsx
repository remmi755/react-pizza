import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, setFilters } from '../redux/slices/filrerSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'


import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { listPopup } from '../components/Sort'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    )
    const items  = useSelector(
        (state) => state.pizza.items
    )


    const { searchValue } = useContext(SearchContext)
    const [isLoading, setIsLoading] = useState(true)

    const getPizzas = async () => {
        setIsLoading(true)
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        try {
            dispatch(fetchPizzas({
                sortBy, order, category, search, currentPage
            }))
        } catch (error) {
            console.log('ERROR', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = listPopup.find(
                (obj) => obj.sortProperty === params.sortProperty
            )

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj, index) => (
        <PizzaBlock key={index} {...obj} />
    ))

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
