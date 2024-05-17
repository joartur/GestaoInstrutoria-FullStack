import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import "./partialValidationModal.css"

const PartialValidationModal = (props) => {

    const schema = yup.object().shape({
        total: yup.string().required('O total de horas é obrigatório'),
        justificativa: yup.string().required('A justificativa é obrigatória')
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        console.log(data)
        reset()
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
                        </form>
                    </div>
                    

                <h2>Essa ação não pode ser revertida</h2>
                <div className="deleteModal-buttons">
                        <button className="cancel-btn" onClick={props.onCancel}>
                            Cancelar
                        </button>
                    <button type="submit" className="confirm-btn" onClick={props.onConfirm}>
                        Validar
                    </button>
                </div>
                <p>Aperte "Esc" para Continuar</p>
            </div>
        </div>
        </div>
    )
}

export default PartialValidationModal;