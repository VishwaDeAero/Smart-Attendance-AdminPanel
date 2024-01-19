import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sample from './pages/sample';
import Test from './pages/test';
import PageNotFound from './pages/pageNotFound';
import SignIn from './pages/signIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Sample/>} />
        <Route path="/login" exact element={<SignIn/>} />
        <Route path="/test" exact element={<Test/>} />
        <Route path="*" exact element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
