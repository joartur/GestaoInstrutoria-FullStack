import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./textInput.css"

const TextInput = (props) => {
    return (
        <div className="textInput-container" >
        <input type="text" placeholder={props.placeholder} className="textInput" disabled={props.disabled}/>
        <FontAwesomeIcon icon={props.icon} className="search-icon"/>
        </div>
    )
}

export default TextInput;