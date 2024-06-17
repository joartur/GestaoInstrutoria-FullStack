import { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import Header from "../../../../components/header/Header";
import Layout from "../../components/layout/Layout";
import ValidationTable from "../../components/table/ValidationTable";
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import useFormattedData from '../../../../hooks/useFormattedData';
import Loading from "../../../../common/loading/Loading";
import RegisterNotFound from "../../../../components/NotFound/RegisterNotFound";

const ValidateServices = () => {
    const { id } = useParams();
    const { fetchInstructorRegisters } = useCoordenadorContext();

    const [instructorRegistersData, setInstructorRegistersData] = useState([]);
    const [instructorName, setInstructorName] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await fetchInstructorRegisters(id);
            setInstructorRegistersData(data.registros);
            setInstructorName(data.instrutor)
        } catch (error) {
            console.error("Erro ao buscar registros do instrutor:", error);
        }
    }, [fetchInstructorRegisters, id]);

    const formattedServices = useFormattedData(instructorRegistersData);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!instructorRegistersData) {
        return <Loading />
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
                />
                <div className="searchButton-containe">
                <button
                    title="Filtros"
                    size="medium"
                    className="filterOpen-btn">
                    Filtros
                </button>
                </div>
                </div>
                {formattedServices && formattedServices.length > 0 ?
                <ValidationTable
                    instructorRegisters={formattedServices}
                    fetchData={fetchData}
                />
                :
                <RegisterNotFound
                title= {"Não Há Nenhum Serviço Educacional Deste Instrutor Para Validar!"}
                subtitle= "Aguarde esse instrutor cadastrar novos serviços educacionais"
                buttonTitle= "Visualizar lista de instrutores"
                url= "/"
                />
                }
            </main>
        </Layout>
    )
}

export default ValidateServices;