import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import ButtonFilter from "../buttons/ButtonFilter"
import DateInput from "../inputs/DateInput"
import TimeInput from "../inputs/TimeInput"

import "./filterModal.css"

const FilterModal = ({ isOpen, onClose }) => {
    return(
        <div className="deleteModal-overlay">
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Filtrar Serviços Educacionais</h2>
                <form action="" className="filter-form">

                    <div className="hour-filter">
                        <div className="timeInput-box">
                            <label htmlFor="">Início (Hora)</label>
                            <input
                                    id="horaInicio"
                                    name="horaInicio"
                                    type="time"
                                />
                        </div>
                        <div className="timeInput-box">
                            <label htmlFor="">Fim (Hora)</label>
                            <input
                                    id="horaInicio"
                                    name="horaInicio"
                                    type="time"
                                />
                        </div>
                    </div>

                    <div className="type-filter">
                        <label htmlFor="">Tipo</label>
                        <select>
                            <option value="">Escolha o Tipo de Atividade:</option>
                        </select>
                    </div>

                    <div className="date-filter">
                        <div className="dateInput-box">
                            <label htmlFor="">Data Inicial</label>
                            <input
                                id="dataServico"
                                name="dataServico"
                                type="date"
                            />
                        </div>
                        <div className="dateInput-box">
                            <label htmlFor="">Data Final</label>
                            <input
                                id="dataServico"
                                name="dataServico"
                                type="date"
                            />
                        </div>
                    </div>

                    <div className="order-filter">
                    <button className="filterOpen-btn">Mais recentes</button>
                        <p></p>
                        <button className="filterOpen-btn">Mais antigas</button>
                    </div>

                
                </form>
                <div className="deleteModal-buttons">
                <button className="filterOpen-btn" onClick={onClose}>Cancelar Filtros</button>
                <button className="filters-btn">Aplicar Filtros</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default FilterModal;