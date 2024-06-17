import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import "./partialValidationModal.css"

const PartialValidationModal = ({ onCancel, onConfirm }) => {

    const convertToTimeFormat = (time) => {
        const [hours, minutes] = time.split(':');
        const totalSeconds = (parseInt(hours, 10) * 3600) + (parseInt(minutes, 10) * 60);
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const schema = yup.object().shape({
        total: yup.string().required('O total de horas é obrigatório').matches(/^\d{2}:\d{2}$/, 'Formato de tempo inválido'),
        justificativa: yup.string().required('A justificativa é obrigatória')
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            total: convertToTimeFormat(data.total)
        };
        console.log(formattedData);
        onConfirm(formattedData);
        reset();
    };

    return(
        <div className="deleteModal-overlay">
            <div className="modal-whrapper">
                <div className="modal-container">
                    <h2>Justifique disparidade no serviço educacional</h2>
                        
                    <div className="validationModal-forms">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="totalHoras">Confirmar total de horas válidas</label>
                            <input
                                id="totalHoras"
                                name="total"
                                type="time"
                                className="textInput"
                                placeholder="Confirme o Total de Horas"
                                defaultValue="00:00"
                                {...register('total')}
                            />
                            <span className="error-msg">{errors.total && <>{errors.total.message}</>}</span>
                            <label htmlFor="justificativa">Confirmar justificativa de validação</label>
                            <textarea
                                id="justificativa"
                                name="justificativa"
                                type="text"
                                className="textInput"
                                placeholder="Adicione a Justificativa da Validação"
                                {...register('justificativa')}
                            />
                            <span className="error-msg">{errors.justificativa && <>{errors.justificativa.message}</>}</span>
                            <div className="deleteModal-buttons">
                                <button className="cancel-btn" type="button" onClick={onCancel}>
                                    Cancelar
                                </button>
                                <button type="submit" className="partialValidation-btn">
                                    Validar
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <p>Aperte "Esc" para Continuar</p>
                </div>
            </div>
        </div>
    )
}

export default PartialValidationModal;
