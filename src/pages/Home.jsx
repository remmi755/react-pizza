import React, { useEffect, useState } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    })

    useEffect(() => {
        setIsLoading(true)
        fetch(
            `https://636be6427f47ef51e13d6ea3.mockapi.io/items?category=${
                categoryId > 0 ? `${categoryId}` : ''
            }&sortBy=${sortType.sortProperty}&order=desc`
        )
            .then((res) => {
                return res.json()
            })
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(i) => setCategoryId(i)}
                />
                <Sort
                    sortValue={sortType}
                    onChangeSort={(i) => setSortType(i)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((obj, index) => (
                          <PizzaBlock key={index} {...obj} />
                      ))}
            </div>
        </div>
    )
}

export default Home
