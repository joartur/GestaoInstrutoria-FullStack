import { useEffect, useState } from "react";
import moment from "moment";

// Hook personalizado para formatar datas e horas
const useFormatDateTime = (dateTime) => {
    const [formattedDateTime, setFormattedDateTime] = useState("");

    useEffect(() => {
        const formatDateTime = (dateTime) => {
            const formattedDate = moment(dateTime.dataServico).format('DD/MM/YYYY');
            const formattedStartTime = formatTime(dateTime.horaInicio);
            const formattedEndTime = formatTime(dateTime.horaFinal);
            return {
                ...dateTime,
                dataServico: formattedDate,
                horaInicio: formattedStartTime,
                horaFinal: formattedEndTime
            };
        };

        const formatTime = (timeString) => {
            const [hour, minute] = timeString.split(":").map(Number);
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            const formattedMinute = minute < 10 ? `0${minute}` : minute;
            return `${formattedHour}:${formattedMinute}`;
        };

        if (dateTime) {
            const formattedData = formatDateTime(dateTime);
            setFormattedDateTime(formattedData);
        }
    }, [dateTime]);

    return formattedDateTime;
};

export default useFormatDateTime;
