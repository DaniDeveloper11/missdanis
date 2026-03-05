import Alpine from 'alpinejs'
import axios from 'axios'

window.axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

window.BACKEND_URL = import.meta.env.VITE_API_URL.replace('/api', '')

window.Alpine = Alpine

Alpine.data('catalog', () => ({
  products: [],
  async fetchCatalog() {
    try {
      const response = await window.axios.get('/products?populate=*')
      this.products = response.data.data
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },
  init() {
    this.fetchCatalog()
  }
}))

Alpine.start()
