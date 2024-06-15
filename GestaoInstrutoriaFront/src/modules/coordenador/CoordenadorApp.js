import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CoordenadorProvider } from './services/CoordenadorContext';
import ValidateService from "./pages/ValidateServices/validateServices";
import HomePage from './pages/HomePage/HomePage';
import Profile from './pages/Profile/Profile';
import Login from '../../common/Login/Login';
import Test from "./pages/Test";
import CreateService from '../coordenador/pages/createService/CreateService';
import ViewServices from './pages/ViewService/ViewService';
import NotFound from '../../components/NotFound/NotFound';

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
                <Route path="cordArea/createService/:id" element={<CreateService />}/>
                <Route path="cordArea/viewServices/:id" element={<ViewServices />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/testes" element={<Test />}/>
            </Routes>
        </Router>
        </CoordenadorProvider>
    )
}

export default CoordenadorApp;