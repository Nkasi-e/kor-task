import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
      <ToastContainer />
      <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg h-full">
        <Outlet />
      </div>
      {/* </Provider> */}
    </>
  );
}

export default App;
