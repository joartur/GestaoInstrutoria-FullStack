import React, { useState } from 'react';
import { useDataContext } from '../../services/DataContext';
import "./filterModal.css"

const FilterModal = ({ onClose }) => {
    const { serviceTypes, filterRegister } = useDataContext();

    const [formData, setFormData] = useState({
        dataInicioFiltro: "",
        dataFinalFiltro: "",
        FKservico: "",
        ordenacao: "desc"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        filterRegister(formData); // Chamada da função filterRegister com os dados do formulário como parâmetro
        onClose(); // Fechar o modal após enviar o formulário
    };

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;
        let updatedOptions;
        if (checked) {
          updatedOptions = [...selectedOptions, value]; // Adiciona a opção selecionada
        } else {
          updatedOptions = selectedOptions.filter(option => option !== value); // Remove a opção desmarcada
        }
        setSelectedOptions(updatedOptions);
      };

    return(
        <div className="deleteModal-overlay">
            <div className="deleteModal-whrapper">
                <div className="deletModal-container">
                    <h2>Filtrar Serviços Educacionais</h2>
                    <form onSubmit={handleSubmit} className="filter-form">

                        <div className="type-filter">
                            <label htmlFor="FKservico">Tipo de Serviço Educacional</label>
                            {
                                serviceTypes ? (
                                        serviceTypes.map(service => (
                                            <label key={service.id}>
                                                <input
                                                type="checkbox"
                                                key={service.id}
                                                value={service.id}
                                                checked={selectedOptions.includes()}
                                                onChange={handleOptionChange}
                                                />
                                                {service.nome}
                                            </label>
                                        ))
                                ) : (null)
                            }
                            
                            <p>Opções selecionadas: {selectedOptions.join(', ')}</p>
                        </div>
                        <div className="date-filter">
                            <div className="dateInput-box">
                                <label htmlFor="dataInicioFiltro">Data Inicial</label>
                                <input
                                    id="dataInicioFiltro"
                                    name="dataInicioFiltro"
                                    type="date"
                                    value={formData.dataInicioFiltro}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="dateInput-box">
                                <label htmlFor="dataFinalFiltro">Data Final</label>
                                <input
                                    id="dataFinalFiltro"
                                    name="dataFinalFiltro"
                                    type="date"
                                    value={formData.dataFinalFiltro}
                                    onChange={handleChange}
                                />
                            </div>
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

/*
<div className="hour-filter">
                            <div className="timeInput-box">
                                <label htmlFor="horaInicioFiltro">Hora Inicial</label>
                                <input
                                    id="horaInicioFiltro"
                                    name="horaInicioFiltro"
                                    type="time"
                                    value={formData.horaInicioFiltro}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="timeInput-box">
                                <label htmlFor="horaFinalFiltro">Hora Final</label>
                                <input
                                    id="horaFinalFiltro"
                                    name="horaFinalFiltro"
                                    type="time"
                                    value={formData.horaFinalFiltro}
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
                                        value="desc"
                                        checked={formData.ordenacao === 'desc'}
                                        onChange={handleOptionChange}
                                    />
                                    Mais Recentes
                                </label>

                                <br/>

                                <label>
                                    <input
                                        type="radio"
                                        name="ordenacao"
                                        value="asc"
                                        checked={formData.ordenacao === 'asc'}
                                        onChange={handleOptionChange}
                                    />
                                    Mais Antigas
                                </label>
                            </fieldset>
                        </div>

                        <select id="FKservico" name="FKservico" value={formData.FKservico} onChange={handleChange}>
                                <option value="">Escolha o tipo de serviço educacional</option>
                                {serviceTypes ? (
                                    serviceTypes.map(service => (
                                        <option value={service.id} key={service.id}>{service.nome}</option>
                                    ))
                                ) : (null)}
                            </select>
*/