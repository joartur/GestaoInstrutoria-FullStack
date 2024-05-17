import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../components/buttons/Button';
import "./notFound.css"

const NotFound = ({title, subtitle, buttonTitle, url}) => {
    return (
        <div className="notFound-container">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="icon"
            />
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

export default NotFound;