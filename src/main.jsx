import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Router/routes.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='max-w-5xl mx-auto'>
        <RouterProvider router={routes}></RouterProvider>
          </div>
        </HelmetProvider>
    </QueryClientProvider>
     
 </AuthProvider>
  </StrictMode>,
)
