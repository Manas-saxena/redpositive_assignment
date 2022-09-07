import Main from "./Main/Main"
import  { Toaster } from "react-hot-toast";
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        {" "}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4a2d88",
              },
            },
          }}
        ></Toaster>
      </div>
      <Main></Main>
    </div>
  );
}

export default App;
