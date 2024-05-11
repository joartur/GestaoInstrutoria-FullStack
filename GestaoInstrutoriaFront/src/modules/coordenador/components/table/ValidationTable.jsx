import ValidationButtons from "./ValidationButtons";
import { faCheck, faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const ValidationTable = () => {
    return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Hora Inicial</th>
                        <th>Hora Final</th>
                        <th>Total de Horas</th>
                        <th>Tipo</th>
                        <th>Autor</th>
                        <th colSpan={3}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Consultoria para agência de Design Zé do Boné</td>
                        <td>29/01/2024</td>
                        <td>13:30</td>
                        <td>17:30</td>
                        <td>4 Horas</td>
                        <td>Consultoria</td>
                        <td>Carlos Drummond</td>
                        <td><ValidationButtons
                        type="accept"
                        icon={faCheck}
                        legenda="VALIDAR SERVIÇO EDUCACIONAL"
                        /></td>
                        <td><ValidationButtons
                        type="reject"
                        icon={faXmark}
                        legenda="REJEITAR SERVIÇO EDUCACIONAL"
                        /></td>
                        <td><ValidationButtons
                        type="view"
                        icon={faCircleInfo}
                        legenda="VISUALIZAR SERVIÇO EDUCACIONAL"
                        /></td>
                    </tr>
                </tbody>
            </table>
    )
}

export default ValidationTable;