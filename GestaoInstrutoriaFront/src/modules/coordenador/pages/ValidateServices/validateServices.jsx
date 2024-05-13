import { useParams } from 'react-router-dom';
import Header from "../../../../components/header/Header";
import Layout from "../../components/layout/Layout";
import ValidationTable from "../../components/table/ValidationTable";

const ValidateServices = () => {
    const { id } = useParams();
    

    return (
        <Layout>
            <Header
            title="Serviços Educacionais de:"
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
                <div className="table-container">
                    <ValidationTable />
                </div>
            </main>
        </Layout>
    )
}

export default ValidateServices;