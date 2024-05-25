import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import Layout from "../../instrutor/components/layout/Layout";
import Header from "../../../components/header/Header";
import Button from '../../../components/buttons/Button';
import Table from "../../instrutor/components/table/Table";
import FilterModal from "../../instrutor/components/modais/FilterModal";
import Pagination from '../../../components/pagination/Pagination';
import Loading from '../../../common/loading/Loading';
import useEscapeKeyPress from "../../../hooks/useEscapeKeyPress";
import useCustomTable from '../../../hooks/useCustomTable'; // Import your custom hook

const Test = ({ data }) => {
    const {
        searchTerm,
        situacao,
        customFilters,
        currentItems,
        currentPage,
        itemsPerPage,
        totalItems,
        sortDirection,
        sortBy,
        handleSearch,
        handleChange,
        handleSort,
        applyFilters,
        removeFilter,
        paginate
    } = useCustomTable(data);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEscapeKeyPress(closeModal, [isModalOpen]);

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
                    {customFilters.dataInicioFiltro && (
                        <div className="filter-tag">
                            <strong>Data Início:</strong> {customFilters.dataInicioFiltro}
                            <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter('dataInicioFiltro')} />
                        </div>
                    )}
                    {customFilters.dataFinalFiltro && (
                        <div className="filter-tag">
                            <strong>Data Final:</strong> {customFilters.dataFinalFiltro}
                            <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter('dataFinalFiltro')} />
                        </div>
                    )}
                    {customFilters.FKservico.length > 0 && (
                        <div className="filter-tag">
                            <strong>Serviço:</strong> {customFilters.FKservico.join(', ')}
                            <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter('FKservico')} />
                        </div>
                    )}
                </div>

                {currentItems.length > 0 ? (
                    <div className="tables-container">
                        <Table
                            formattedData={currentItems}
                            handleSort={handleSort}
                            sortDirection={sortDirection}
                            sortBy={sortBy}
                        />
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
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

export default Test;
