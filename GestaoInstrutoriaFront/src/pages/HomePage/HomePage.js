import Layout from '../../components/layout/Layout';
import Header from '../../components/header/Header';
import Box from '../../components/box/Box';
import Calendario from '../../components/calendar/Calendar';
import { useDataContext } from '../../services/DataContext';
import Loading from '../loading/Loading';
import "./homePage.css"

const HomePage = () => {

  const { instrutorData } = useDataContext();

  if (!instrutorData) {
    return <Loading />
  }

  return (
    <Layout>
        <Header title="Página Inicial" description="Bem-vindo!"/>
        <main>
        <div className="home-container">
              <Box title="Horas Produzidas (SIG)" description="0 Horas" type="box"/>
              <Box title="Horas de Serviço Educacional" description={instrutorData.horasServicos ? instrutorData.horasServicos + " Horas" : "0 Horas"} type="box"/>
              <Box title="Total de Horas Cadastradas " description={instrutorData.horasServicos ? instrutorData.horasServicos + " Horas" : "0 Horas"} type="box"/>
              <Box title="Saldo de Horas" description={instrutorData.saldoHoras ? instrutorData.saldoHoras + "Horas" : "0 Horas"} type="box"/>
        </div>
        <div>
          <Calendario />
        </div>
        </main>
    </Layout>
  );
};

export default HomePage;