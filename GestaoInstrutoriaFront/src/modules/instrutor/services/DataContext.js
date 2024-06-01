import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  
    const [data, setData] = useState([]); //Array com os dados de serviço do instrutor
    const [instrutorData, setInstrutorData] = useState([]); //Array com dados da página inicial
    const [serviceTypes, setServiceTypes] = useState([]); //Lista de tipos de serviço educacional
    const [filteredData, setFilteredData] = useState([]); //Armazena os dados filtrados

//chamadas das funções de consumo de api  
    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      InstrutorDataFetch();
    }, []);

    useEffect(() => {
      serviceTypesFetch();
    }, []);
  
//consume api de serviços educacionais de um instrutor
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/instrutor/registros/2345678901');
          const orderedData = response.data.data.slice().reverse();
          setData(orderedData);
          console.log(data)
          InstrutorDataFetch();
    } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
      }
    };

//consumo de api para criar um registro
    const createEducationalService = async (newServiceData) => {
        try {
          const response = await axios.post('http://localhost:3001/instrutor/registro/2345678901', newServiceData);
          setData([...data, response.data]);
          console.log('Novo serviço educacional criado:', response.data);
          fetchData();
        } catch (error) {
          throw error
        }
    };

    const deleteService = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/instrutor/registro/2345678901/${id}`);
        //deleta um serviço e tira ele do array
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        console.log('Serviço excluído com sucesso!', data);
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
      }
    };

    const editService = async (id, updatedServiceData) => {
      try {
          const response = await axios.put(`http://localhost:3001/instrutor/registro/2345678901/${id}`, updatedServiceData);
          console.log('Serviço educacional editado com sucesso:', response.data);
          fetchData();
      } catch (error) {
        throw error
      }
    };

    //Consumo dos dados detalhados de um serviço específico com consulta por ID
    const fetchServiceDetails = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/instrutor/registro/2345678901/${id}`);
        console.log(response.data.data);
        //Retorna os dados para manipulação em outras páginas
        return response.data.data
      } catch (error) {
        console.error('Erro ao buscar detalhes do serviço:', error);
      }
    };

//FETCH DE DADOS PESSOAIS

//consumo dos dados da página inicial
  const InstrutorDataFetch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/instrutor/2345678901');
      setInstrutorData(response.data)
      console.log(instrutorData)
  } catch (error) {
      console.error('Erro ao buscar dados do instrutor:', error);
  }
  };

//RECEBER DADOS DOS TIPOS DE SERVIÇO QUE EXISTEM
  const serviceTypesFetch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/instrutor/servicos/2345678901');
      setServiceTypes(response.data.servicos);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil do instrutor:', error);
    }
  }

//ENVIAR PARAMETROS DE FILTRO E RECEBER RESPOSTA COM DADOS FILTRADOS
  const filterRegister = async (filtro) => {
      try {
          const response = await axios.post('http://localhost:3001/instrutor/registros/2345678901', filtro);
          console.log(response.data)
          setFilteredData(response.data)
      } catch (error) {
          console.error('Erro ao enviar filtro:', error);
          console.log(error.response.data.error);
      }
  };

  const value={
    data,
    instrutorData,
    serviceTypes,
    filteredData,
    createEducationalService,
    deleteService,
    editService,
    fetchServiceDetails,
    filterRegister,
  }

  return (
    <DataContext.Provider value={value}>
        {children}
    </DataContext.Provider>
  );
}