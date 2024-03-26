import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/header/Header"
import Layout from "../../components/layout/Layout"
import BigInput from "../../components/inputs/BigInput"
import TableSituation from "../../components/table/TableSituation"
import Loading from '../loading/Loading';
import "./viewServices.css"

const ViewServices = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/instrutor/registro/123456/${id}`);
            setService(response.data.data);
            console.log(response.data.data);
          } catch (error) {
            console.error('Erro ao buscar detalhes do serviço:', error);
          }
        };
    
        fetchServiceDetails();
    }, [id]);

    if (!service) {
        return <Loading />
    }

    const [ano, mes, dia] = service.dataServico.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const [horaInicial, minutoInicial] = service.horaInicio.split(":");
    const horaInicioFormatada = `${horaInicial}:${minutoInicial}`;
    const [horaFim, minutoFim] = service.horaFinal.split(":");
    const horaFinalFormatada = `${horaFim}:${minutoFim}`;
    const horaTotal = service.total.split(":")[0]

    return (
        <Layout>
            <Header title="Serviço Educacional Cadastrado" description="Veja as informações do serviço educacional que você cadastrou!"/>
            <main className="viewServices-container">
                <div className="title-container">
                    <h1>{service.titulo}</h1>
                </div>

                <div className="situation-container">
                    <TableSituation title={service.status}/>
                </div>

                <div className="serviceInfo-container">
                    <div className="hour-info">
                        <strong>Data: </strong><span>{dataFormatada}</span>
                        <strong>Tipo de Serviço: </strong><span>{service.Servico.nome}</span>
                    </div>
                    <div className="time-info">
                        <strong>Horário Inincial: </strong><span>{horaInicioFormatada}</span>
                        <strong>Horário Final: </strong><span>{horaFinalFormatada}</span>
                        <strong>Total de Horas: </strong><span>{horaTotal} {horaTotal > 1 || horaTotal == 0 ? "Horas": "Hora"}</span>
                    </div>
                    <div className="description-info">
                        <h2>Descrição do Serviço Educacional:</h2>
                        <BigInput
                        id="description"
                        name="description"
                        value={service.descricao || ''}
                        disabled={true}
                        />
                    </div>
                    <div className="justify-container">
                        <h2>Justificativa do Coordenador:</h2>
                        <div className="justify-info">
                            <BigInput
                            id="justify"
                            name="justify"
                            value={service.justificativa || ''}
                            disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default ViewServices;

/* 
<div className="justify-name">
                                <strong>Justificado por: </strong><span>Nome do Coordenador de Área</span>
                            </div>
                            <div className="justify-date">
                                <strong>Justificado em: </strong><span>01/02/2024</span>
                            </div>
                            
                            //

                            <div className="profileButtons-container">
                            <Button title="Editar" size="medium" icon={faPenToSquare} url="/editService"/>
                            <Button title="Deletar" size="medium" icon={faTrash}/>
                    </div>
*/