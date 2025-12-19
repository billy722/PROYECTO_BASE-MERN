import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoutes";

//BROWSER ROUTER ES EL CONTENEDOR PRINCIPAL DEL ROUTER, ENVUELVE TODA LA APP
//ROUTES ES EL CONTENEDOR DE RUTAS, AQUI DEFINO QUE MOSTRAR CON CADA URL
//ROUTE ES UNA REGLA QUE DEFINE QUE UNA RUTA MUESTRA TAL COMPONENTE

export default function App() {

  return(
      <Routes>
          <Route path="/" element={<Login />}/>

          <Route path="/login" element={<Login />}/>

          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

          <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />

      </Routes>
  );
}

// import Login from './pages/Login';

// export default function App() {
//   return <Login />;
// }