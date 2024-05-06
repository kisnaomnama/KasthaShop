
import "./NotificationModal.css";

function NotificationModal({ message, onClose}) {
    
    const handleClick = (e) => {
        e.stopPropagation(); 
        window.location.reload(); 
        onClose();         
    };
    
    return (
        <div className='popup-message '>
            <p>{message}</p>
            <button onClick={handleClick}>Ok</button>
        </div>
    )
}

export default NotificationModal;
