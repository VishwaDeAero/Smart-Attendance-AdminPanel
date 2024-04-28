import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EnrolmentView from '../pages/enrolment/enrolmentView'

const EnrolmentRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<EnrolmentView />} />
      <Route path="/:id" element={<EnrolmentView />} />
    </Routes>
  )
}

export default EnrolmentRoute