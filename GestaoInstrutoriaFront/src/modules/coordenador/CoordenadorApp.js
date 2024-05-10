import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage/homePage"

const CoordenadorApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="coordenador/" element={<HomePage />}/>
            </Routes>
        </Router>
    )
}

export default CoordenadorApp;