import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AuthProvider from './context/auth';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path='/Register' element={<Register />} />
                    <Route exact path='/Login' element={<Login />} />
                    {/* <PrivateRoute exact path='/' element={<Home />} /> */}
                    <Route element={<PrivateRoute />}>
                        <Route exact path='/profile' element={<Profile />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route exact path='/' element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;