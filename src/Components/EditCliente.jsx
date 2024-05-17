import {React, useState} from "react";
import {Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
 


const EditCliente = () => {
    return (
<section className="clientes">
    <div className="card text-center">
    <div className="card-header">
    <h3>Información del cliente</h3>
  </div>

      
  <Form class="row g-3">
  <div className="col-auto">
  <label  className="form-label">Nombre comercial:</label>
    <input type="text" readonly className="form-control" id="name" placeholder="Ingresa el nombre comercial" />
    </div>

    <div className="col-auto">

    <label className="form-label">Correo electrónico:</label>
    <input type="text"  className="form-control" id="email" placeholder="Ingresa el correo eletrónico principal"  />
  </div>
  <div class="col-auto">
    <label  className="form-label">Teléfono: </label>
    <input type="number" className="form-control" id="phone" placeholder="Ingrese el teléfono principal" />
  </div>
  <div className="col-auto">
    <Button type="submit" className="btn btn-primary mb-3">Guardar</Button>
  </div>
  <div className="col-auto">
  <Link to="/clientes">
    <Button  type="button" className="btn btn-danger">Cancelar</Button> 
    </Link>
  </div>
  
</Form>
    </div>
  </section>
);
}

export default EditCliente;
