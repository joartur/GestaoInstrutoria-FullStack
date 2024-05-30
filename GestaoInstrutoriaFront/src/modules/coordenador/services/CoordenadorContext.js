import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CoordenadorContext = createContext();
export const useCoordenadorContext = () => useContext(CoordenadorContext);

export const CoordenadorProvider = ({ children }) => {
    //armazena a lista de instrutores de uma área
    const [instructors, setInstructors] = useState([]);
    const [coordenadorProfile, setCoordenadorProfile] = useState([]);
    
    //Atualiza função para listar todos os professores de uma determinada área caso haja atualizações na lista
    useEffect(() => {
        fetchInstructors();
    }, []);

    useEffect(() => {
      CoordenadorProfileFetch();
  }, []);

    //Busca todos os instrutores de uma área do conhecimento do Senac
    const fetchInstructors = async (id) => {
        try {
          const response = await axios.get(`http://localhost:3001/coordArea/1234567890`);
          setInstructors(response.data);
        } catch (error) {
          console.error('Erro ao buscar instrutores:', error);
        }
    };
    
    //Busca todos os registros de um determinado instrutor através da matricula dele
    const fetchInstructorRegisters = async (matricula) => {
        try {
          const instructorRegisterResponse = await axios.get(`http://localhost:3001/coordArea/listarRegistros/${matricula}`);
          console.log(instructorRegisterResponse.data)
          return instructorRegisterResponse.data
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      };

    //Analisa se o instrutor tem algum serviço educacional que não foi validado ainda.
    const fetchInstructorSituation = async (matricula) => {
        try {
          const instructorSituationResponse = await axios.get(`http://localhost:3001/coordArea/verificaSituacao/${matricula}`);
          return instructorSituationResponse.data
        } catch (error) {
          console.error('Error fetching situation:', error);
        }
    };

    //Validar um serviço educacional
    const validateInstructorRegister = async (FKcoordenador, id) => {
      try {
        // Aqui você pode preparar os dados para enviar, se necessário
        const response = await axios.put(`http://localhost:3001/coordArea/validarRegistro/${FKcoordenador}/${id}`);
        console.log(response.data, "VALIDADO COM SUCESSO!")
      } catch (error) {
        throw error; 
      }
    };

    //Validar um serviço educacional parcialmente
    const partiallyValidateInstructorRegister = async (FKcoordenador, id, justificativa, total) => {
      try {
        const response = await axios.put(`http://localhost:3001/coordArea/validarParcialmenteRegistro/${FKcoordenador}/${id}`, {
          justificativa: justificativa,
          total: total
        });
        console.log(response.data, "VALIDADO PARCIALMENTE COM SUCESSO!");
      } catch (error) {
        throw error; 
      }
    };

    //RECEBER OS DADOS DO PERFIL DO COORDENADOR
    const CoordenadorProfileFetch = async () => {
        try {
            const response = await axios.get('http://localhost:3001/coordArea/perfil/1234567890');
            setCoordenadorProfile(response.data);
            console.log(coordenadorProfile)
        } catch (error) {
        console.error('Erro ao buscar dados do perfil do coordenador:', error);
        }
    };

    //CADASTRAR REGISTRO PARA INSTRUTOR
    const createInstructorRegister = async (coordinatorId, instructorId, newRegisterData) => {
      try {
          const response = await axios.post(
              `http://localhost:3001/coordArea/registro/${coordinatorId}/${instructorId}`, 
              newRegisterData
          );
          console.log('Novo registro de instrutor criado:', response.data);
      } catch (error) {
          if (error.response) {
              console.error('Erro na resposta: ', error.response.data);
          } else if (error.request) {
              console.error('Erro na requisição: ', error.request);
          } else {
              console.error('Erro: ', error.message);
          }
      }
  };

    const value={
        instructors,
        coordenadorProfile,
        fetchInstructorRegisters,
        fetchInstructorSituation,
        validateInstructorRegister,
        partiallyValidateInstructorRegister,
        createInstructorRegister
    }
    
    return (
        <CoordenadorContext.Provider value={value}>
            {children}
        </CoordenadorContext.Provider>
    )
}