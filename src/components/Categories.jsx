import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filrerSlice'

const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
]

function Categories() {
    const filter = useSelector((state) => state.filter.categoryId)
    const dispatch = useDispatch()

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li
                        key={index}
                        onClick={() => dispatch(setCategoryId(index))}
                        className={filter === index ? 'active' : ''}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
