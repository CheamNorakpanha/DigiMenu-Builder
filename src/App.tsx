import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Restaurant from './Pages/Restaurant';
import Menu from './Pages/Menu';
import Testing from './Pages/Testing'
import Dashboard from './Pages/Dashboard';
import Explore from './Pages/Explore';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurant' element={<Restaurant />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/testing' element={<Testing />} />
          <Route path='/restaurant/dashboard' element={<Dashboard />} />
          <Route path='/explore' element={<Explore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;