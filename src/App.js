import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path='/Register' element={<Register />} />
                <Route exact path='/Login' element={<Login />} />
                <Route exact path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;