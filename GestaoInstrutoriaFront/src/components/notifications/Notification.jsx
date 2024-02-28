import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./notification.css"

const Notification = (props) => {
    return (
        <div className={`notification-container ${props.type}`}>
            <FontAwesomeIcon icon={props.icon} className="notificationbar-icon"/>
            <p>{props.title}</p>
        </div>
    )
}

export default Notification;