import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../services/DataContext';
import Layout from "../../components/layout/Layout";
import Header from "../../../../components/header/Header";
import Button from '../../../../components/buttons/Button';
import Table from '../../components/table/Table';
import FilterModal from '../../components/modais/FilterModal';
import Pagination from '../../../../components/pagination/Pagination';
import Loading from '../../../../common/loading/Loading';
import useEscapeKeyPress from "../../../../hooks/useEscapeKeyPress";
import useFormattedData from '../../../../hooks/useFormattedData';
import moment from 'moment';
import 'moment/locale/pt-br';
import "./tablesService.css";

const TablesService = () => {
    const { data } = useDataContext();

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

    const [situacao, setSituacao] = useState('');
    const [customFilters, setCustomFilters] = useState({
        dataInicioFiltro: "",
        dataFinalFiltro: "",
        FKservico: ""
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(formattedServices);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setCurrentPage(1);
        filterData(term, situacao, customFilters);
    };

    const filterData = (term, situacao, customFilters) => {
        let filteredResults = formattedServices;

        if (term) {
            filteredResults = filteredResults.filter((item) =>
                item.titulo.toLowerCase().includes(term.toLowerCase())
            );
        }

        if (situacao) {
            filteredResults = filteredResults.filter((item) => item.status === situacao);
        }

        if (customFilters) {
            if (customFilters.dataInicioFiltro) {
                filteredResults = filteredResults.filter((item) =>
                    moment(item.dataServico).isSameOrAfter(moment(customFilters.dataInicioFiltro))
                );
            }

            if (customFilters.dataFinalFiltro) {
                filteredResults = filteredResults.filter((item) =>
                    moment(item.dataServico).isSameOrBefore(moment(customFilters.dataFinalFiltro))
                );
            }

            if (customFilters.FKservico && customFilters.FKservico.length > 0) {
                const servicoIds = customFilters.FKservico.map(Number);
                filteredResults = filteredResults.filter((item) =>
                    servicoIds.includes(item.Servico.id)
                );
            }
            
        }

        setFilteredData(filteredResults);
    };

    useEffect(() => {
        setFilteredData(formattedServices);
    }, [data]);

    useEffect(() => {
        filterData(searchTerm, situacao, customFilters);
    }, [searchTerm, situacao, customFilters]);

    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('desc');

    const handleSort = (columnName) => {
        if (sortBy === columnName) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const applyFilters = (filters) => {
        setCustomFilters(filters);
        closeModal();
    };

    useEscapeKeyPress(closeModal, [isModalOpen]);

    const handleChange = (event) => {
        const situacaoValue = event.target.value;
        setSituacao(situacaoValue);
        setCurrentPage(1);
        filterData(searchTerm, situacaoValue, customFilters);
    };

    const removeFilter = (filterKey) => {
        setCustomFilters((prevFilters) => ({
            ...prevFilters,
            [filterKey]: ''
        }));
    };

    if (!data) {
        return <Loading />;
    }

    return (
        <Layout>
            <Header title="Meus Serviços Educacionais" description="Lista com informações sobre seus serviços educacionais"/>
            <main className="tableService-container">
                {isModalOpen && (
                    <FilterModal onClose={closeModal} applyFilters={applyFilters} />
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
                        <Button
                            title="Adicionar Serviço"
                            size="medium"
                            url="/createService"/>
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

                <div className="active-filters">
                    {
                        customFilters.dataInicioFiltro || customFilters.dataFinalFiltro || customFilters.FKservico ? (
                            <h2>Filtros Ativos:</h2>
                        ) : null
                    }

                    {customFilters.dataInicioFiltro && (
                        <div className="filter-tag">
                            <strong>Data Início:</strong>
                            <span>{customFilters.dataInicioFiltro}</span>
                            <FontAwesomeIcon className="filter-icon" icon={faTimes} onClick={() => removeFilter('dataInicioFiltro')} />
                        </div>
                    )}
                    {customFilters.dataFinalFiltro && (
                        <div className="filter-tag">
                            <strong>Data Final:</strong>
                            <span>{customFilters.dataFinalFiltro}</span>
                            <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter('dataFinalFiltro')} />
                        </div>
                    )}
                    {customFilters.FKservico && (
                        <div className="filter-tag">
                            <strong>Serviço:</strong>
                            <span>{customFilters.FKservico}</span>
                            <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter('FKservico')} />
                        </div>
                    )}
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
                ) : (
                    <div className="notFound-container">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                        <h1>Não Há Nenhum Serviço Educacional Cadastrado</h1>
                        <p>Cadastre novos serviços educacionais e aguarde a validação do coordenador de área!</p>
                        <Button
                            title="Cadastrar Serviços Educacionais"
                            size="medium"
                            url="/createService"
                        />
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default TablesService;
