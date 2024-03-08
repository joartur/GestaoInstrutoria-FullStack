import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TableSituation from "../table/TableSituation"
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { Link } from 'react-router-dom';
import { useDataContext } from '../../services/DataContext';

const Calendario = () => {
    const { data } = useDataContext();
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setSelectedDate(newDate.toLocaleDateString('pt-BR'));
        filterDataByDate(newDate.toISOString().split('T')[0]);
    };

    const filterDataByDate = (selectedDate) => {
        const filtered = data.filter(item => {
            return item.dataServico === selectedDate; // Filtra os dados com a data selecionada
        });
        setFilteredData(filtered);
    };

    useEffect(() => {
        filterDataByDate(new Date().toISOString().split('T')[0]); // Filtra os dados com a data atual ao carregar o componente
    }, [data]);

    const weekStart = 0;

    return (
        <div className="calendario-container">
            <div className="calendar">
                <Calendar
                    className="calendar-component"
                    onChange={handleDateChange}
                    value={date}
                    locale="pt-BR"
                    firstDayOfWeek={weekStart}
                    formatMonthYear={(locale, currentDate) => `${currentDate.toLocaleDateString(locale, { month: 'long' })} ${currentDate.getFullYear()}`}
                />
            </div>

            <div className="messages">
                <h3>Registros do dia: {selectedDate}</h3> {/* Exibe a data selecionada */}
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Tipo</th>
                            <th>Situação</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        filteredData.map(item => (
                            <tr key={item.id}>
                                <td className="blue-text">
                                    <Link to={`/viewServices/${item.id}`}>
                                        {item.titulo}
                                    </Link>
                                </td>
                                <td>{item.Servico ? item.Servico.nome : 'N/A'}</td>
                                <td>
                                    <TableSituation title={item.status} url={`/viewServices/${item.id}`}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length === 0 && (
                        <h1 className="warning">Não há nenhum registro para o dia: {selectedDate}</h1>
                )}
            </div>
        </div>
    );
};

export default Calendario;
