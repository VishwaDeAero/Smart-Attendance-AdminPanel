import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sample from './pages/sample';
import Test from './pages/test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Sample/>} />
        <Route path="/test" exact element={<Test/>} />
      </Routes>
    </Router>
  );
}

export default App;
