import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import Layout from "../../components/layout/Layout"
import { useParams } from 'react-router-dom';
import Header from "../../../../components/header/Header";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCoordenadorContext } from "../../services/CoordenadorContext";
import useEscapeKeyPress from "../../../../hooks/useEscapeKeyPress";
import * as yup from 'yup';
import "./createService.css"

function CreateService () {
    const { id } = useParams();
    const { createInstructorRegister } = useCoordenadorContext();

    const [inputCount, setInputCount] = useState(0);
    
    const schema = yup.object().shape({
        titulo: yup.string().required('O título é obrigatório'),
        dataServico: yup.string().required('A data do serviço é obrigatória'),
        horaInicio: yup.string().required('A hora de início é obrigatória'),
        horaFinal: yup.string().required('A hora final é obrigatória'),
        FKservico: yup.string().required('O tipo de serviço é obrigatório'),
        descricao: yup.string().required('A descrição é obrigatória'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const formatTime = (time) => {
        return time + ":00";
    };

    const onSubmit = async (data) => {
        data.horaInicio = formatTime(data.horaInicio);
        data.horaFinal = formatTime(data.horaFinal);
        createInstructorRegister(id, "1234567890", data)
        console.log(data)
        reset()
        setInputCount(0)
    };

    return (
        <Layout>
            <Header title="Adicionar Serviço Educacional" description="Preencha os dados e adicione seu registro de serviço educacional"/>
            <main>
                <div className="createServiceForm-container">
                    <div className="createServiceForm-header">
                        <div className="createServiceForm-Title">
                            <p>Adicionar Registro Educacional Para: </p><span>{id}</span>
                        </div>
                        <hr />
                    </div>
                    <div className="createServiceForm-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="title-label">
                                <label htmlFor="titulo">Título do Serviço Educacional:</label>
                                <span><p className={inputCount === 50? "p-red": "p-grey"}>{inputCount}/50</p></span>
                            </div>
                            
                            <input
                                id="titulo"
                                name="titulo"
                                type="text"
                                className="textInput"
                                
                                maxLength="50"
                                placeholder='Insira um título que resuma o seu serviço educacional, por exemplo: "Palestra Sobre Criatividade". '
                                {...register('titulo')}
                                onChange={(e) => setInputCount(e.target.value.length)}
                            />
                            <span className="error-msg">{errors.titulo && <>{errors.titulo.message}</>}</span>
                        </div>
                        
                        <div className="timeInput-container">
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
                                <option value="1">Valha</option>
                            </select>
                            <span className="error-msg">{errors.FKservico && <>{errors.FKservico.message}</>}</span>
                        </div>

                        <div>
                            <label htmlFor="descricao">Descrição do Serviço Educacional:</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                className="BigInput"
                                placeholder='Descreva brevemente seu serviço educacional. Por exemplo: "Apresentei a palestra sobre criatividade no auditório do Senac RN, exemplifiquei técnicas práticas para estimular a imaginação no ambiente de trabalho." '
                                {...register('descricao')}
                            />
                            <span className="error-msg">{errors.descricao && <>{errors.descricao.message}</>}</span>
                        </div>

                        <div className="error-container">
                        </div>
                        <button type="submit" className="main-btn medium">Enviar</button>
                        </form>

                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default CreateService;