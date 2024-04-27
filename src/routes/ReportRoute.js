import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentReportView from '../pages/report/studentReport'
import LectureReportView from '../pages/report/lectureReport'
import SubjectReportView from '../pages/report/subjectReport'

const ReportRoute = () => {
  return (
    <Routes>
      <Route path="/student" element={<StudentReportView />} />
      <Route path="/lecture" element={<LectureReportView />} />
      <Route path="/subject" element={<SubjectReportView />} />
    </Routes>
  )
}

export default ReportRoute