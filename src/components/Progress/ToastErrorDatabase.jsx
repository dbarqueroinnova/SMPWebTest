import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ToastErrorDatabase = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      theme="light"
    >
      {toast.error("Error de conexión")}
    </ToastContainer>
  );
};

export const ToastErrorAccess = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      theme="light"
    >
      {toast.error("No tienes acceso a la aplicación")}
    </ToastContainer>
  );
};
