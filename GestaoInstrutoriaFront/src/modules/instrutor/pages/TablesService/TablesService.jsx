import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../services/DataContext';
import Layout from "../../../../components/layout/Layout"
import Header from "../../../../components/header/Header"
import Button from '../../../../components/buttons/Button';
import Table from '../../components/table/Table';
import FilterModal from '../../components/modais/FilterModal';
import Pagination from '../../../../components/pagination/Pagination';
import Loading from '../../pages/loading/Loading';
import moment from 'moment';
import 'moment/locale/pt-br';
import "./tablesService.css"

const TablesService = () => {
    
    const { data } = useDataContext();

    const [situacao, setSituacao] = useState('');

    
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
    const filterData = (term, situacao) => {
        let filteredResults = formattedServices;
        if (term) {
          filteredResults = filteredResults.filter((item) =>
            item.titulo.toLowerCase().includes(term.toLowerCase())
          );
        }
        if (situacao) {
          filteredResults = filteredResults.filter((item) => item.status === situacao);
        }
        setFilteredData(filteredResults);
      };
    
    useEffect(() => {
        setFilteredData(formattedServices);
    }, [data]);

    useEffect(() => {
        filterData(searchTerm);
    }, [searchTerm]);

    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('desc');

    // Função para lidar com a ordenação da coluna de dataServico
    const handleSort = (columnName) => {
        if (sortBy === columnName) {
            // Inverte a direção se a coluna já estiver selecionada
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Define a nova coluna de ordenação e a direção como descendente
            setSortBy(columnName);
            setSortDirection('desc');
        }
    };

    const sortedData = [...filteredData].sort((a, b) => {
        const valueA = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
        const valueB = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
    
        if (valueA === valueB) {
            return 0;
        }
    
        if (sortDirection === 'asc') {
            return valueA < valueB ? -1 : 1;
        } else {
            return valueA > valueB ? -1 : 1;
        }
    });

    // Calcula o índice do último item da página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calcula o índice do primeiro item da página atual
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Obtém os itens da página atual
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    // Função para alterar a página atual
    const paginate = (pageNumber) => setCurrentPage(pageNumber);  

    // Estados e funções relacionadas ao modal de filtro
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    //apertar esct para sair do modal de filtro
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            setIsModalOpen(false)
        }
    };
    useEffect(() => {
        if (isModalOpen) {
          document.addEventListener('keydown', handleKeyPress);
    }
    return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isModalOpen]);

    // Função para lidar com a mudança no filtro de situação
    const handleChange = (event) => {
        const situacaoValue = event.target.value;
        setSituacao(situacaoValue);
        setCurrentPage(1);
        filterData(searchTerm, situacaoValue); // Atualiza o filtro com a situação selecionada
    };

    

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
                    <option value="Em Análise">Em Análise</option>
                    <option value="Validado">Validado</option>
                    <option value="Parcialmente Validado">Parcialmente Validado</option>
                    <option value="Recusado">Recusado</option>
                </select>
                    <button title="Filtros" size="medium" onClick={openModal} className="filterOpen-btn">Filtros</button>
                </div>
                {filteredData.length > 0 ? (
                    <div className="tables-container">
                        <Table
                        formattedData={currentItems}
                        handleSort={handleSort}
                        sortDirection={sortDirection}
                        sortBy={sortBy}
                        />
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
