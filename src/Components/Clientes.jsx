import { React, useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  Spinner,
  Pagination,
  Toast,
  ToastContainer
} from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import clientService from "../services/clientService";
import { FaPlus } from 'react-icons/fa';
import { datosFicticios } from "../dummyData/dummyClient";


const Clientes = () => {
    const [showToast, setShowToast] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // Almacenar el ID del elemento eliminado
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Número de elementos por página
    const navigate = useNavigate(); // Inicializa useHistory
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Llamada a la API para obtener los datos de los clientes
    const fetchData = async () => {
      try {
        const clientes = await clientService.getClientes();
        setData(clientes);
        setLoading(false);
      } catch (error) {
        setData(datosFicticios)
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [search, setSearch] = useState("");
 // Manejar cambios en el término de búsqueda
 const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Restablecer la página actual al buscar
  };
  const handleDelete = (id) => {
    setDeleteId(id); // Guardar el ID del elemento eliminado
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setShowToast(true); // Mostrar el Toast
    
    //DATO POR SI SIRVE EL API
    //clientService.deleteCliente(id)
  };

  const handleEdit = (id) => {
    const cliente = data.find(cliente => cliente.id === id);
    navigate(`/cliente/${id}`, { state: { cliente } });
    console.log(`Edit client with id: ${id}`);
  };
  const filteredData = data.filter((item) =>
    item.nombre_comercial.toLowerCase().includes(search.toLowerCase())
  );

  //Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los elementos para la página actual
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      style={{
        backgroundColor: "#343a40",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
      
        <Card style={{ width: "100%", maxWidth: "100%" }}>
          <Card.Body>
            <Container>
              <Row className="my-4 justify-content-between align-items-center">
                <Col>
                  <h2>Directorio de Clientes</h2>
                </Col>
                <Col className="text-end">
                  <Link to="/nuevo-cliente">
                    <Button variant="primary">
                    <FaPlus style={{ marginRight: '8px' }} />
                    Agregar
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row className="my-4">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={handleSearch}
                    className="form-control-lg"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                <div className="table-responsive d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    {loading ? ( // Mostrar Spinner si loading es true
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                        <Table className="table table-striped">
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            <th>Nombre comercial</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item) => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.nombre_comercial}</td>
                              <td>{item.telefono}</td>
                              <td>{item.correo}</td>
                              <td>
                                <Button
                                  variant="info"
                                  className="me-2"
                                  onClick={() => handleEdit(item.id)}
                                >
                                  Editar
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Eliminar
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                     {/* Paginador */}
      
                  </div>
                </Col>
              </Row>
              <Row>
              <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <ToastContainer position="top-end" className="p-3">

        <Toast show={showToast} onClose={() => setShowToast(false)} bg="warning">
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Eliminado</strong>
        </Toast.Header>
        <Toast.Body>
          El registro con ID {deleteId} ha sido eliminado correctamente.
        </Toast.Body>
      </Toast>
      </ToastContainer>
      </Container>
    </div>
  );
};
export default Clientes;
