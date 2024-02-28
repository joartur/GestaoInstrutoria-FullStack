import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/instrutor/registros/123456');
            setData(response.data.data);
            console.log(response.data.data)
    } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const createEducationalService = async (newServiceData) => {
        try {
          const response = await axios.post('http://localhost:3001/instrutor/registro/123456', newServiceData);
          setData([...data, response.data]); // Adiciona o novo serviço à lista de serviços
          console.log('Novo serviço educacional criado:', response.data);
        } catch (error) {
          console.error('Erro ao criar serviço educacional:', error);
        }
    };

    return (
        <DataContext.Provider value={{ data, createEducationalService }}>
            {children}
        </DataContext.Provider>
        );
}