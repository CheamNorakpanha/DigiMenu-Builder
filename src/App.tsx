import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Restaurant from './Pages/Restaurant';
import Menu from './Pages/RestaurantMenu';
import Testing from './Pages/Testing';
import Dashboard from './Pages/Dashboard';
import Explore from './Pages/Explore';
import Menus from './Pages/Menus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurant' element={<Restaurant />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/testing' element={<Testing />} />
        <Route path='/restaurant/dashboard-new-york-beef-burger' element={<Dashboard />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/restaurant/dashboard-new-york-beef-burger/menus' element={<Menus />} />
      </Routes>
    </Router>
  );
}

export default App;