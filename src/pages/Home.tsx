import React, { useEffect, useRef } from 'react'
import qs from 'qs'
import { useNavigate, Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    setCurrentPage,
    setFilters,
    selectFilter,
    setCategoryId,
} from '../redux/slices/filrerSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { listPopup } from '../components/Sort'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)
    const filter = useSelector((state: any) => state.filter.categoryId)

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            //@ts-ignore
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            })
        )
        window.scrollTo(0, 0)
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

            const sort = listPopup.find((obj) => obj.sortProperty === params.sortProperty)

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

    const pizzas = items.map((obj: any, index: number) => (
        <Link to={`/pizza/${obj.id}`} key={index}>
            <PizzaBlock {...obj} />
        </Link>
    ))

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories onChangeCategory={onChangeCategory} value={filter} />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>
                        Произошла ошибка <span>😕</span>
                    </h2>
                    <p>
                        К сожалению не удалось получить пиццы
                        <br />
                        Попробуйте повторить попытку позже.
                    </p>
                </div>
            ) : (
                <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
