import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
import Layout from "../../components/layout/Layout"
import Header from "../../components/header/Header"
import TextInput from "../../components/inputs/TextInput"
import DateInput from '../../components/inputs/DateInput'
import BigInput from '../../components/inputs/BigInput'
import Button from '../../components/buttons/Button'
import TimeInput from '../../components/inputs/TimeInput'
import { useDataContext } from '../../services/DataContext';
import axios from 'axios';
import "./createService.css"

function CreateService () {
    const { createEducationalService } = useDataContext();

    const [formData, setFormData] = useState({
        
            dataServico: "",
            horaInicio: "",
            horaFinal: "",
            titulo: "",
            descricao: "",
            FKservico: ""
          
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/instrutor/registro/123456', formData)
          .then((res) => {
            console.log('Dados enviados:', res.data);
          })
          .catch((err) => {
            console.error('Erro ao enviar dados:', err);
          });
    };

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
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Data do Serviço:</label>
                            <input
                            type="date"
                            name="dataServico"
                            value={formData.dataServico}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Hora de Início:</label>
                            <input
                            type="time"
                            name="horaInicio"
                            value={formData.horaInicio}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Hora Final:</label>
                            <input
                            type="time"
                            name="horaFinal"
                            value={formData.horaFinal}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Título:</label>
                            <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Descrição:</label>
                            <textarea
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>FK Serviço:</label>
                            <input
                            type="text"
                            name="FKservico"
                            value={formData.FKservico}
                            onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default CreateService;

/*

<label>Tipo de Serviço: {formData.FKServico}</label>
                                <select name="FKServico" value={formData.FKServico} onChange={handleChange}>
                                <option value="">Escolha a atividade </option>
                                <option value="1">Consultoria</option>
                                <option value="2">Monitoria</option>
                                <option value="3">Aula</option>
                            </select>

<label htmlFor="">Título do Serviço Educacional</label>
                            <TextInput placeholder= "Título do Serviço Educacional Prestado"/>
                            <div className="dateInput-container">
                                <label htmlFor=""><FontAwesomeIcon icon={faCalendar} className="icon"/>Data</label>
                                <DateInput />
                            </div>
                            <div className="timeInput-container">
                                <div className="timeInput-box">
                                    <label htmlFor=""><FontAwesomeIcon icon={faClock} className="icon"/>Início (Hora)</label>
                                    <TimeInput />
                                </div>
                                <div className="timeInput-box">
                                    <label htmlFor=""><FontAwesomeIcon icon={faClock} className="icon"/>Fim (Hora)</label>
                                    <TimeInput />
                                </div>
                            </div>

                            <div className="selectInput-container">
                            <label htmlFor="">Selecione a Atividade:</label>
                            <select name="" id="">
                                <option value="">Escolha</option>
                            </select>
                            </div>
                                                      
                            <div className="descriptionInput-container">
                                <label htmlFor="">Descrição da Atividade:</label>
                                <BigInput placeholder="Descreva a atividade realizada com pelo menos 50 palavras" />
                            </div>
                            
                            <Button title="Salvar" size="medium"/>
*/