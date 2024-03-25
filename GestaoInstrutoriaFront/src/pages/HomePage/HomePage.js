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

  const getBoxColor = (hoursString) => {
    const hours = parseInt(hoursString.split(":")[0]); // Obtém apenas a parte das horas
    if (hours >= 176) {
      return "red"; // Vermelhão
    } else if (hours >= 141) {
      return "orange"; // Laranjinha
    } else if (hours >= 88) {
      return "yellow"; // Amarelo
    } else if (hours >= 35) {
      return "not-white"; // Branco não branco
    } else {
      return "white"; // Branco
    }
  };

  return (
    <Layout>
        <Header title="Página Inicial" description="Bem-vindo!"/>
        <main>
        <div className="home-container">
              <Box title="Horas Produzidas (SIG)" description="0 Horas" type="box"/>
              <Box title="Horas de Serviço Educacional" description={instrutorData.horasServicos ? instrutorData.horasServicos.split(":")[0] + " Horas" : "0 Horas"} type="box"/>
              <Box title="Total de Horas Cadastradas " description={instrutorData.horasTrab ? instrutorData.horasTrab.split(":")[0] + " Horas" : "0 Horas"} type={getBoxColor(instrutorData.horasTrab)}/>
              <Box title="Saldo de Horas" description={instrutorData.saldoHoras ? instrutorData.saldoHoras.split(":")[0] + " Horas" : "0 Horas"} type="box"/>
        </div>
        <div>
          <Calendario />
        </div>
        </main>
    </Layout>
  );
};

export default HomePage;