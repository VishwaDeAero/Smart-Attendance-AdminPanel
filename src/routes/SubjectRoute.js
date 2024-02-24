import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SubjectView from '../pages/subject/subjectView'
import SubjectCreate from '../pages/subject/subjectCreate'
import SubjectUpdate from '../pages/subject/subjectUpdate'

const SubjectRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<SubjectView />} />
      <Route path="create" element={<SubjectCreate />} />
      <Route path="update/:id" element={<SubjectUpdate />} />
    </Routes>
  )
}

export default SubjectRoute