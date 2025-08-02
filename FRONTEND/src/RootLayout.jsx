import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import Footer from './components/Footer'

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default RootLayout