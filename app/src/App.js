
import './App.css';
import Home from './Home';
import User from './User';
import Admin from './Admin';
import Page from './Page';

import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
    
      <Routes>
        <Route path="/user" element={<User/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/page" element={<Page/>}/>
       
      </Routes>
    
   </BrowserRouter>
  );
}

export default App;
