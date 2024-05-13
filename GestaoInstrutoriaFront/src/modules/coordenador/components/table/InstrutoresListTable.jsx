import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCoordenadorContext } from "../../services/CoordenadorContext"
import Button from "../../../../components/buttons/Button";
import "../../../instrutor/components/table/table.css"

const InstrutoresListTable = () => {
    const { instructors } = useCoordenadorContext();

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
            {instructors && instructors.length > 0 ? instructors.map(data => (
                <tr key={data.matricula}> {/* Adicionamos a chave única para cada linha */}
                    <td>{data.matricula}</td>
                    <td>{data.nome}</td>
                    <td>{data.horasTrabalhadas} Horas</td>
                    <td><Button title="Ver Registros" size="small"/></td>
                    <td><Button title="Adicionar Registro" size="small"/></td>
                    <td className="status-sphere-td">
                        <Link to="/">
                        <FontAwesomeIcon className="status-sphere conclude" icon={faCheck} />
                        </Link>
                    </td>
                </tr>
                )) : null}
            </tbody>
        </table>
    )
}


export default InstrutoresListTable;