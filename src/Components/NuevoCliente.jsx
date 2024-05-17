import { React, useState } from "react";
import { Button, Form, Container, Row, Col, Card, Toast, ToastContainer, Spinner} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import clientService from "../services/clientService";

const NuevoCliente = () => {
  const [nombreComercial, setNombreComercial] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [messageToast, setMessageToast] = useState(null);
  const [titleToast, setTitleToast] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading]=useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCliente = {
      nombre_comercial: nombreComercial,
      correo: correo,
      telefono: telefono,
    };
    try {
        setLoading(true)
        await clientService.createCliente(newCliente);
        setShowToast(true);
        setMessageToast("Cliente creado con éxito");
        setTitleToast("Éxito")
        setTimeout(() => {
          navigate("/clientes");
        }, 3000); // Redirigir después de 3 segundos
    } catch (error) {
        setLoading(false)
        setMessageToast("Hubo un error al crear el cliente. Inténtalo de nuevo");
        setTitleToast("Error")
        setShowToast(true);    
    }
  };
  const handleCloseToast = () => setShowToast(false);
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
                  <h2>Agregar cliente</h2>
                </Col>
              </Row>
              <Row className="my-4 justify-content-center">
                <Col md={8}>
                  <Form className="row g-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nombre comercial:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Ingresa el nombre comercial"
                        value={nombreComercial}
                        onChange={(e) => setNombreComercial(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Correo electrónico:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Ingresa el correo electrónico principal"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Teléfono:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        placeholder="Ingrese el teléfono principal"
                        value={telefono}
                        maxLength={10}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>
                    <Row className="mt-4">
                    <Col className="d-flex justify-content-end">
                        <Button type="submit" className="btn btn-primary me-2" disabled={nombreComercial.length===0  || loading ? true : false}>
                          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Guardar'}
                        </Button>
                        <Link to="/clientes">
                          <Button type="button" className="btn btn-danger" >Cancelar</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        
        <ToastContainer position="top-end" className="p-3">
          <Toast show={showToast} onClose={handleCloseToast} bg={titleToast==="Error"? "danger" : "success"} autohide>
            <Toast.Header>
              <strong className="me-auto">{titleToast}</strong>
              <small>Ahora</small>
            </Toast.Header>
            <Toast.Body>{messageToast}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    
    </div>
  );
};

export default NuevoCliente;
