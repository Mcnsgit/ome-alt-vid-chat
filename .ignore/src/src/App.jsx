// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings/index';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>

        {" "}
        <ToastContainer autoClose={2000} />
        <Router />{" "}

    </ThemeProvider>
  );
}

export default App;