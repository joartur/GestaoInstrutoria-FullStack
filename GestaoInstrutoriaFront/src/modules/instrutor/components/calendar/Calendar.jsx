import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import TableSituation from "../table/TableSituation";
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { Link } from 'react-router-dom';
import { useDataContext } from '../../services/DataContext';
import moment from 'moment';
import 'moment/locale/pt-br';

const Calendario = () => {
  const { data } = useDataContext();
  const currentDate = new Date();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentDate.toLocaleDateString('pt-BR'));
  const [filteredData, setFilteredData] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate.toLocaleDateString('pt-BR'));
    filterDataByDate(newDate);
  };

  const filterDataByDate = useCallback((selectedDate) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const filtered = data.filter(item => {
      return moment(item.dataServico).format('YYYY-MM-DD') === formattedDate;
    });
    setFilteredData(filtered);
  }, [data]);

  useEffect(() => {
    filterDataByDate(new Date());
  }, [data, filterDataByDate]);

  const hasEventOnDay = (date) => {
    return data.some(event => moment(event.dataServico).isSame(date, 'day'));
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && hasEventOnDay(date)) {
      return 'day-with-event';
    }
    return null;
  };

  const weekStart = 0;

  return (
    <div className="calendario-container">
      <div className="calendar">
        <Calendar
          className="calendar-component"
          onChange={handleDateChange}
          value={date}
          locale="pt-BR"
          tileClassName={tileClassName}
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
            {filteredData.map(item => (
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
      </div>
    </div>
  );
};

export default Calendario;
