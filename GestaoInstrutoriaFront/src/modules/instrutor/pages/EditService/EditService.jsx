import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import Layout from "../../components/layout/Layout"
import Header from "../../../../components/header/Header";
import { useParams } from 'react-router-dom';
import { useDataContext } from '../../services/DataContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditModal from "../../components/modais/EditModal";
import Loading from '../../pages/loading/Loading';
import * as yup from 'yup';
import axios from 'axios';
import "./editService.css"

const EditService = () => {
    const { id } = useParams();
    const { editService, errorMsg, serviceEdited, setServiceEdited, serviceTypes } = useDataContext();
    const [service, setService] = useState(null);

    const closeModal = () => {
        setServiceEdited(false);
    };

    const schema = yup.object().shape({
        titulo: yup.string().required('O título é obrigatório'),
        dataServico: yup.string().required('A data do serviço é obrigatória'),
        horaInicio: yup.string().required('A hora de início é obrigatória'),
        horaFinal: yup.string().required('A hora final é obrigatória'),
        FKservico: yup.string().required('O tipo de serviço é obrigatório'),
        descricao: yup.string().required('A descrição é obrigatória'),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/instrutor/registro/123456/${id}`);
                setService(response.data.data);
                setValue('titulo', response.data.data.titulo);
                setValue('dataServico', response.data.data.dataServico);
                setValue('horaInicio', response.data.data.horaInicio);
                setValue('horaFinal', response.data.data.horaFinal);
                setValue('FKservico', response.data.data.Servico.id);
                setValue('descricao', response.data.data.descricao);
                console.log(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do serviço:', error);
            }
        };

        fetchServiceDetails();
    }, []);

    const onSubmit = async (data) => {
        await editService(id, data);
    };

    if (!service) {
        return <Loading />
    }

    return (
        <Layout>
            <Header title="Editar Serviço Educacional" description="Preencha os dados e edite seu registro de serviço educacional" />
            <main>
                <div className="createServiceForm-container">
                    <div className="createServiceForm-header">
                        <p>Edite as Informações do Seu Serviço Educacional</p>
                        <div className="createServiceForm-header-info">
                            <h3>Título:</h3><span>{service.titulo}</span>
                        </div>
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
                                {serviceTypes ? (
                                    serviceTypes.map(service => (
                                        <option value={service.id} key={service.id}>{service.nome}</option>
                                ))
                                ) : (null)}
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
                        {serviceEdited && (
                            <EditModal
                                onCancel={closeModal}
                                onClick={closeModal}
                            />
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default EditService;
