import {toast} from 'react-toastify';

export const handleSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            background: "transparent",
            color: "white",
            backdropFilter: "blur(10px)",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            maxWidth: "300px",
        }
    });
}

export const handleError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            background: "transparent",
            color: "white",
            backdropFilter: "blur(10px)",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            maxWidth: "300px",
        }
    });
}