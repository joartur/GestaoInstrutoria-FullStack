import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ValidateService from "./pages/ValidateServices/validateServices";
import HomePage from './pages/HomePage/HomePage';
import { CoordenadorProvider } from './services/CoordenadorContext';

const CoordenadorApp = () => {
    return (
        <CoordenadorProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/validate/:id" element={<ValidateService />}/>
            </Routes>
        </Router>
        </CoordenadorProvider>
    )
}

export default CoordenadorApp;