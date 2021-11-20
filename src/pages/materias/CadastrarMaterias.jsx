import axios from "axios";
import { useState } from "react";
import { ButtonCadastro, Form, InputCadastro } from "../../components/Cadastros";
import { API_URL } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CadastrarMaterias = () => {
  const MySwal = withReactContent(Swal);

  const [titulo, setTitulo] = useState();
  const [professorNome, setProfessorNome] = useState();

  const cadastrarMaterias = () => {
    axios
      .post(API_URL, {
        titulo: titulo,
        professor_nome: professorNome,
      })
      .then((response) => {
        if (response.status === 201) {
          MySwal.fire(<p>{response?.data?.message}</p>);
          limparCampos();
        }
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };

  const limparCampos = () => {
    setTitulo("");
    setProfessorNome("");
  };

  return (
    <Form>
      <InputCadastro
        label="Título"
        variant="outlined"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <InputCadastro
        label="Nome do Professor"
        variant="outlined"
        value={professorNome}
        onChange={(e) => setProfessorNome(e.target.value)}
      />
      <ButtonCadastro variant="contained" onClick={cadastrarMaterias}>
        Cadastrar
      </ButtonCadastro>
    </Form>
  );
};

export default CadastrarMaterias;
