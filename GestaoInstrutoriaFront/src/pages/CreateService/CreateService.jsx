import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import Layout from "../../components/layout/Layout";
import Header from "../../components/header/Header";
import { useDataContext } from '../../services/DataContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ConfirmationModal from "../../components/modais/ConfirmationModal";
import * as yup from 'yup';
import "./createService.css"

function CreateService () {
    const { createEducationalService, errorMsg, serviceCreated, setServiceCreated } = useDataContext();

    const closeModal = () => {
        setServiceCreated(false);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
    };

    const schema = yup.object().shape({
        titulo: yup.string().required('O título é obrigatório'),
        dataServico: yup.string().required('A data do serviço é obrigatória'),
        horaInicio: yup.string().required('A hora de início é obrigatória'),
        horaFinal: yup.string().required('A hora final é obrigatória'),
        FKservico: yup.string().required('O tipo de serviço é obrigatório'),
        descricao: yup.string().required('A descrição é obrigatória'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await createEducationalService(data);
    };

    useEffect(() => {
        if (serviceCreated) {
          document.addEventListener('keydown', handleKeyPress);
    }
    return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
    }, [serviceCreated]);

    return (
        <Layout>
            <Header title="Adicionar Serviço Educacional" description="Preencha os dados e adicione seu registro de serviço educacional"/>
            <main>
                <div className="createServiceForm-container">
                    <div className="createServiceForm-header">
                        <p>Insira as informações da atividade realizada</p>
                        <hr />
                    </div>
                    <div className="createServiceForm-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="titulo">Título:</label>
                            <input
                                id="titulo"
                                name="titulo"
                                type="text"
                                className="textInput"
                                placeholder="Insira o Título do Serviço Educacional"
                                {...register('titulo')}
                            />
                            <span className="error-msg">{errors.titulo && <>{errors.titulo.message}</>}</span>
                        </div>
                        <div className="dateInput-container">
                            <label htmlFor="dataServico"><FontAwesomeIcon icon={faCalendar} className="icon"/>Data do Serviço:</label>
                            <input
                                id="dataServico"
                                name="dataServico"
                                type="date"
                                {...register('dataServico')}
                            />
                            <span className="error-msg">{errors.dataServico && <>{errors.dataServico.message}</>}</span>
                        </div>

                        <div className="timeInput-container">
                            <div className="timeInput-box">
                                <label htmlFor="horaInicio"><FontAwesomeIcon icon={faClock} className="icon"/>Hora de Início:</label>
                                <input
                                    id="horaInicio"
                                    name="horaInicio"
                                    type="time"
                                    {...register('horaInicio')}
                                />
                                <span className="error-msg">{errors.horaInicio && <>{errors.horaInicio.message}</>}</span>
                            </div>
                            <div className="timeInput-box">
                                <label htmlFor="horaFinal"><FontAwesomeIcon icon={faClock} className="icon"/>Hora Final:</label>
                                <input
                                    id="horaFinal"
                                    name="horaFinal"
                                    type="time"
                                    {...register('horaFinal')}
                                />
                                <span className="error-msg">{errors.horaFinal && <>{errors.horaFinal.message}</>}</span>
                            </div>
                        </div>                       
                        <div>
                            <label htmlFor="FKservico">Tipo de Serviço:</label>
                            <select id="FKservico" name="FKservico" {...register('FKservico')}>
                                <option value="">Escolha a atividade</option>
                                <option value="1">Consultoria</option>
                                <option value="2">Monitoria</option>
                                <option value="3">Aula</option>
                            </select>
                            <span className="error-msg">{errors.FKservico && <>{errors.FKservico.message}</>}</span>
                        </div>

                        <div>
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                className="BigInput"
                                placeholder="Insira a Descrição do Serviço Educacional"
                                {...register('descricao')}
                            />
                            <span className="error-msg">{errors.descricao && <>{errors.descricao.message}</>}</span>
                        </div>

                        <div className="error-container">
                            {errorMsg ? (<span className="error-msg">{errorMsg.error}</span>) : null}
                        </div>
                        <button type="submit" className="main-btn medium">Enviar</button>
                        </form>
                        {serviceCreated && <ConfirmationModal onClick={closeModal} onCancel={closeModal}/>}
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default CreateService;