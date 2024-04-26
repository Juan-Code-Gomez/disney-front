import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/character/Character";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./common/ProtectedRoute";
import Register from "./pages/auth/Register";
import RouterLayout from "./common/RouterLayout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RouterLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/movies" element={<Home />}></Route>
          <Route path="/character" element={<Character />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
