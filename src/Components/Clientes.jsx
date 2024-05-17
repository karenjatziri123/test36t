import {React, useState} from "react";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

const initialData = [
    { id: 1, nombre_comercial: 'Juan Perez', correo: 'juan@example.com' },
    { id: 2, nombre_comercial: 'Maria Lopez', correo: 'maria@example.com' },
    { id: 3, nombre_comercial: 'Carlos Sanchez', correo: 'carlos@example.com' },
]


const Clientes = () => {
    const [search, setSearch]=useState('');
    const [data, setData] = useState(initialData);
    const handleSearch = (event) => {
        setSearch(event.target.value);
      };
      const handleDelete = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
    };

    const handleEdit = (id) => {
        console.log(`Edit client with id: ${id}`);
    };
      const filteredData = initialData.filter(item =>
        item.nombre_comercial.toLowerCase().includes(search.toLowerCase())
      );
      return (
        <Container>
            <Row className="my-4">Directorio de clientes
            <Link to="/nuevo-cliente">
            <Button>
                Agregar
            </Button>
            </Link>
            </Row>
          <Row className="my-4">
            <Col>
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={handleSearch}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre comercial</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nombre_comercial}</td>
                      <td>{item.telefono}</td>
                      <td>{item.correo}</td>
                      <td>
                                        <Button variant="info" className="me-2" onClick={() => handleEdit(item.id)}>
                                            Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                            Eliminar
                                        </Button>
                                    </td>



                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      );
    };
export default Clientes;
