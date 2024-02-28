import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../image/logo_senac.png"
import TextInput from '../../components/inputs/TextInput';
import './login.css';

const Login = () => {
  /*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login realizado com sucesso!');
  };*/

  return (
    <div className="login-main">
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo do Senac" className="logo" />
        <p>Controle de Atividades e Serviços Educacionais</p>
      </div>
      <form className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <TextInput placeholder="Seu email"/>
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <TextInput placeholder="Sua senha"/>
        </div>
      <Link to="/">
        <button type="button" className="login-button">
          Entrar
        </button>
      </Link>
      <div className="forget-container">
      <Link to="/">
        <p>Esqueceu sua senha ou email?</p>
      </Link>
      </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
