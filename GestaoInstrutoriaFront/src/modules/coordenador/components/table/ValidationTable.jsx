import { useEffect, useState } from "react";
import ValidationButtons from "./ValidationButtons";
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import { faCheck, faXmark, faCircleInfo, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../components/modal/Modal";
import PartialValidationModal from "../modal/partialValidationModal";
import useEscapeKeyPress from "../../../../hooks/useEscapeKeyPress";

const ValidationTable = ({id}) => {
    const { fetchInstructorRegisters, validateInstructorRegister, partiallyValidateInstructorRegister } = useCoordenadorContext();
    //Armazena registros do instrutor pelo ID
    const [instructorRegisters, setInstructorRegisters] = useState([]);

    //Armazena variável do ID de registro para validar
    const [serviceIdToValidate, setServiceIdToValidate] = useState(null);
    //Armazena variável do ID de registro para validar parcialmente
    const [serviceIdToPartialValidate, setServiceIdToPartialValidate] = useState(null);
    //Função que diz que registro deve ser validado
    const handleAccept = (id) => {
        setServiceIdToValidate(id)
    };
    const handlePartiallyValidate = (id) => {
        setServiceIdToPartialValidate(id);
    };
    //Função para validar registo
    const handleConfirmValidation = () => {
        if (serviceIdToValidate) {
            validateInstructorRegister(serviceIdToValidate, "123456");
            setServiceIdToValidate(null);
        }
    };
    const handleConfirmPartialValidation = (id, data) => {
        if (serviceIdToPartialValidate) {
            partiallyValidateInstructorRegister(serviceIdToPartialValidate, id, data)
            setServiceIdToPartialValidate(null);
        }
    };
    //Função para fechar o modal
    const closeModal = () => {
        setServiceIdToValidate(null);
    };
    //Função para fechar o modal ao apertar "ESC"
    useEscapeKeyPress(closeModal, [serviceIdToValidate]);

    //Função para fechar o modal
    const closePartialValidationModal = () => {
        setServiceIdToPartialValidate(null);
    };
    //Função para fechar o modal ao apertar "ESC"
    useEscapeKeyPress(closePartialValidationModal, [serviceIdToPartialValidate]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInstructorRegisters(id);
                setInstructorRegisters(data);
            } catch (error) {
                console.error("Erro ao buscar registros do instrutor:", error);
            }
        };
        fetchData();
    }, [fetchInstructorRegisters, id]);

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
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ValidationTable;