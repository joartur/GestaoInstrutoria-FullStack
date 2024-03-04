import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./textInput.css"

const TextInput = (props) => {
    return (
        <div className="textInput-container" >
        <input id={props.id} name={props.name} type="text" placeholder={props.placeholder} className="textInput" autoComplete={props.autoComplete} disabled={props.disabled}/>
        
        </div>
    )
}

export default TextInput;