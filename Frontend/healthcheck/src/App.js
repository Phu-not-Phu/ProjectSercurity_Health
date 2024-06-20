import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/requireAuth";

import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Users from "./pages/users/users";
import Detail from "./pages/Detail/detail"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/detail" element={<Detail />} />

            {/*Protected routes*/}
            <Route element={<RequireAuth />}>
              <Route exact path="/users" element={<Users />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
