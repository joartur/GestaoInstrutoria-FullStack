import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import Layout from "../../components/layout/Layout";
import Header from "../../components/header/Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useDataContext } from '../../services/DataContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditModal from "../../components/modais/EditModal"
import * as yup from 'yup';
import axios from 'axios';
import "../EditService/editService.css"

const EditService = () => {
    const { id } = useParams();
    const { editService, errorMsg } = useDataContext();
    const [service, setService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                setValue('FKservico', ""); //response.data.data.Servico.valor
                setValue('descricao', response.data.data.descricao);
            } catch (error) {
                console.error('Erro ao buscar detalhes do serviço:', error);
            }
        };

        fetchServiceDetails();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        setIsModalOpen(true);
    };

    const handleConfirmEdit = async () => {
        await editService(id, service);
        setIsModalOpen(false);
    };

    const handleCancelEdit = () => {
        setIsModalOpen(false);
    };

    if (!service) {
        return <div>Carregando...</div>;
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
                            {/* Restante do formulário aqui */}
                            <div className="error-container">
                                {errorMsg ? (<span className="error-msg">{errorMsg.error}</span>) : null}
                            </div>
                            <button className="main-btn medium">Enviar</button>
                        </form>
                        {isModalOpen && (
                            <EditModal
                                onCancel={handleCancelEdit}
                                onClick={handleConfirmEdit}
                            />
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default EditService;
