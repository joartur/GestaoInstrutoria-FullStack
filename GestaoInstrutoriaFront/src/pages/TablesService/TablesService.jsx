import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../services/DataContext';
import Layout from "../../components/layout/Layout"
import Header from "../../components/header/Header"
import Button from '../../components/buttons/Button';
import Table from '../../components/table/Table';
import FilterModal from '../../components/modais/FilterModal';
import Pagination from '../../components/pagination/Pagination';
import Loading from '../loading/Loading';
import moment from 'moment';
import 'moment/locale/pt-br';
import "./tablesService.css"

const TablesService = () => {
    
    const { data } = useDataContext();

    //formata hora e data dos dados recebeidos da API
    const formattedServices = data.map(service => {
        const dataServico = moment(service.dataServico).format('DD/MM/YYYY');
        const formattedHoraInicio = formatTime(service.horaInicio);
        const formattedHoraFinal = formatTime(service.horaFinal);
        return {
            ...service,
            dataServico,
            horaInicio: formattedHoraInicio,
            horaFinal: formattedHoraFinal
        };
        function formatTime(timeString) {
            const [hour, minute] = timeString.split(":").map(Number);
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            const formattedMinute = minute < 10 ? `0${minute}` : minute;
            return `${formattedHour}:${formattedMinute}`;
        }
    });

    //estado com o valor pesquisado na barra de pesquisa
    const [searchTerm, setSearchTerm] = useState('');
    //estado do valor filtrado pela pesquisa, sem nenhuma pesquisa ele exibe os dados formatados
    const [filteredData, setFilteredData] = useState(formattedServices);
    //estado para controlar a página atual
    const [currentPage, setCurrentPage] = useState(1);
    //estado para controlar a quantidade de itens exibidos por página
    const [itemsPerPage] = useState(6);

    //função do input de pesquisa
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setCurrentPage(1); // Define a página atual como 1 ao fazer uma nova pesquisa
        filterData(term);
    };

    //filtra os dados com base na consulta do input de pesquisa
    const filterData = (term) => {
        const filteredResults = formattedServices.filter((item) =>
            item.titulo.toLowerCase().indexOf(term.toLowerCase()) !== -1
        );
        setFilteredData(filteredResults);
    };
    
    useEffect(() => {
        setFilteredData(formattedServices);
    }, [data]);

    useEffect(() => {
        filterData(searchTerm);
    }, [searchTerm]);

    // Calcula o índice do último item da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calcula o índice do primeiro item da página atual
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Obtém os itens da página atual
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    // Função para alterar a página atual
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Função para lidar com a mudança no filtro de situação
    const handleChange = (event) => {
        setSituacao(event.target.value);
    };

    // Estados e funções relacionadas ao modal de filtro
    const [situacao, setSituacao] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!data) {
        return <Loading />
    }

    return (
        <Layout >
            <Header title="Meus Serviços Educacionais" description="Lista com informações sobre seus serviços educacionais"/>
            <main className="tableService-container">
                {isModalOpen && (
                    <FilterModal onClose={closeModal}/>
                )}
                <div className="search-container">
                    <div className="searchBar-container">
                        <input
                            type="text"
                            className="searchBar"
                            placeholder="Pesquisar Serviço Educacional Por Título"
                            id="search"
                            name="search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="searchButton-containe">
                        <Button title="Adicionar Serviço" size="medium" url="/createService"/>
                    </div>
                </div>
                <div className="filters-container">
                    <select id="filter" name="filter" value={situacao} onChange={handleChange}>
                        <option value="">Todas as Situações</option>
                        <option value="">Em Análises</option>
                        <option value="">Validados</option>
                        <option value="">Parcialmente Validados</option>
                        <option value="">Recusados</option>
                    </select>
                    <button title="Filtros" size="medium" onClick={openModal} className="filterOpen-btn">Filtros</button>
                </div>
                {filteredData.length > 0 ? (
                    <div className="tables-container">
                        <Table formattedData={currentItems}/>
                        <Pagination 
                            itemsPerPage={itemsPerPage} 
                            totalItems={filteredData.length} 
                            paginate={paginate} 
                            currentPage={currentPage}
                        />
                    </div>
                ) : 
                    <div className="notFound-container">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
                        <h1>Não Há Nenhum Serviço Educacional Cadastrado</h1>
                        <p>Cadastre novos serviços educacionais e aguarde a validação do coordenador de área!</p>
                        <Button title="Cadastrar Serviços Educacionais" size="medium" url="/createService"/>
                    </div>
                }
            </main>
        </Layout>
    )
}

export default TablesService;
