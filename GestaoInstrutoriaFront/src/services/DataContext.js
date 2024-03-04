import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  
    const [data, setData] = useState([]);
    const [instrutorData, setInstrutorData] = useState([])
    const [errorMsg, setErrorMsg] = useState([])
    const [serviceCreated, setServiceCreated] = useState(false);
  
    useEffect(() => {
    fetchData();
    }, []);

    useEffect(() => {
      InstrutorDataFetch();
    }, []);
  

    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/instrutor/registros/123456');
          const orderedData = response.data.data.slice().reverse();
          setData(orderedData);
          console.log(response.data.data);
    } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
      }
    };
  
    const createEducationalService = async (newServiceData) => {
        try {
          const response = await axios.post('http://localhost:3001/instrutor/registro/123456', newServiceData);
          setServiceCreated(true);
          setData([...data, response.data]);
          console.log('Novo serviço educacional criado:', response.data);
          fetchData();
        } catch (error) {
          if (error.response) {
            // O servidor retornou um código de status diferente de 2xx
            console.error('Erro na resposta: ', error.response.data);
            console.error('Código de status: ', error.response.status);
            setErrorMsg(error.response.data)
            setServiceCreated(false);
        } else if (error.request) {
            // A requisição foi feita, mas não houve resposta
            console.error('Erro na requisição: ', error.request);
            setErrorMsg(error.request)
            setServiceCreated(false);
        } else {
            console.error('Erro: ', error.message);
            setErrorMsg(error.message)
            setServiceCreated(false);
        }
        }
    };

    const deleteService = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/instrutor/registro/123456/${id}`);
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        console.log('Serviço excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
      }
    };

    const editService = async (id, updatedServiceData) => {
      try {
          const response = await axios.put(`http://localhost:3001/instrutor/registro/123456/${id}`, updatedServiceData);
          console.log('Serviço educacional editado com sucesso:', response.data);
          fetchData();
      } catch (error) {
        if (error.response) {
          // O servidor retornou um código de status diferente de 2xx
          console.error('Erro na resposta:', error.response.data);
          console.error('Código de status:', error.response.status);
          setErrorMsg(error.response.data); // Defina a mensagem de erro do servidor
      } else if (error.request) {
          // A requisição foi feita, mas não houve resposta
          console.error('Erro na requisição:', error.request);
          setErrorMsg('Erro na requisição'); // Defina uma mensagem de erro genérica
      } else {
          // Ocorreu um erro ao configurar a solicitação
          console.error('Erro:', error.message);
          setErrorMsg('Erro ao configurar a solicitação'); // Defina uma mensagem de erro genérica
      }
      }
    };

  const InstrutorDataFetch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/instrutor/123456');
      setInstrutorData(response.data)
  } catch (error) {
      console.error('Erro ao buscar dados do instrutor:', error);
  }
  };

    return (
        <DataContext.Provider value={{ data, instrutorData, serviceCreated, setServiceCreated, createEducationalService, deleteService, editService, errorMsg }}>
            {children}
        </DataContext.Provider>
        );
}