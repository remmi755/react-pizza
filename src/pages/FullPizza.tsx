import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        price: number
    }>()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://636be6427f47ef51e13d6ea3.mockapi.io/items/` + id
                )
                setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <>Загрузка...</>
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt='Pizza' />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
            <Link to='/'>
                <button className='button button--outline button--add go-back-btn'>
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    )
}

export default FullPizza
