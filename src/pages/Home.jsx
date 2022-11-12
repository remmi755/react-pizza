import React, {useEffect, useState} from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://636be6427f47ef51e13d6ea3.mockapi.io/items')
            .then((res) => {
                return res.json()
            })
            .then((arr) => {
                setItems(arr);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
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
