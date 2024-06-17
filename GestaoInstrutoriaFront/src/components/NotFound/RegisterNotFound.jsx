import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from "../buttons/Button";

import "./registerNotFound.css"

const RegisterNotFound = ({title, subtitle, buttonTitle, url}) => {
    return (
        <div className="notFound-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <Button
                title={buttonTitle}
                size="medium"
                url={url}
            />
        </div>
    )
}

export default RegisterNotFound;

//Não Há Nenhum Serviço Educacional Cadastrado
//Cadastre novos serviços educacionais e aguarde a validação do coordenador de área!
//Cadastrar Serviços Educacionais
//createService