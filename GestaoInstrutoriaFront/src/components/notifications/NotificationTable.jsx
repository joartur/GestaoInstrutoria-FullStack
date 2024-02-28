import "./notificationTable.css"

const NotificationTable = ({children}) => {
    return (
        <div className="notificationTable-container">
            <div className="notificationTable-header">
                <button>Todas</button>
                <button>Lidas</button>
                <button>Lixeira</button>
            </div>
            <div className="notificationTable-body">
                {children}
            </div>
        </div>
    )
}

export default NotificationTable;