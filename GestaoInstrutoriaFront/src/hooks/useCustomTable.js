import { useState, useEffect } from 'react';
import moment from 'moment';

const useCustomTable = (data) => {
    const [situacao, setSituacao] = useState('');
    const [customFilters, setCustomFilters] = useState({
        dataInicioFiltro: "",
        dataFinalFiltro: "",
        FKservico: []
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('desc');

    useEffect(() => {
        const formattedData = data.map(service => {
            const dataServico = moment(service.dataServico).format('DD/MM/YYYY');
            const formattedHoraInicio = formatTime(service.horaInicio);
            const formattedHoraFinal = formatTime(service.horaFinal);
            return {
                ...service,
                dataServico,
                horaInicio: formattedHoraInicio,
                horaFinal: formattedHoraFinal
            };
        });

        setFilteredData(formattedData);
    }, [data]);

    useEffect(() => {
        filterData(searchTerm, situacao, customFilters);
    }, [searchTerm, situacao, customFilters]);

    const filterData = (term, situacao, customFilters) => {
        let filteredResults = data;

        if (term) {
            filteredResults = filteredResults.filter((item) =>
                item.titulo.toLowerCase().includes(term.toLowerCase())
            );
        }

        if (situacao) {
            filteredResults = filteredResults.filter((item) => item.status === situacao);
        }

        if (customFilters) {
            if (customFilters.dataInicioFiltro) {
                filteredResults = filteredResults.filter((item) =>
                    moment(item.dataServico).isSameOrAfter(moment(customFilters.dataInicioFiltro))
                );
            }

            if (customFilters.dataFinalFiltro) {
                filteredResults = filteredResults.filter((item) =>
                    moment(item.dataServico).isSameOrBefore(moment(customFilters.dataFinalFiltro))
                );
            }

            if (customFilters.FKservico && customFilters.FKservico.length > 0) {
                const servicoIds = customFilters.FKservico.map(Number);
                filteredResults = filteredResults.filter((item) =>
                    servicoIds.includes(item.Servico.id)
                );
            }
        }

        setFilteredData(filteredResults);
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setCurrentPage(1);
        filterData(term, situacao, customFilters);
    };

    const handleChange = (event) => {
        const situacaoValue = event.target.value;
        setSituacao(situacaoValue);
        setCurrentPage(1);
        filterData(searchTerm, situacaoValue, customFilters);
    };

    const handleSort = (columnName) => {
        if (sortBy === columnName) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnName);
            setSortDirection('desc');
        }
    };

    const applyFilters = (filters) => {
        setCustomFilters(filters);
    };

    const removeFilter = (filterKey) => {
        setCustomFilters((prevFilters) => ({
            ...prevFilters,
            [filterKey]: ''
        }));
    };

    const sortedData = [...filteredData].sort((a, b) => {
        const valueA = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
        const valueB = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];

        if (valueA === valueB) {
            return 0;
        }

        if (sortDirection === 'asc') {
            return valueA < valueB ? -1 : 1;
        } else {
            return valueA > valueB ? -1 : 1;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return {
        searchTerm,
        situacao,
        customFilters,
        currentItems,
        currentPage,
        itemsPerPage,
        totalItems: filteredData.length,
        sortDirection,
        sortBy,
        handleSearch,
        handleChange,
        handleSort,
        applyFilters,
        removeFilter,
        paginate
    };
};

const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":").map(Number);
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute}`;
};

export default useCustomTable;
