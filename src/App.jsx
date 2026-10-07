import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<h1>Catálogo</h1>} />
          <Route path="/nosotros" element={<h1>Nosotros</h1>} />
          <Route path="/panel" element={<h1>Panel</h1>} />
          <Route path="/login" element={<h1>Ingresar</h1>} />
          <Route path="/registro" element={<h1>Registrarse</h1>} />
          <Route path="/deseos" element={<h1>Lista de deseos</h1>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
