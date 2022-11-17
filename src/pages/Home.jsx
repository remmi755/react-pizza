import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../App'
import { useSelector } from 'react-redux'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'

const Home = () => {
    const categoryId = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sort.sortProperty)

    const { searchValue } = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const sortBy = sortType.replace('-', '')
    const order = sortType.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    useEffect(() => {
        setIsLoading(true)
        fetch(
            `https://636be6427f47ef51e13d6ea3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map((obj, index) => (
        <PizzaBlock key={index} {...obj} />
    ))

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))

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
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home
