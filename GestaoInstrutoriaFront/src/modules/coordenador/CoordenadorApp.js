import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CoordenadorProvider } from './services/CoordenadorContext';
import ValidateService from "./pages/ValidateServices/validateServices";
import HomePage from './pages/HomePage/HomePage';
import ViewServices from '../../common/ViewServices/ViewServices';
import Profile from './pages/Profile/Profile';
import Login from '../../common/Login/Login';
import Test from "./pages/Test";
import CreateService from '../instrutor/pages/CreateService/CreateService';

const CoordenadorApp = () => {
    return (
        <CoordenadorProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/validate/:id" element={<ValidateService />}/>
                <Route path="/viewServices/:id" element={<ViewServices />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/createService/:id" element={<CreateService />}/>
                
                <Route path="/testes" element={<Test />}/>
            </Routes>
        </Router>
        </CoordenadorProvider>
    )
}

export default CoordenadorApp;