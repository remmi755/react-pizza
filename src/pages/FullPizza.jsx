import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function FullPizza() {
    const [pizza, setPizza] = useState()
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
                navigate("/")
            }
        }
        fetchPizza();
    }, [])

    if(!pizza) {
        return 'Загрузка...'
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
        </div>
    )
}

export default FullPizza
