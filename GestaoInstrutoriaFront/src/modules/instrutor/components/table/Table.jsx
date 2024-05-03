import React, { useState, useEffect } from 'react';
import { faTrash, faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useDataContext } from '../../services/DataContext';
import { Link } from 'react-router-dom';
import TableSituation from "./TableSituation"
import ActionButton from "./ActionButton"
import DeleteModal from '../modais/DeleteModal';
import "./table.css"

const Table = ({formattedData}) => {
    const { deleteService } = useDataContext();

    //estado para averiguar se há algum serviço selecionado para deletar
    const [serviceIdToDelete, setServiceIdToDelete] = useState(null);
    //função deletar serviço
    const handleDelete = (id) => {
        setServiceIdToDelete(id);
    };
    //função modal confirmar para deletar serviço
    const handleConfirmDelete = () => {
        if (serviceIdToDelete) {
          deleteService(serviceIdToDelete);
          setServiceIdToDelete(null);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            setServiceIdToDelete(null);
        }
    };
    useEffect(() => {
        if (serviceIdToDelete != null) {
          document.addEventListener('keydown', handleKeyPress);
    }
    return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
    }, [serviceIdToDelete]);

    const [sortBy, setSortBy] = useState('dataServico');
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

    // Função para ordenar os dados com base na coluna e direção de ordenação
    const sortedData = [...formattedData].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        if (valueA === valueB) {
            return 0;
        }
        if (sortDirection === 'asc') {
            return valueA < valueB ? -1 : 1;
        } else {
            return valueA > valueB ? -1 : 1;
        }
    });


    return (
        <div className="table-container">

            {serviceIdToDelete && (
                <DeleteModal
                isOpen={serviceIdToDelete !== null}
                onCancel={() => setServiceIdToDelete(null)}
                onConfirm={handleConfirmDelete}
                />
            )}

<table className='table'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('titulo')}>Título</th>
                        <th onClick={() => handleSort('dataServico')}>Data</th>
                        <th onClick={() => handleSort('horaInicio')}>Início</th>
                        <th onClick={() => handleSort('horaFinal')}>Fim</th>
                        <th onClick={() => handleSort('Servico.nome')}>Tipo</th>
                        <th onClick={() => handleSort('status')}>Situação</th>
                        <th colSpan="3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map(registro => (
                        <tr key={registro.id}>
                            <td><Link to={`/viewServices/${registro.id}`}>{registro.titulo}</Link></td>
                            <td>{registro.dataServico}</td>
                            <td>{registro.horaInicio}</td>
                            <td>{registro.horaFinal}</td>
                            <td>{registro.Servico ? registro.Servico.nome : 'N/A'}</td>
                            <td><TableSituation title={registro.status} url={`/viewServices/${registro.id}`} /></td>
                            <td onClick={() => handleDelete(registro.id)}><ActionButton legenda="DELETAR SERVIÇO" icon={faTrash} /></td>
                            <td><ActionButton legenda="EDITAR SERVIÇO" icon={faPenToSquare} url={`/editService/${registro.id}`}/></td>
                            <td><ActionButton legenda="VISUALIZAR SERVIÇO" icon={faCircleInfo} url={`/viewServices/${registro.id}`} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;

/* 
<tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td><Link to="/viewServices">Consultoria para agência de Design Zé do Boné</Link></td>
                    <td>01/02/2024</td>
                    <td>13:30</td>
                    <td>17:30</td>
                    <td>Consultoria</td>
                    <td><TableSituation title="Em Análise" type="analysis"/></td>
                    <td><ActionButton icon={faTrash}/></td>
                    <td><ActionButton icon={faPenToSquare} url="/editService"/></td>
                    <td><ActionButton icon={faCircleInfo} url="/viewServices"/></td>
                </tr>
*/