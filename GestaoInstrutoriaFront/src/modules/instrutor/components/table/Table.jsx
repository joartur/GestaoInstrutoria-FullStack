import React, { useState } from 'react';
import { faTrash, faPenToSquare, faCircleInfo, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDataContext } from '../../services/DataContext';
import { Link } from 'react-router-dom';
import TableSituation from "./TableSituation"
import ActionButton from "./ActionButton"
import DeleteModal from '../modais/DeleteModal';
import useEscapeKeyPress from "../../../../hooks/useEscapeKeyPress";
import "./table.css"

const Table = ({formattedData, handleSort, sortDirection, sortBy}) => {
    const { deleteService } = useDataContext();

    //estado para averiguar se há algum serviço selecionado para deletar
    const [serviceIdToDelete, setServiceIdToDelete] = useState(null);
    //função deletar serviço
    const handleDelete = (id) => {
        setServiceIdToDelete(id);
    };
    //função modal confirmar para deletar serviço
    const handleConfirmDelete = () => {
        //Se houver algum serviço selecionado, ele chama a função de deletar (API)
        if (serviceIdToDelete) {
          deleteService(serviceIdToDelete);
          //registra que não há serviços selecionados para deletar
          setServiceIdToDelete(null);
        }
    };
    //Fecha o modal ao apertar "ESC"  
    const closeModal = () => {
        setServiceIdToDelete(null);
    };
    useEscapeKeyPress(closeModal, [serviceIdToDelete]);


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
                    <th className="clickableTh" onClick={() => handleSort('titulo')}>
                        Título {sortBy === 'titulo' && (sortDirection === 'desc' ? <span><FontAwesomeIcon icon={faArrowUp} /></span> : <span><FontAwesomeIcon icon={faArrowDown} /></span>)}
                    </th>
                    <th className="clickableTh" onClick={() => handleSort('dataServico')}>
                        Data {sortBy === 'dataServico' && (sortDirection === 'desc' ? <span><FontAwesomeIcon icon={faArrowUp} /></span> : <span><FontAwesomeIcon icon={faArrowDown} /></span>)}
                    </th>
                    <th className="clickableTh" onClick={() => handleSort('horaInicio')}>
                        Início {sortBy === 'horaInicio' && (sortDirection === 'desc' ? <span><FontAwesomeIcon icon={faArrowUp} /></span> : <span><FontAwesomeIcon icon={faArrowDown} /></span>)}
                    </th>
                    <th className="clickableTh" onClick={() => handleSort('horaFinal')}>
                        Fim {sortBy === 'horaFinal' && (sortDirection === 'desc' ? <span><FontAwesomeIcon icon={faArrowUp} /></span> : <span><FontAwesomeIcon icon={faArrowDown} /></span>)}
                    </th>
                    <th>Tipo</th>
                    <th>Situação</th>
                    <th colSpan="3">Ações</th>
                </tr>
                </thead>
                <tbody>
                    {formattedData.map(registro => (
                        <tr key={registro.id}>
                            <td><Link to={`/viewServices/${registro.id}`}>{registro.titulo}</Link></td>
                            <td>{registro.dataServico}</td>
                            <td>{registro.horaInicio}</td>
                            <td>{registro.horaFinal}</td>
                            <td>{registro.Servico ? registro.Servico.nome : 'N/A'}</td>
                            <td className="situationTd">
                                <TableSituation
                                title={registro.status}
                                url={`/viewServices/${registro.id}`}
                                />
                            </td>
                            <td onClick={() => handleDelete(registro.id)}>
                                <ActionButton
                                    legenda="DELETAR SERVIÇO"
                                    icon={faTrash}
                                    status={registro.status}
                                />
                            </td>
                            <td>
                                <ActionButton
                                    legenda="EDITAR SERVIÇO"
                                    icon={faPenToSquare}
                                    url={`/editService/${registro.id}`}
                                    status={registro.status}
                                />
                            </td>
                            <td>
                                <ActionButton
                                    legenda="VISUALIZAR SERVIÇO"
                                    icon={faCircleInfo}
                                    url={`/viewServices/${registro.id}`}
                                    status={registro.status}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;