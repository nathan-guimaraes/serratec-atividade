import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, useRoutes } from "react-router-dom";
import AlunosListagem from './pages/alunos/AlunosListagem';
import MateriasListagem from './pages/materias/MateriasListagem';
import Navbar from './components/Navbar';
import Container from '@mui/material/Container';
import CadastrarAlunos from "./pages/alunos/CadastrarAlunos";
import CadastrarMaterias from "./pages/materias/CadastrarMaterias";

const Routes = () => {
  const routes = useRoutes([
    // { path: "/", element: <AlunosListagem /> },
    { path: "/", element: <MateriasListagem /> },
    { path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
    { path: "/listar-materias", element: <MateriasListagem /> },
    { path: "/cadastrar-materias", element: <CadastrarMaterias /> },
  ]);

  return routes;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="md">
        <Routes />
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
