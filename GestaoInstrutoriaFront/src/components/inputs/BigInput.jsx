import "./bigInput.css"

const BigInput = (props) => {
    return (
        <div className="BigInput-container" >
        <textarea type="text" id={props.id} name={props.name} placeholder={props.placeholder} value={props.value} disabled={props.disabled} className="BigInput"/>
        </div>
    )
}

export default BigInput;