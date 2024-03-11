import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../services/DataContext';
import Layout from "../../components/layout/Layout"
import Header from "../../components/header/Header"
import TextInput from "../../components/inputs/TextInput"
import Button from '../../components/buttons/Button';
import Table from '../../components/table/Table';
import FilterModal from '../../components/modais/FilterModal';
import "./tablesService.css"

const TablesService = () => {
    
    const { data, serviceTypes } = useDataContext();
    const [situacao, setSituacao] = useState('');

    const handleChange = (event) => {
        setSituacao(event.target.value);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen)
    };
    const closeModal = () => {
        setIsModalOpen(false);
        console.log(isModalOpen)
    };

    return (
        <Layout >
            <Header title="Meus Serviços Educacionais" description="Lista com informações sobre seus serviços educacionais"/>
            <main className="tableService-container">
                {isModalOpen && (
                    <FilterModal onClose={closeModal}/>
                )}
            <div className="search-container">
                <div className="searchBar-container">
                    <TextInput placeholder="Pesquisar Serviço Educacional Por Título" id="search" name="search" onChange={handleChange}/>
                </div>
                <div className="searchButton-containe">
                    <Button title="Adicionar Serviço" size="medium" url="/createService"/>
                </div>
            </div>
            <div className="filters-container">

            <select id="filter" name="filter" value={situacao} onChange={handleChange}>
                    <option value="">Todos</option>
                    {serviceTypes ? (
                         serviceTypes.map(service => (
                            <option value={service.id} key={service.id}>{service.nome}</option>
                    ))
                    ) : (null)}
                       
            </select>

                <button title="Filtros" size="medium" onClick={openModal} className="filterOpen-btn">Filtros</button>
            </div>
            
            {data.length > 0 ? (
                <div className="tables-container">
                <Table>
               </Table>

                <div className="pagination-container">
                <div className="pagination-lines">
                    <p>Linhas por Página:</p>
                    <input type="number" className="paginationInput" id="pages" name="pages" value="6" onChange={handleChange}/>
                </div>

                <div className="pagination-pages">
                <FontAwesomeIcon icon={faChevronLeft} className="arrow"/>
                <p>1 de 3</p>
                <FontAwesomeIcon icon={faChevronRight} className="arrow"/>
                </div>
                </div>
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