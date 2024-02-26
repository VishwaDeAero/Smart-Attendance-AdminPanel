import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentHistory from '../pages/student/studentHistory'
import StudentUpdate from '../pages/student/studentUpdate'
import StudentView from '../pages/student/studentView'

const StudentRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentView />} />
      {/* <Route path="attendance/:id" element={<StudentHistory />} /> */}
      <Route path="update/:id" element={<StudentUpdate />} />
    </Routes>
  )
}

export default StudentRoute