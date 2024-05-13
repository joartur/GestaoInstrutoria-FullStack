import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CoordenadorContext = createContext();
export const useCoordenadorContext = () => useContext(CoordenadorContext);

export const CoordenadorProvider = ({ children }) => {
    //armazena a lista de instrutores de uma área
    const [instructors, setInstructors] = useState([]);
    //armazena lista de registros de um instrutor específico
    const [instructorRegisters, setInstructorRegisters] = useState([]);
    //armazena valor booleano para expressar se o instrutor tem algum serviço educacional com situação "em análise". Se sim = true, se não = false
    const [instructorSituation, setInstructorSituation] = useState(null);

    //Atualiza função para listar todos os professores de uma determinada área caso haja atualizações na lista
    useEffect(() => {
        fetchInstructors("Tecnologia");
    }, []);
    //passar parametros por forms
    useEffect(() => {
      fetchInstructorRegisters("123456");
    }, []);
    useEffect(() => {
      fetchInstructorSituation("123456");
    }, []);

    //Busca todos os instrutores de uma área do conhecimento do Senac
    const fetchInstructors = async (area) => {
        try {
          const response = await axios.get(`http://localhost:3001/coordArea/listarInstrutores/${area}`);
          setInstructors(response.data);
          console.log("instructors: ", instructors)
        } catch (error) {
          console.error('Erro ao buscar instrutores:', error);
        }
    };
    
    //Busca todos os registros de um determinado instrutor através da matricula dele
    const fetchInstructorRegisters = async (matricula) => {
        try {
          const instructorRegisterResponse = await axios.get(`http://localhost:3001/coordArea/listarRegistros/${matricula}`);
          setInstructorRegisters(instructorRegisterResponse.data);
          console.log("instructorRegister", instructorRegisters)
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      };

    //Analisa se o instrutor tem algum serviço educacional que não foi validado ainda.
    const fetchInstructorSituation = async (matricula) => {
        try {
          const response = await axios.get(`http://localhost:3001/coordArea/verificaSituacao/${matricula}`);
          setInstructorSituation(response.data);
          console.log(instructorSituation)
        } catch (error) {
          console.error('Error fetching situation:', error);
        }
    };

    //Validar um serviço educacional
    const validateInstructorRegister = async (id, FKcoordenador) => {
      try {
        // Aqui você pode preparar os dados para enviar, se necessário
        const response = await axios.put(`http://localhost:3001/coordArea/validarRegistro/${id}/${FKcoordenador}`);
        console.log('Registro validado com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao validar registro:', error);
      }
    };

    const value={
        instructors,
        instructorRegisters,
        instructorSituation,
        validateInstructorRegister
    }
    return (
        <CoordenadorContext.Provider value={value}>
            {children}
        </CoordenadorContext.Provider>
    )
}