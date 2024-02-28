import "./tableSituation.css"

const TableSituation = (props) => {
    let className = 'tableSituation';

    switch (props.title) {
        case 'Em Análise':
            className += ' analysis';
            break;
        case 'Validado':
            className += ' validate';
            break;
        case 'Parcialmente Validado':
            className += ' partial';
            break;
        case 'Recusado':
            className += ' refused';
            break;
        default:
            break;
    }

    return (
        <div className={className}>
            <p>{props.title}</p>
        </div>
    )
}

export default TableSituation;