import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import "./validationButton.css"

const ValidationButtons = (props) => {
    //type: accept (verde) reject (vermelho) view (azul)
    //url: link
    //legenda: descrição do botão ao passar o mouse em cima
    //icon: ícone do font awesome
    return (
    <div className={`validation-button ${props.type}`} onClick={props.onClick}>
            <Link to={props.url} title={props.legenda}>
            <FontAwesomeIcon icon={props.icon} className="icon"/>
            </Link>
        </div>
    )
}

export default ValidationButtons;
