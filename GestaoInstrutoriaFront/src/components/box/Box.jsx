import "./box.css"

const Box = (props) => {
    return (
        <div className={props.type}>
            <h2>{props.title}</h2>
            <h1>{props.description}</h1>
        </div>
    )
}

export default Box;