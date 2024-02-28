import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TableSituation from "../table/TableSituation"
import ptBR from 'date-fns/locale/pt-BR';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { Link } from 'react-router-dom';

const Calendario = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setMessages({
      [tomorrow.toDateString()]: 'Mensagem de teste',
    });
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate.toLocaleDateString('pt-BR')); // Formata a data como DD/MM/AAAA
  };

  // Defina o domingo como o primeiro dia da semana (0 representa domingo)
  const weekStart = 0;

  return (
    <div className="calendario-container">
      <div className="calendar">
        <Calendar
          className="calendar-component"
          onChange={handleDateChange}
          value={date}
          locale={ptBR}
          firstDayOfWeek={weekStart}
          formatMonthYear={(locale, currentDate) => `${currentDate.toLocaleDateString(locale, { month: 'long' })} ${currentDate.getFullYear()}`}
          tileClassName={({ date }) => {
          const dateString = date.toDateString();
          return messages[dateString] ? 'has-message' : '';
          }}
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
            <tr>
              <td className="blue-text">
                <Link to="/viewServices">
                Reunião com o Zé do Boné
                </Link>
                </td>
              <td>Consultoria</td>
              <td>
              <TableSituation title="Em Análise" type="analysis"/>
              </td>
            </tr>

            <tr>
              <td className="blue-text">
                <Link to="/viewServices">
                Reunião com o Zé do Boné
                </Link>
                </td>
              <td>Consultoria</td>
              <td>
              <TableSituation title="Validado" type="validate"/>
              </td>
            </tr>

            <tr>
              <td className="blue-text">
                <Link to="/viewServices">
                Reunião com o Zé do Boné
                </Link>
                </td>
              <td>Consultoria</td>
              <td>
              <TableSituation title="Parcialmente Validado" type="partial"/>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendario;