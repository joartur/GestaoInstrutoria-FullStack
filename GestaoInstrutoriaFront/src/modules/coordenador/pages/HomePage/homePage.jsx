import Box from "../../../../components/box/Box";
import Header from "../../../../components/header/Header";
import Layout from "../../components/layout/Layout";
import Table from "../../components/table/Table";
import "./HomePage.css"

const HomePage = () => {
    return (
        <Layout>
            <Header title="Página Inicial" description="Bem-vindo!"/>
            <main>
                <div className="dashboard-container">
                    <Box title="Número de instrutores sem horas registradas" description="5" type="box"/>
                    <Box title="Número de instrutores excedendo as horas permitidas" description="10" type="box"/>
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

                <table className="container">
                    <Table />
                </table>
            </main>
        </Layout>
    )
}

export default HomePage;