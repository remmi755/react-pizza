import React, { useEffect, useState } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = ({ searchValue }) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    })
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}`: '';

    useEffect(() => {
        setIsLoading(true)
        fetch(
            `https://636be6427f47ef51e13d6ea3.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then((res) => {
                return res.json()
            })
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue])

    const pizzas = items
        // .filter((obj) => {
        //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        //         return true
        //     }
        //     return false
        // })
        .map((obj, index) => <PizzaBlock key={index} {...obj} />)

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))

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
                {isLoading ? skeletons : pizzas}
            </div>
        </div>
    )
}

export default Home
