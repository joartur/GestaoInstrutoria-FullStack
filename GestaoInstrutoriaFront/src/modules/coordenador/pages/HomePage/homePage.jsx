import { Link } from "react-router-dom";
import Box from "../../../../components/box/Box";
import Header from "../../../../components/header/Header";
import Layout from "../../components/layout/Layout";
import InstutoresListTable from "../../components/table/InstrutoresListTable";
import "./HomePage.css"

const HomePage = () => {
    return (
        <Layout>
            <Header title="Página Inicial" description="Bem-vindo!"/>
            <main>
                <div className="dashboard-container">
                    <Link to="/">
                    <Box
                    title="Número de instrutores sem horas registradas"
                    description="5"
                    type="box"/>
                    </Link>
                    <Link to="/">
                    <Box
                    title="Número de instrutores excedendo as horas permitidas"
                    description="10"
                    type="box"/>
                    </Link>
                </div>
                <div className="filter-container">
                <input
                    type="text"
                    className="searchBar"
                    placeholder="Pesquisar Nome do Instrutor"
                    id="search"
                    name="search"
                    value=""
                    onChange=""
                />
                <div className="searchButton-containe">
                <button
                    title="Filtros"
                    size="medium"
                    onClick=""
                    className="filterOpen-btn">
                    Filtros
                </button>
                </div>
                </div>

                <div className="container">
                    <InstutoresListTable />
                </div>
            </main>
        </Layout>
    )
}

export default HomePage;