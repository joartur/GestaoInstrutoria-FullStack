import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage/homePage"
import ValidateService from "./pages/ValidateServices/validateServices"
import { CoordenadorProvider } from './services/CoordenadorContext';

const CoordenadorApp = () => {
    return (
        <CoordenadorProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/validate" element={<ValidateService />}/>
            </Routes>
        </Router>
        </CoordenadorProvider>
    )
}

export default CoordenadorApp;