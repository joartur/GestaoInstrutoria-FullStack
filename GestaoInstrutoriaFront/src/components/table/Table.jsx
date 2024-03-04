import React, { useState } from 'react';
import { faTrash, faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useDataContext } from '../../services/DataContext';
import { Link } from 'react-router-dom';
import TableSituation from "./TableSituation"
import ActionButton from "./ActionButton"
import DeleteModal from '../modais/DeleteModal';
import moment from 'moment';
import 'moment/locale/pt-br';
import "./table.css"

const Table = () => {
    const { data, deleteService } = useDataContext();

    const [serviceIdToDelete, setServiceIdToDelete] = useState(null);

    const handleDelete = (id) => {
        setServiceIdToDelete(id);
    };
    const handleConfirmDelete = () => {
        if (serviceIdToDelete) {
          deleteService(serviceIdToDelete);
          setServiceIdToDelete(null);
        }
    };

    const formattedServices = data.map(service => {
        const dataServico = moment.utc(service.dataServico).local().format('DD/MM/YYYY');
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
                    <th><input type="checkbox" name="select" id="select" /></th>
                    <th>Título</th>
                    <th>Data</th>
                    <th>Início</th>
                    <th>Fim</th>
                    <th>Tipo</th>
                    <th>Situação</th>
                    <th colSpan="3">Ações</th>
                </tr>
            </thead>
                    <tbody>
                        { data ? (
                        formattedServices.map(registro => (
                        <tr key={registro.id}>
                            <td><input type="checkbox" name="checkbox" id={registro.id} /></td>
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
                        ))) : 
                        null
                        }
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