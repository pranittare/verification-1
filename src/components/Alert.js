import React, {useEffect} from "react";


const Alert = ({message, color = 'danger', setMessage}) => {
    const disapperingAlert = (msg) => {
        setTimeout(()=> {
            setMessage('')
        }, 3000)
        setMessage(msg)
    }
    useEffect(() => {
        if (message) {
            disapperingAlert(message)
        }
    },[message])
    return (
        <div className={`fixed-bottom alert alert-${color}`} role="alert" style={{width: '30vw', marginLeft: 'auto', marginRight: 'auto', zIndex: 100}}>
            {message}
        </div>
    )
}

export default Alert