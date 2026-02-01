import { ToastContainer } from "react-toastify";
import "../globals.css";
import MainContext from "@/context/main-context";
import ReduxProvider from "@/redux/ReduxProvider";

export default function RootLayout({ children }) {
    return (
        <>
            <MainContext >
                <ReduxProvider>
                    {children}
                    <ToastContainer
                        position="top-center"
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </ReduxProvider>
            </MainContext >
        </>
    );
}