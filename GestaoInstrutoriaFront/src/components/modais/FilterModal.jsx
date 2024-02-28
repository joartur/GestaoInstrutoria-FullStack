import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import ButtonFilter from "../buttons/ButtonFilter"
import DateInput from "../inputs/DateInput"
import TimeInput from "../inputs/TimeInput"

import "./filterModal.css"

const FilterModal = () => {
    return(
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Filtrar Serviços Educacionais</h2>
                <form action="" className="filter-form">

                    <div className="hour-filter">
                        <div className="timeInput-box">
                            <label htmlFor="">Início (Hora)</label>
                            <TimeInput />
                        </div>
                        <div className="timeInput-box">
                            <label htmlFor="">Fim (Hora)</label>
                            <TimeInput />
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
                            <DateInput />
                        </div>
                        <div className="dateInput-box">
                            <label htmlFor="">Data Final</label>
                            <DateInput />
                        </div>
                    </div>

                    <div className="order-filter">
                        <ButtonFilter title="Mais Recentes" size="medium" icon={faArrowUp}/>
                        <p></p>
                        <ButtonFilter title="Mais Antigas" size="medium" icon={faArrowDown}/>
                    </div>

                <div className="deleteModal-buttons">
                <ButtonFilter title="Cancelar" size="medium"/>
                <button className="filters-btn">Aplicar Filtros</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default FilterModal;