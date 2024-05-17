import React from 'react'
import { Button } from 'react-bootstrap' 
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="Home">
    <h3>Bienvenido</h3>
    <Link to="/clientes">
    <Button  type="button" className="btn btn-success">Ver clientes</Button> 
    </Link>
  </section>
)

export default Home
