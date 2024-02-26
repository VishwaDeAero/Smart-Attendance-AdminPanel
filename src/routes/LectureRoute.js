import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LectureView from '../pages/lecture/lectureView'
import LectureCreate from '../pages/lecture/lectureCreate'
import LectureUpdate from '../pages/lecture/lectureUpdate'

const LectureRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LectureView />} />
      <Route path="create" element={<LectureCreate />} />
      <Route path="update/:id" element={<LectureUpdate />} />
    </Routes>
  )
}

export default LectureRoute