import React from 'react'

const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
]

function Categories({ value, onClickCategory }) {
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
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
