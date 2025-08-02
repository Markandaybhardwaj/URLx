import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routing/routeTree.js'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser } from './api/user.api.js'
import { login } from './store/slice/authSlice.js'

export const queryClient = new QueryClient()

// Initialize authentication state
const initializeAuth = async () => {
  try {
    const data = await getCurrentUser()
    if (data && data.user) {
      store.dispatch(login(data.user))
    }
  } catch (error) {
    console.log('No authenticated user found')
  }
}

// Initialize auth on app start
initializeAuth()

const router = createRouter({
  routeTree,
  context:{
    queryClient,
    store
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
)
