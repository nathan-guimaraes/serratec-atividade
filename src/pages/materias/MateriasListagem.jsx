import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URLM } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../lotties/78259-loading.json";

const MateriasListagem = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [materias, setMaterias] = useState([]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_URLM).then((response) => {
      setMaterias(response.data);
    });
  };

  const deletarMateria = (materia) => {
    axios
      .delete(API_URLM, { data: materia })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);

        const materiaIndex = materias.findIndex(
          (elemento) => elemento.id === materia.id
        );
        let newMaterias = [...materias];
        newMaterias.splice(materiaIndex, 1);
        setMaterias(newMaterias);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };

    const editarMateria = (materia) => {
      navigate(`/editar-materias/${materia.id}`);
    };

  return (
    <Box sx={{ marginTop: "25px" }}>
      {materias.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Título</StyledTableCell>
                <StyledTableCell>Nome do Professor</StyledTableCell>
                <StyledTableCell>Ações</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materias.map((materia) => (
                <StyledTableRow>
                  <StyledTableCell>{materia.id}</StyledTableCell>
                  <StyledTableCell>{materia.titulo}</StyledTableCell>
                  <StyledTableCell>{materia.professor_nome}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => editarMateria(materia)} variant="text">
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => deletarMateria(materia)}
                      variant="text"
                    >
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Lottie options={defaultOptions} height={500} width={500} />
        </>
      )}
    </Box>
  );
};

export default MateriasListagem;
