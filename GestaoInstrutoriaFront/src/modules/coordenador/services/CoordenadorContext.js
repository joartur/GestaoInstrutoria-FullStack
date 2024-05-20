import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CoordenadorContext = createContext();
export const useCoordenadorContext = () => useContext(CoordenadorContext);

export const CoordenadorProvider = ({ children }) => {
    //armazena a lista de instrutores de uma área
    const [instructors, setInstructors] = useState([]);
    
    //Atualiza função para listar todos os professores de uma determinada área caso haja atualizações na lista
    useEffect(() => {
        fetchInstructors("Estética");
    }, []);

    //Busca todos os instrutores de uma área do conhecimento do Senac
    const fetchInstructors = async (area) => {
        try {
          const response = await axios.get(`http://localhost:3001/coordArea/listarInstrutores/${area}`);
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
    const validateInstructorRegister = async (id, FKcoordenador) => {
      try {
        // Aqui você pode preparar os dados para enviar, se necessário
        const response = await axios.put(`http://localhost:3001/coordArea/validarRegistro/${id}/${FKcoordenador}`);
        console.log(response.data, "VALIDADO COM SUCESSO!")
      } catch (error) {
        throw error; 
      }
    };

    //Validar um serviço educacional parcialmente
    const partiallyValidateInstructorRegister = async (id, FKcoordenador, justificativa, total) => {
      try {
        const response = await axios.put(`http://localhost:3001/coordArea/validarParcialmenteRegistro/${id}/${FKcoordenador}`, {
          justificativa: justificativa,
          total: total
        });
        console.log(response.data, "VALIDADO PARCIALMENTE COM SUCESSO!");
      } catch (error) {
        throw error; 
      }
    };

    const value={
        instructors,
        fetchInstructorRegisters,
        fetchInstructorSituation,
        validateInstructorRegister,
        partiallyValidateInstructorRegister
    }
    return (
        <CoordenadorContext.Provider value={value}>
            {children}
        </CoordenadorContext.Provider>
    )
}