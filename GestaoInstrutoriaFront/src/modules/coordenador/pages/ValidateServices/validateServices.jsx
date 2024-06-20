import { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../../../components/header/Header";
import Layout from "../../components/layout/Layout";
import ValidationTable from "../../components/table/ValidationTable";
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import useFormattedData from '../../../../hooks/useFormattedData';
import Loading from "../../../../common/loading/Loading";
import RegisterNotFound from "../../../../components/NotFound/RegisterNotFound";
import Pagination from "../../../../components/pagination/Pagination";

const ValidateServices = () => {
    const { id } = useParams();
    const { fetchInstructorRegisters } = useCoordenadorContext();

    const [instructorRegistersData, setInstructorRegistersData] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [instructorName, setInstructorName] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const data = await fetchInstructorRegisters(id);
            setInstructorRegistersData(data.registros);
            setInstructorName(data.instrutor);
        } catch (error) {
            console.error("Erro ao buscar registros do instrutor:", error);
        }
    }, [fetchInstructorRegisters, id]);

    const formattedServices = useFormattedData(instructorRegistersData);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const term = searchTerm.toLowerCase().trim();
        const filtered = formattedServices.filter(service =>
            service.titulo.toLowerCase().startsWith(term)
        );
        setFilteredServices(filtered);
    }, [searchTerm, formattedServices]);
    

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    if (!instructorRegistersData) {
        return <Loading />;
    }

    return (
        <Layout>
            <Header
                title={`Serviços Educacionais de: ${instructorName}`}
                description="Lista com informações sobre os serviços educacionais do Instrutor."
            />
            <main>
                <div className="filter-container">
                    <input
                        type="text"
                        className="searchBar"
                        placeholder="Pesquisar título de Serviço Educacional cadastrado pelo instrutor"
                        id="search"
                        name="search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="searchButton-containe">
                        <button
                            title="Filtros"
                            size="medium"
                            className="filterOpen-btn"
                        >
                            Filtros
                        </button>
                    </div>
                </div>
                {filteredServices && filteredServices.length > 0 ? (
                    <div className="ValidationTable">
                        <ValidationTable
                            instructorRegisters={currentItems}
                            fetchData={fetchData}
                        />
                        <Pagination
                            items={filteredServices}
                            itemsPerPage={6}
                            onPageChange={setCurrentItems}
                        />
                    </div>
                ) : (
                    <RegisterNotFound
                        title={"Não Há Nenhum Serviço Educacional Deste Instrutor Para Validar!"}
                        subtitle="Aguarde esse instrutor cadastrar novos serviços educacionais"
                        buttonTitle="Visualizar lista de instrutores"
                        url="/"
                    />
                )}
            </main>
        </Layout>
    );
};

export default ValidateServices;
