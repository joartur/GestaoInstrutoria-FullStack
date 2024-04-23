import { Link } from 'react-router-dom';
import Logo from '../../../image/logo_senac.png'
import './notFound.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page-content">
      <img src={Logo} width={200} alt="Logo Senac" />
      <h1 class="error">Error 404</h1>
      <p>Ops! Essa página não foi encontrada, retorne para a página inicial </p>        
        <Link to="/">
            <button>
                Voltar para página inicial
            </button>
        </Link>
        
      </div>
    </div>
  );
};

export default NotFoundPage;
