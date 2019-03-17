import Axios from 'axios'

export default {
    newTheme: async (theme) => {
        const response = await Axios.post("/themes", theme)
        return response.data
    },
    saveTheme: async (id, theme) => {
        const response = await Axios.put(`/themes/${id}`, theme)
        return response.data
    },
    getAllThemes: async () => {
        const response = await Axios.get("/themes")
        return response.data
    },
    getTheme: async (id) => {
        const response = await Axios.get(`/themes/${id}`)
        return response.data
    },
    deleteTheme: async (id)=> {
        await Axios.delete(`/themes/${id}`)
    }
}