import React from 'react'
import NavBar from '../components/navbar/NavBar'
import SideBar from '../components/sidebar/SideBar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from '../pages/add/Add'
import { ToastContainer } from 'react-toastify';

import List from '../pages/list/List'
import Order from '../pages/order/Order'
import { useContext } from 'react'
import { AdminContext } from '../AdminContext'
import Admin from '../pages/auth/Admin'

const Router = () => {
  const { token } = useContext(AdminContext)
  return (
    <div>
      <ToastContainer />
      {!token ? (
        <Admin/>
      ) : (
        <>
          <NavBar />
          <hr />
          <div className='flex '>
            <SideBar />
            <Routes>
              <Route path='/' element={<Navigate to='/list' />} />
              <Route path='/add' element={<Add />} />
              <Route path='/list' element={<List />} />
              <Route path='/orders' element={<Order />} />
            </Routes>
          </div>
        </>
     )}
    </div>
  )
}

export default Router