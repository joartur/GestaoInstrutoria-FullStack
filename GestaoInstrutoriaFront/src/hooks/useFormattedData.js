import { useState, useEffect } from 'react';
import moment from 'moment';

const useFormattedData = (data) => {
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        const formatData = (data) => {
            return data.map(service => {
                const dataServico = moment(service.dataServico).format('DD/MM/YYYY');
                const formattedHoraInicio = formatTime(service.horaInicio);
                const formattedHoraFinal = formatTime(service.horaFinal);
                const formattedTotal = formatTotal(service.total);

                return {
                    ...service,
                    dataServico,
                    horaInicio: formattedHoraInicio,
                    horaFinal: formattedHoraFinal,
                    total: formattedTotal
                };
            });
        };

        const formatTime = (timeString) => {
            const [hour, minute] = timeString.split(":").map(Number);
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            const formattedMinute = minute < 10 ? `0${minute}` : minute;
            return `${formattedHour}:${formattedMinute}`;
        };

        const formatTotal = (timeString) => {
            const [hour] = timeString.split(":").map(Number);
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            return `${formattedHour}`;
        };

        setFormattedData(formatData(data));
    }, [data]);

    return formattedData;
};

export default useFormattedData;
