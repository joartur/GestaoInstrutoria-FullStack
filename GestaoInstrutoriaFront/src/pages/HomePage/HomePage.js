import Layout from '../../components/layout/Layout';
import Header from '../../components/header/Header';
import Box from '../../components/box/Box';
import Calendario from '../../components/calendar/Calendar';
import "./homePage.css"



const HomePage = () => {
  return (
    <Layout>
        <Header title="Página Inicial" description="Bem-vindo!"/>
        <main>
        <div className="home-container">
              <Box title="Horas Produzidas (SIG)" description="106 Horas" type="box"/>
              <Box title="Horas de Serviço Educacional" description="72 Horas" type="box"/>
              <Box title="Total de Horas Cadastradas " description="178 Horas" type="box"/>
              <Box title="Saldo de Horas" description="2 Horas" type="alert"/>
        </div>
        <div>
          <Calendario />
        </div>
        </main>
    </Layout>
  );
};

export default HomePage;