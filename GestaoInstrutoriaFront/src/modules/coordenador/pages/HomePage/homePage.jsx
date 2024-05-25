import { Link } from "react-router-dom";
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import Box from "../../../../components/box/Box";
import Header from "../../../../components/header/Header";
import Layout from "../../components/layout/Layout";
import InstrutoresListTable from "../../components/table/InstrutoresListTable";
import Loading from "../../../../common/loading/Loading";
import "./HomePage.css";

const HomePage = () => {
    const { instructors } = useCoordenadorContext();
    console.log("instrutores", instructors);

    if (!instructors) {
        return <Loading />
    }

    return (
        <Layout>
            <Header title="Página Inicial" description="Bem-vindo!" />
            <main>
                <div className="dashboard-container">
                    <Link to="/">
                        <Box
                            title="Número de instrutores sem horas registradas"
                            description={instructors?instructors.instrutoresSemHorasTabalhadas:"0"}
                            type="box"
                        />
                    </Link>
                    <Link to="/">
                        <Box
                            title="Número de instrutores excedendo as horas permitidas"
                            description={instructors?instructors.instrutoresSaldoExcedente:"0"}
                            type="box"
                        />
                    </Link>
                </div>
                <div className="filter-container">
                    <input
                        type="text"
                        className="searchBar"
                        placeholder="Pesquisar Nome do Instrutor"
                        id="search"
                        name="search"
                    />
                </div>
                <div className="container">
                    <InstrutoresListTable
                        instructors={instructors?.listarInstrutores?.instrutores ?? []}
                    />
                </div>
            </main>
        </Layout>
    );
}

export default HomePage;
