import React, { useState } from 'react';
import { useDataContext } from '../../services/DataContext';
import "./filterModal.css";

const FilterModal = ({ onClose, applyFilters }) => {
    const { serviceTypes } = useDataContext();

    const [formData, setFormData] = useState({
        dataInicioFiltro: "",
        dataFinalFiltro: "",
        FKservico: "",
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedNames, setSelectedNames] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;
        let updatedOptions;
        let updatedNames;
        const serviceName = serviceTypes.find(service => service.id === parseInt(value)).nome;

        if (checked) {
            updatedOptions = [...selectedOptions, value]; // Adiciona o ID da opção selecionada
            updatedNames = [...selectedNames, serviceName]; // Adiciona o nome da opção selecionada
        } else {
            updatedOptions = selectedOptions.filter(option => option !== value); // Remove o ID da opção desmarcada
            updatedNames = selectedNames.filter(name => name !== serviceName); // Remove o nome da opção desmarcada
        }

        setSelectedOptions(updatedOptions);
        setSelectedNames(updatedNames);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Atualize o formData apenas com campos preenchidos
        const updatedFormData = {
            ...formData,
            FKservicoNames: selectedNames
        };
        if (selectedOptions.length > 0) {
            updatedFormData.FKservico = selectedOptions;
        }
        applyFilters(updatedFormData); // Chama a função para aplicar os filtros
    };

    return (
        <div className="deleteModal-overlay">
            <div className="deleteModal-whrapper">
                <div className="deleteModal-container">
                    <h2>Filtrar Serviços Educacionais</h2>
                    <form onSubmit={handleSubmit} className="filter-form">
                        <div className="type-filter">
                            <label htmlFor="FKservico">Tipo de Serviço Educacional</label>
                            {
                                serviceTypes ? (
                                    serviceTypes.map(service => (
                                        <label key={service.id}>
                                            <input
                                                id={service.id}
                                                name={service.nome}
                                                type="checkbox"
                                                value={service.id}
                                                onChange={handleOptionChange}
                                            />
                                            {service.nome}
                                        </label>
                                    ))
                                ) : (null)
                            }   
                        </div>
                        <div className="select-options">
                            <p>Opções selecionadas: {selectedNames.join(', ')}</p>
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
                            <button type="button" className="filterOpen-btn" onClick={onClose}>Cancelar Filtros</button>
                            <button type="submit" className="filters-btn">Aplicar Filtros</button>
                        </div>
                    </form>
                    <p>Aperte "Esc" para Cancelar</p>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
