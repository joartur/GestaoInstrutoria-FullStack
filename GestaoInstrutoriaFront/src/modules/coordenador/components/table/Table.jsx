import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/buttons/Button";

const Table = () => {
    return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Matrícula do Instrutor</th>
                        <th>Nome do Instrutor</th>
                        <th>Total de Horas</th>
                        <th colSpan={2}>Ações</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>f95060010</td>
                        <td>Carlos Drummond de Andrade</td>
                        <td>10 Horas</td>
                        <td><Button title="Ver Registros" size="small"/></td>
                        <td><Button title="Adicionar Registro" size="small"/></td>
                        <td className="status-sphere-td"><FontAwesomeIcon className="status-sphere conclude" icon={faCheck} /></td>
                    </tr>
                </tbody>
            </table>
    )
}

export default Table;