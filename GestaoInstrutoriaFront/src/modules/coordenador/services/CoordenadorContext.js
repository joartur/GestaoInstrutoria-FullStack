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

    useEffect(() => {
        fetchInstructors("Tecnologia");
    }, []);
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
          console.log("response.data: ", response.data)
        } catch (error) {
          console.error('Erro ao buscar instrutores:', error);
        }
      };
    
    //Busca todos os registros deum determinado instrutor através da matricula dele
    const fetchInstructorRegisters = async (matricula) => {
        try {
          const instructorRegisterResponse = await axios.get(`http://localhost:3001/coordArea/listarRegistros/${matricula}`);
          setInstructorRegisters(instructorRegisterResponse);
          console.log("instructorRegister", instructorRegisters)
          console.log("instructorRegisterResponse: ", instructorRegisterResponse.data)
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      };

    //Analisa se o instrutor tem algum serviço educacional que não foi validado ainda.
    const fetchInstructorSituation = async (matricula) => {
        try {
          const response = await axios.get(`http://localhost:3001/coordArea/verificaSituacao/${matricula}`);
          setInstructorSituation(response.data);
          console.log(response.data)
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
        return response.data; // Se precisar manipular a resposta, você pode fazer isso aqui
      } catch (error) {
        console.error('Erro ao validar registro:', error);
        throw error; // Se precisar lidar com o erro em outro lugar, você pode lançá-lo novamente
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