import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "../../components/Styles";
import {
  ButtonCadastro,
  Form,
  InputCadastro,
} from "../../components/Cadastros";
import { API_URLM } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";

const CadastrarMaterias = () => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);

  const valorInicial = id ? "" : null;
  const [titulo, setTitulo] = useState(valorInicial);
  const [nomeProfessor, setNomeProfessor] = useState(valorInicial);

  useEffect(() => {
    getMaterias();
  }, []);

    const getMaterias = () => {
      axios.get(API_URLM).then((response) => {
        response.data.forEach((materia) => {
          if (materia.id == id) {
            setTitulo(materia.titulo);
            setNomeProfessor(materia.professor_nome);
          }
        });
      });
    };

  const cadastrarMaterias = () => {
    if (id) {
      axios
        .put(API_URLM, {
          id: id,
          titulo: titulo,
          professor_nome: nomeProfessor,
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
    } else {
      axios
        .post(API_URLM, {
          titulo: titulo,
          professor_nome: nomeProfessor,
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
    }
  };

  const limparCampos = () => {
    setTitulo("");
    setNomeProfessor("");
  };

  return (
    <Styles.Form>
      <Styles.InputCadastro
        label="Título"
        variant="outlined"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <Styles.InputCadastro
        label="Nome do Professor"
        variant="outlined"
        value={nomeProfessor}
        onChange={(e) => setNomeProfessor(e.target.value)}
      />
      <Styles.ButtonCadastro variant="contained" onClick={cadastrarMaterias}>
        {id ? "Editar" : "Cadastrar"}
      </Styles.ButtonCadastro>
    </Styles.Form>
  );
};

export default CadastrarMaterias;
