import './App.css';
import Sample from './pages/sample';
import Test from './pages/test';
import PageNotFound from './pages/pageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Sample/>} />
        <Route path="/test" exact element={<Test/>} />
        <Route path="*" exact element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
