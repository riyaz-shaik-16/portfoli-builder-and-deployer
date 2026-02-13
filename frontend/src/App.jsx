import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Preview from "./pages/Preview";
import Theme from "./pages/Theme";
import Template from "./pages/Template";
import Builder from "./pages/Builder";
import Deploy from "./pages/Deploy";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout title="Dashboard" />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<DashboardLayout title="Builder" />}>
            <Route path="/builder" element={<Builder />} />
          </Route>
          <Route element={<DashboardLayout parent="Builder" title="Template" />}>
            <Route path="/builder/template" element={<Template />} />
          </Route>
          <Route element={<DashboardLayout parent="Builder" title="Details" />}>
            <Route path="/builder/details" element={<Details />} />
          </Route>
          <Route element={<DashboardLayout parent="Builder" title="Theme" />}>
            <Route path="/builder/theme" element={<Theme />} />
          </Route>
          <Route element={<DashboardLayout parent="Builder" title="Preview" />}>
            <Route path="/builder/preview" element={<Preview />} />
          </Route>
          <Route element={<DashboardLayout parent="Builder" title="Deploy" />}>
            <Route path="/builder/deploy" element={<Deploy />} />
          </Route>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
