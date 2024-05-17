import { React, useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import clientService from "../services/clientService";
import { FaPlus } from 'react-icons/fa';

const Clientes = () => {
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
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleEdit = (id) => {
    console.log(`Edit client with id: ${id}`);
  };
  const filteredData = data.filter((item) =>
    item.nombre_comercial.toLowerCase().includes(search.toLowerCase())
  );
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
                <div class="table-responsive">
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
                      {filteredData.map((item) => (
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
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default Clientes;
