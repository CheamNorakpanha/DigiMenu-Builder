import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Menu from './Pages/Menu';
import Testing from './Pages/Testing'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/testing' element={<Testing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;