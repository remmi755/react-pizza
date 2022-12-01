import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Pizza, SearchPizzaParams } from "./types"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params: SearchPizzaParams) => {
        const { sortBy, order, category, search, currentPage } = params
        const { data } = await axios.get<Pizza[]>(
            `https://636be6427f47ef51e13d6ea3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data as Pizza[]
    }
)