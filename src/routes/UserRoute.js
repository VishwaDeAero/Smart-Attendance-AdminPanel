import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserView from '../pages/user/userView'
import UserCreate from '../pages/user/userCreate'

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserView />} />
      <Route path="create" element={<UserCreate />} />
    </Routes>
  )
}

export default UserRoute