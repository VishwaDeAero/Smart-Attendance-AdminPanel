import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Sample from './pages/sample'
import Test from './pages/test'
import PageNotFound from './pages/pageNotFound'
import SignIn from './pages/signIn'
import UserView from './pages/user/userView'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" exact element={<Sample />} />
        {/* Login Page */}
        <Route path="/login" exact element={<SignIn />} />
        {/* Users Routes */}
        <Route path="/users" element={<UserView/>}>
          {/* <Route path="create" element={<CreateUser />} /> */}
          {/* <Route path="edit/:id" element={<EditUser />} /> */}
        </Route>
        <Route path="/test" exact element={<Test />} />
        {/* 404 Page */}
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
