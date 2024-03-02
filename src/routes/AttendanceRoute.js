import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AttendanceView from '../pages/attendance/attendanceView'

const AttendanceRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AttendanceView />} />
    </Routes>
  )
}

export default AttendanceRoute