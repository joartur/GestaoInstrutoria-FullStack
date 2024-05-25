import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../../../../components/buttons/Button";
import "../../../instrutor/components/table/table.css";


const InstrutoresListTable = ({ instructors }) => {
    return (
        <div className="table-container">
            <table className="table">
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
                        <tr key={data.matricula}>
                            <td>{data.matricula}</td>
                            <td>{data.nome}</td>
                            <td>{data.horasTrabalhadas} Horas</td>
                            <td>
                                <Button title="Ver Registros" size="small" url={`/validate/${data.matricula}`} />
                            </td>
                            <td>
                                <Button title="Adicionar Registro" size="small" />
                            </td>
                            <td className="status-sphere-td">
                                <Link to={`/validate/${data.matricula}`}>
                                <div className={`status-sphere ${data.situacao === true ?  "pending" : "conclude"}`}>
                                        <FontAwesomeIcon
                                            icon={data.situacao === true ? faExclamation : faCheck}
                                        />
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    )) : 
                        <tr>
                            <td colSpan={6}>Nenhum instrutor encontrado</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default InstrutoresListTable;
