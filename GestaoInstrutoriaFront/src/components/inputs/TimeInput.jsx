import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./timeInput.css"

const TimeInput = (props) => {
    return (
        <div className="numberInput-container" >
        <input type="time" placeholder={props.placeholder} className="numberInput"/>
        <FontAwesomeIcon icon={props.icon} className="search-icon"/>
        </div>
    )
}

export default TimeInput;