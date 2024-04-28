import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Sample from './pages/sample'
import Test from './pages/test'
import PageNotFound from './pages/pageNotFound'
import SignIn from './pages/signIn'
import UserRoute from './routes/UserRoute'
import SubjectRoute from './routes/SubjectRoute'
import StudentRoute from './routes/StudentRoute'
import LectureRoute from './routes/LectureRoute'
import AttendanceRoute from './routes/AttendanceRoute';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import DashboardView from './pages/dashboard/dashboardView';
import ReportRoute from './routes/ReportRoute';
import EnrolmentRoute from './routes/EnrolmentRoute';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Router>
        <Routes>
          {/* Login Page */}
          <Route path="/login" exact element={<SignIn />} />
          {/* Auth Kit Authentication Protected Routes */}
          <Route element={<AuthOutlet fallbackPath='/login' />}>
            {/* Home Page */}
            <Route path="/" exact element={<DashboardView />} />
            {/* Users Routes */}
            <Route path="/users/*" element={<UserRoute />} />
            {/* Attendance Routes */}
            <Route path="/attendance/*" element={<AttendanceRoute />} />
            {/* Subject Routes */}
            <Route path="/subjects/*" element={<SubjectRoute />} />
            {/* Student Routes */}
            <Route path="/students/*" element={<StudentRoute />} />
            {/* Lecture Routes */}
            <Route path="/lectures/*" element={<LectureRoute />} />
            {/* Report Routes */}
            <Route path="/reports/*" element={<ReportRoute />} />
            {/* Enrolment Routes */}
            <Route path="/enrolments/*" element={<EnrolmentRoute />} />
          </Route>
          <Route path="/test" exact element={<Test />} />
          {/* 404 Page */}
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  )
}

export default App
