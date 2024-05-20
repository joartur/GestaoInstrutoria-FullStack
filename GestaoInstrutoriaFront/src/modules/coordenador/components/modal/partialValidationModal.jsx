import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import "./partialValidationModal.css"

const PartialValidationModal = ({ onCancel, onConfirm }) => {

    const convertToTimeFormat = (hours) => {
        const totalSeconds = Math.floor(hours * 3600);
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };


    const schema = yup.object().shape({
        total: yup.string().required('O total de horas é obrigatório'),
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
        console.log(formattedData)
        onConfirm(data);
        reset();
    };

    return(
        <div className="deleteModal-overlay">
            <div className="deleteModal-whrapper">
                <div className="deletModal-container">
                    <h2>Justifique disparidade no serviço educacional</h2>
                        
                    <div className="validationModal-forms">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="totalHoras">Confirmar total de horas válidas</label>
                            <input
                                id="totalHoras"
                                name="totalHoras"
                                type="number"
                                className="textInput"
                                placeholder="Confirme o Total de Horas"
                                {...register('total')}
                            />
                            <span className="error-msg">{errors.total && <>{errors.total.message}</>}</span>
                            <label htmlFor="justificativa">Confirmar justificativa de validação</label>
                            <input
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
                                <button type="submit" className="confirm-btn">
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


/*
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import "./partialValidationModal.css"

const PartialValidationModal = ({ onCancel, onConfirm }) => {
    const schema = yup.object().shape({
        total: yup.string().required('O total de horas é obrigatório'),
        justificativa: yup.string().required('A justificativa é obrigatória')
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        onConfirm(data);
        reset();
    };

    return(
        <div className="deleteModal-overlay">
            <div className="deleteModal-wrapper">
                <div className="deleteModal-container">
                    <h2>Justifique disparidade no serviço educacional</h2>
                        
                    <div className="validationModal-forms">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="totalHoras">Confirmar total de horas válidas</label>
                            <input
                                id="totalHoras"
                                name="totalHoras"
                                type="number"
                                className="textInput"
                                placeholder="Confirme o Total de Horas"
                                {...register('total')}
                            />
                            <span className="error-msg">{errors.total && <>{errors.total.message}</>}</span>
                            <label htmlFor="justificativa">Confirmar justificativa de validação</label>
                            <input
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
                                <button type="submit" className="confirm-btn">
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

*/