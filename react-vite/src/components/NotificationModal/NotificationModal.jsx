
import "./NotificationModal.css";

function NotificationModal({ message, onClose }) {

    return (
        <div className='popup-message '>
            <p>{message}</p>
            <button onClick={onClose}>Ok</button>
        </div>
    )
}

export default NotificationModal;
