import React, { useState, useEffect } from "react";
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import Box from "../../../../components/box/Box";
import Header from "../../../../components/header/Header";
import Layout from "../../components/layout/Layout";
import InstrutoresListTable from "../../components/table/InstrutoresListTable";
import Loading from "../../../../common/loading/Loading";
import Pagination from "../../../../components/pagination/Pagination";
import "./HomePage.css";

const HomePage = () => {
    const { instructors } = useCoordenadorContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInstructors, setFilteredInstructors] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        if (instructors?.listarInstrutores?.instrutores) {
            setFilteredInstructors(instructors.listarInstrutores.instrutores);
        }
    }, [instructors]);

    useEffect(() => {
        const term = searchTerm.toLowerCase().trim(); // Remove espaços extras e converte para minúsculas
        const filtered = instructors?.listarInstrutores?.instrutores.filter(instructor =>
            instructor.nome.toLowerCase().startsWith(term)
        );
        setFilteredInstructors(filtered);
    }, [searchTerm, instructors]);    

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    if (!instructors) {
        return <Loading />
    }

    return (
        <Layout>
            <Header title="Página Inicial" description="Bem-vindo!" />
            <main>
                <div className="dashboard-container">
                    <Box
                        title="Número de instrutores sem horas registradas"
                        description={instructors ? instructors.instrutoresSemHorasTabalhadas : "0"}
                        type="box"
                    />
                    <Box
                        title="Número de instrutores excedendo as horas permitidas"
                        description={instructors ? instructors.instrutoresSaldoExcedente : "0"}
                        type="box"
                    />
                </div>
                <div className="filter-container">
                    <input
                        type="text"
                        className="searchBar"
                        placeholder="Pesquisar Nome do Instrutor"
                        id="search"
                        name="search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="container">
                    <InstrutoresListTable
                        instructors={currentItems ?? []}
                    />
                    <Pagination
                        items={filteredInstructors}
                        itemsPerPage={2}
                        onPageChange={setCurrentItems}
                    />
                </div>
            </main>
        </Layout>
    );
}

export default HomePage;
