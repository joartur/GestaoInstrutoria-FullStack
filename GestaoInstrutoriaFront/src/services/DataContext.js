import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  
    const [data, setData] = useState([]); //Array com os dados de serviço do instrutor
    const [instrutorData, setInstrutorData] = useState([]); //Array com dados da página inicial
    const [instrutorProfile, setInstrutorProfile] = useState([]); //Array com dados do instrutor
    const [serviceTypes, setServiceTypes] = useState([]); //Lista de tipos de serviço educacional
    const [filteredData, setFilteredData] = useState([]); //Armazena os dados filtrados 

    const [errorMsg, setErrorMsg] = useState([]) //Mensagens de erro do sistema
    const [serviceCreated, setServiceCreated] = useState(false); //Serviço foi criado ou não
    const [serviceEdited, setServiceEdited] = useState(false);//Serviço foi editado ou não


//chamadas das funções de consumo de api  
    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      InstrutorDataFetch();
    }, []);

    useEffect(() => {
      InstrutorProfileFetch();
    }, []);

    useEffect(() => {
      serviceTypesFetch();
    }, []);
  
//consume api de serviços educacionais de um instrutor
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/instrutor/registros/123456');
          const orderedData = response.data.data.slice().reverse();
          setData(orderedData);
          //Atualiza os dados do instrutor como: Horas Cadastradas. Isso seria uma gambiarra?
          InstrutorDataFetch();
          console.log(data)
    } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
      }
    };

//consumo de api para criar um registro
    const createEducationalService = async (newServiceData) => {
        try {
          const response = await axios.post('http://localhost:3001/instrutor/registro/123456', newServiceData);
          //assinala como verdadeiro a criação de um serviço
          setServiceCreated(true);
          //adiciona o novo registro ao data
          setData([...data, response.data]);
          console.log('Novo serviço educacional criado:', response.data);
          //Atualiza os dados de serviço.
          fetchData();
          //retira mensagem de erro
          setErrorMsg([]);
        } catch (error) {
          if (error.response) {
            // O servidor retornou um código de status diferente de 2xx
            console.error('Erro na resposta: ', error.response.data);
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
        //deleta um serviço e tira ele do array
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
          setServiceEdited(true);
          console.log('Serviço educacional editado com sucesso:', response.data);
          //atualiza os dados exibidos depois de editar com sucesso
          fetchData();
          setErrorMsg([]);
      } catch (error) {
        if (error.response) {
          // O servidor retornou um código de status diferente de 2xx
          setServiceEdited(false);
          console.error('Erro na resposta:', error.response.data);
          setErrorMsg(error.response.data); // Defina a mensagem de erro do servidor
      } else if (error.request) {
          // A requisição foi feita, mas não houve resposta
          setServiceEdited(false);
          console.error('Erro na requisição:', error.request);
          setErrorMsg('Erro na requisição'); // Defina uma mensagem de erro genérica
      } else {
          // Ocorreu um erro ao configurar a solicitação
          setServiceEdited(false);
          console.error('Erro:', error.message);
          setErrorMsg('Erro ao configurar a solicitação'); // Defina uma mensagem de erro genérica
      }
      }
    };

//consumo dos dados da página inicial
  const InstrutorDataFetch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/instrutor/123456');
      setInstrutorData(response.data)
      console.log(instrutorData)
  } catch (error) {
      console.error('Erro ao buscar dados do instrutor:', error);
  }
  };

//consumo dos dados do pefil do instrutor
  const InstrutorProfileFetch = async () => {
    try {
        const response = await axios.get('http://localhost:3001/instrutor/perfil/123456');
        setInstrutorProfile(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil do instrutor:', error);
    }
  };

//consumo dos dados da lista de tipos de serviço
  const serviceTypesFetch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/instrutor/servicos/123456');
      setServiceTypes(response.data.servicos);
      console.log(serviceTypes)
    } catch (error) {
      console.error('Erro ao buscar dados do perfil do instrutor:', error);
    }
  }

  const filterRegister = async (filtro) => {
      try {
          const response = await axios.post('http://localhost:3001/instrutor/registros/123456', filtro);
          console.log(response.data)
          setFilteredData(response.data)
      } catch (error) {
          console.error('Erro ao enviar filtro:', error);
          console.log(error)
      }
  };

  return (
    <DataContext.Provider value={{ data, instrutorData, serviceCreated, serviceEdited, instrutorProfile, serviceTypes, filteredData, setServiceCreated, setServiceEdited, createEducationalService, deleteService, editService, filterRegister, errorMsg }}>
        {children}
    </DataContext.Provider>
  );
}