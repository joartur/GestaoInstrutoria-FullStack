import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./bigInput.css"

const BigInput = (props) => {
    return (
        <div className="BigInput-container" >
        <textarea type="text" placeholder={props.placeholder} value={props.value} disabled={props.disabled} className="BigInput"/>
        <FontAwesomeIcon icon={props.icon} className="search-icon"/>
        </div>
    )
}

export default BigInput;