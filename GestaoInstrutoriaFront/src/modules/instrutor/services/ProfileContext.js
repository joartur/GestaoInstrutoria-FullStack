import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [instrutorProfile, setInstrutorProfile] = useState([]); //Array com dados do instrutor
    
    useEffect(() => {
        InstrutorProfileFetch();
    }, []);

    //RECEBER OS DADOS DO PERFIL DO INSTRUTOR
    const InstrutorProfileFetch = async () => {
        try {
            const response = await axios.get('http://localhost:3001/instrutor/perfil/123456');
            setInstrutorProfile(response.data);
            console.log("Profile Data:", response.data)
            console.log(instrutorProfile)
        } catch (error) {
        console.error('Erro ao buscar dados do perfil do instrutor:', error);
        }
    };

    return (
        <ProfileContext.Provider value={{instrutorProfile}}>
            {children}
        </ProfileContext.Provider>
      );
}