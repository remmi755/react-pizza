import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filrerSlice'

type CategoriesProps = {
    value: number
    onChangeCategory: (index: number) => void
}

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
    // const filter = useSelector((state) => state.filter.categoryId)
    // const dispatch = useDispatch()

    return (
        <div className='categories'>
            <ul>
                {categories.map((categoryName, index) => (
                    <li
                        key={index}
                        onClick={() => onChangeCategory(index)}
                        className={value === index ? 'active' : ''}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories
