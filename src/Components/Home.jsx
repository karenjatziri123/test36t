import React from 'react'
import { Button } from 'react-bootstrap' 
import { Link } from 'react-router-dom';

const Home = () => (
    <div style={{ display: 'flex', height: '100vh', textAlign: 'center', color: 'white', backgroundColor: '#343a40' }}>
            <div class="cover-container d-flex w-full h-full p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
        
        </div>
      </header>
      <main class="px-3">
        <h1>Prueba Técnica 36T</h1>
        <p class="lead">
          Página de prueba técnica para puesto de desarrollador Frontend 
        </p>
        <p class="lead">
          <Link to="/clientes"> 
          <Button variant='light'>

            Ver Clientes
          </Button>
          </Link>
        </p>
      </main>
      <footer class="mt-auto text-white-50">
        <p>
          Karen Jatziri Vázquez Vargas
        </p>
      </footer>
    </div>
  </div>
);

export default Home
