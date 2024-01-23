import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserView from '../pages/user/userView'
import UserCreate from '../pages/user/userCreate'
import UserUpdate from '../pages/user/userUpdate'

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserView />} />
      <Route path="create" element={<UserCreate />} />
      <Route path="update/:id" element={<UserUpdate />} />
    </Routes>
  )
}

export default UserRoute