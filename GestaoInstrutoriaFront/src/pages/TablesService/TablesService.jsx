import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowDownShortWide, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../services/DataContext';
import Layout from "../../components/layout/Layout"
import Header from "../../components/header/Header"
import TextInput from "../../components/inputs/TextInput"
import Button from '../../components/buttons/Button';
import ButtonFilter from '../../components/buttons/ButtonFilter';
import Table from '../../components/table/Table';

import "./tablesService.css"

const TablesService = () => {
    
    const { data } = useDataContext();
    const [situacao, setSituacao] = useState('');

    const handleChange = (event) => {
        setSituacao(event.target.value);
    };

    return (
        <Layout >
            <Header title="Meus Serviços Educacionais" description="Lista com informações sobre seus serviços educacionais"/>
            <main className="tableService-container">
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
                    <option value="">Em Análise</option>
                    <option value="">Validado</option>
                    <option value="">Parcialmente</option>
                    <option value="">Recusado</option>
                </select>
                <ButtonFilter title="Filtros" size="medium" icon={faArrowDownShortWide}/>
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