import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import UserList from "./components/UserList";

function App() {
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
