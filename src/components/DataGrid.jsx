import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "titulo",
    headerName: "Título",
    width: 150,
    editable: true,
  },
  {
    field: "nomeProfessor",
    headerName: "Nome do Professor",
    width: 150,
    editable: true,
  },
];

const [materias, setMaterias] = useState([]);

useEffect(() => {
  getMaterias();
}, []);

const getMaterias = () => {
  axios.get(API_URL).then((response) => {
    setMaterias(response.data);
  });
};

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function DataGridDemo() {
  return (
    <Box sx={{ marginTop: "25px" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={materias.map((materia) => ({
            id: materia.id,
            titulo: materia.titulo,
            nomeProfessor: materia.professor_nome,
          }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Box>
  );
}
