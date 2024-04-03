import React, { useState } from 'react';
import { useDataContext } from '../../services/DataContext';
import "./filterModal.css"

const FilterModal = ({ onClose }) => {
    const { serviceTypes, filterRegister } = useDataContext();

    const [formData, setFormData] = useState({
        horaInicio: '',
        horaFinal: '',
        tipoServico: '',
        dataInicial: '',
        dataFinal: '',
        ordenacao: 'recentes'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOptionChange = (event) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            ordenacao: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        filterRegister(formData); // Chamada da função filterRegister com os dados do formulário como parâmetro
        onClose(); // Fechar o modal após enviar o formulário
    };


    return(
        <div className="deleteModal-overlay">
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Filtrar Serviços Educacionais</h2>
                <form onSubmit={handleSubmit} className="filter-form">

                    <div className="hour-filter">
                        <div className="timeInput-box">
                            <label htmlFor="horaInicio">Hora Inicial</label>
                            <input
                                    id="horaInicio"
                                    name="horaInicio"
                                    type="time"
                                    value={formData.horaInicio}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="timeInput-box">
                            <label htmlFor="horaFinal">Hora Final</label>
                            <input
                                    id="horaFinal"
                                    name="horaFinal"
                                    type="time"
                                    value={formData.horaFinal}
                                    onChange={handleChange}
                                />
                        </div>
                    </div>

                    <div className="type-filter">
                        <label htmlFor="tipoServico">Tipo</label>
                        <select id="tipoServico" name="tipoServico" value={formData.tipoServico} onChange={handleChange}>
                            <option value="">Escolha o tipo de serviço educacional</option>
                            {serviceTypes ? (
                                serviceTypes.map(service => (
                                    <option value={service.id} key={service.id}>{service.nome}</option>
                            ))
                            ) : (null)}
                        </select>
                    </div>

                    <div className="date-filter">
                        <div className="dateInput-box">
                            <label htmlFor="dataInicial">Data Inicial</label>
                            <input
                                id="dataInicial"
                                name="dataInicial"
                                type="date"
                                value={formData.dataInicial}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="dateInput-box">
                            <label htmlFor="dataFinal">Data Final</label>
                            <input
                                id="dataFinal"
                                name="dataFinal"
                                type="date"
                                value={formData.dataFinal}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="order-filter">
                        <fieldset>
                            <legend>Selecione por ordem de criação:</legend>
                            <label>
                            <input
                                type="radio"
                                name="ordenacao"
                                value="recentes"
                                checked={formData.ordenacao === 'recentes'}
                                onChange={handleOptionChange}
                            />
                            Mais Recentes
                            </label>

                            <br/>

                            <label>
                            <input
                                type="radio"
                                name="ordenacao"
                                value="antigas"
                                checked={formData.ordenacao === 'antigas'}
                                onChange={handleOptionChange}
                            />
                            Mais Antigas
                            </label>
                        </fieldset>
                    </div>

                    <div className="deleteModal-buttons">
                        <button className="filterOpen-btn" onClick={onClose}>Cancelar Filtros</button>
                        <p></p>
                        <button type="submit" className="filters-btn">Aplicar Filtros</button>
                    </div>
                </form>
                <p>Aperte "Esc" para Cancelar</p>
            </div>
        </div>
        </div>
    )
}

export default FilterModal;
