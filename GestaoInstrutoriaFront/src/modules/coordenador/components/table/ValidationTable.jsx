import { useState} from "react";
import ValidationButtons from "./ValidationButtons";
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import { faCheck, faXmark, faCircleInfo, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../components/modal/Modal";
import PartialValidationModal from "../modal/partialValidationModal";
import useEscapeKeyPress from "../../../../hooks/useEscapeKeyPress";
import ConfirmationModal from "../modal/ConfirmationModal";

const ValidationTable = ({ instructorRegisters, fetchData }) => {
    const { validateInstructorRegister, partiallyValidateInstructorRegister } = useCoordenadorContext();

    const [serviceIdToValidate, setServiceIdToValidate] = useState(null);
    const [serviceIdToPartialValidate, setServiceIdToPartialValidate] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState([]);

    const handleAccept = (id) => {
        setServiceIdToValidate(id);
    };
    const handlePartiallyValidate = (id) => {
        setServiceIdToPartialValidate(id);
    };

    const handleConfirmValidation = async () => {
        if (serviceIdToValidate) {
            try {
                await validateInstructorRegister("1234567890", serviceIdToValidate);
                setServiceIdToValidate(null);
                setConfirmationMessage(["Confirmação", "Serviço educacional validado com sucesso!"]);
                setShowConfirmationModal(true);
                await fetchData(); // Atualizar a lista de registros
            } catch (error) {
                setServiceIdToValidate(null);
                if (error.response?.status === 400) {
                    setConfirmationMessage(["Falha", error.response?.data.error]);
                } else if (error.response?.status === 500) {
                    setConfirmationMessage(["Falha", "Erro interno do servidor"]);
                } else {
                    setConfirmationMessage(["Falha", "Erro ao validar serviço"]);
                }
                setShowConfirmationModal(true);
                console.error("Erro ao validar o serviço:", error);
            }
        }
    };

    const handleConfirmPartialValidation = async (data) => {
        console.log(data.justificativa, data.total)

        if (serviceIdToPartialValidate) {
            try {
                await partiallyValidateInstructorRegister("1234567890", serviceIdToPartialValidate, data.justificativa, data.total);
                setServiceIdToPartialValidate(null);
                setConfirmationMessage(["Confirmação", "Serviço educacional validado com sucesso!"]);
                setShowConfirmationModal(true);
                await fetchData();
            } catch (error) {
                setServiceIdToPartialValidate(null);
                if (error.response?.request?.status === 400) {
                    setConfirmationMessage(["Falha", error.response?.data.error]);
                } else if (error.response?.status === 500) {
                    setConfirmationMessage(["Falha", "Erro interno do servidor"]);
                } else {
                    setConfirmationMessage(["Falha", "Erro ao tentar validar parcialmente esse serviço"]);
                }
                setShowConfirmationModal(true);
                console.error("Erro ao validar parcialmente o serviço:", error);
            }
        }
    };

    const closeModal = () => {
        setServiceIdToValidate(null);
    };
    useEscapeKeyPress(closeModal, [serviceIdToValidate]);
    const closePartialValidationModal = () => {
        setServiceIdToPartialValidate(null);
    };
    useEscapeKeyPress(closePartialValidationModal, [serviceIdToPartialValidate]);
    useEscapeKeyPress(() => {setShowConfirmationModal(false)}, [showConfirmationModal]);


    return (
        <div className="table-container">
            {serviceIdToValidate && (
                <Modal 
                    title="Tem certeza que deseja validar esse serviço educacional?"
                    subtitle="Essa ação não pode ser revertida"
                    modalIcon={faCircleCheck}
                    mainButtonTitle="Validar"
                    onCancel={() => setServiceIdToValidate(null)}
                    onConfirm={handleConfirmValidation}
                />
            )}
            {serviceIdToPartialValidate && (
                <PartialValidationModal
                    onCancel={() => setServiceIdToPartialValidate(null)}
                    onConfirm={handleConfirmPartialValidation}
                />
            )}
            {showConfirmationModal && (
                <ConfirmationModal
                    message={confirmationMessage}
                    onClose={() => setShowConfirmationModal(false)}
                />
            )}
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Hora Inicial</th>
                        <th>Hora Final</th>
                        <th>Total de Horas</th>
                        <th>Tipo</th>
                        <th colSpan={3}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {instructorRegisters && instructorRegisters.length > 0 ? instructorRegisters.map(register => (
                        <tr key={register.id}>
                            <td>{register.titulo}</td>
                            <td>{register.dataServico}</td>
                            <td>{register.horaInicio}</td>
                            <td>{register.horaFinal}</td>
                            <td>{register.total} Horas</td>
                            <td>{register.Servico.nome}</td>
                            <td>
                                <ValidationButtons
                                    type="accept"
                                    icon={faCheck}
                                    legenda="VALIDAR SERVIÇO EDUCACIONAL"
                                    onClick={() => handleAccept(register.id)}
                                />
                            </td>
                            <td>
                                <ValidationButtons
                                    type="reject"
                                    icon={faXmark}
                                    legenda="REJEITAR SERVIÇO EDUCACIONAL"
                                    onClick={() => handlePartiallyValidate(register.id)}
                                />
                            </td>
                            <td>
                                <ValidationButtons
                                    type="view"
                                    icon={faCircleInfo}
                                    legenda="VISUALIZAR SERVIÇO EDUCACIONAL"
                                    url={`/viewServices/${register.id}`}
                                />
                            </td>
                        </tr>
                    )): 
                    <tr>
                        <td colSpan={7}>Nenhum registro encontrado</td>
                    </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ValidationTable;
