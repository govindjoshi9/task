import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import UserList from "./components/UserList";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:8080";

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <UserList />
        <Form />
      </div>
    </div>
  );
}

export default App;
