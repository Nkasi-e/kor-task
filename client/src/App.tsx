import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg h-full mt-5">
        <Outlet />
      </div>
    </>
  );
}

export default App;
