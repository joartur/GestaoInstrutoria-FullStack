import { useEffect, useState, useCallback } from "react";
import ValidationButtons from "./ValidationButtons";
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import { faCheck, faXmark, faCircleInfo, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../components/modal/Modal";
import PartialValidationModal from "../modal/partialValidationModal";
import useEscapeKeyPress from "../../../../hooks/useEscapeKeyPress";
import useFormattedDateTime from "../../../../hooks/useFormattedDateTime";
import ConfirmationModal from "../modal/ConfirmationModal";

const ValidationTable = ({ id }) => {
    const { fetchInstructorRegisters, validateInstructorRegister, partiallyValidateInstructorRegister } = useCoordenadorContext();

    const [instructorRegisters, setInstructorRegisters] = useState([]);
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
                await validateInstructorRegister(serviceIdToValidate, "123456");
                setServiceIdToValidate(null);
                setConfirmationMessage(["Confirmação", "Serviço educacional validado com sucesso!"]);
                setShowConfirmationModal(true);
                await fetchData(); // Atualizar a lista de registros
            } catch (error) {
                setServiceIdToValidate(null);
                if (error.response?.status === 400) {
                    setConfirmationMessage(["Falha", "Justificativa inválida"]);
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
        if (serviceIdToPartialValidate) {
            try {
                await partiallyValidateInstructorRegister(serviceIdToPartialValidate, "123456", data.justificativa, data.total);
                setServiceIdToPartialValidate(null);
                setConfirmationMessage(["Confirmação", "Serviço educacional validado com sucesso!"]);
                setShowConfirmationModal(true);
                await fetchData();
            } catch (error) {
                setServiceIdToPartialValidate(null);
                if (error.response.request?.status === 400) {
                    setConfirmationMessage(["Falha", error.response.data.error]);
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

    const fetchData = useCallback(async () => {
        try {
            const data = await fetchInstructorRegisters(id);
            setInstructorRegisters(data);
        } catch (error) {
            console.error("Erro ao buscar registros do instrutor:", error);
        }
    }, [fetchInstructorRegisters, id]);
    

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                    {instructorRegisters.map(register => (
                        <tr key={register.id}>
                            <td>{register.titulo}</td>
                            <td>{register.dataServico}</td>
                            <td>{register.horaInicio}</td>
                            <td>{register.horaFinal}</td>
                            <td>{register.total}</td>
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
                                    url={`/viewServices/${id}`}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ValidationTable;
