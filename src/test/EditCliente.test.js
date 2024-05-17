import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditCliente from '../Components/EditCliente'; 
import clientService from '../services/clientService';
// Mock de useHistory
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock de clientService
jest.mock('../services/clientService', () => ({
  updateCliente: jest.fn(() => Promise.resolve()),
}));

describe('EditCliente', () => {
    it('should show error toast on form submission failure', async () => {
        // Mock de updateCliente que devuelve un error
        jest.spyOn(clientService, 'updateCliente').mockRejectedValueOnce(new Error('Failed to update cliente'));
    
        render(<EditCliente />);
    

    // Simular la entrada de datos en los campos del formulario
    fireEvent.change(screen.getByLabelText('Nombre comercial:'), { target: { value: 'Nuevo Nombre Comercial' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico:'), { target: { value: 'nuevo_correo@example.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono:'), { target: { value: '1234567890' } });

    // Simular el envío del formulario
    fireEvent.click(screen.getByText('Guardar'));

    // Esperar a que se muestre el toast de error
    await waitFor(async () => {
        const errorToast = await screen.findByText('Failed to update cliente');
        expect(errorToast).toBeInTheDocument();
      });
    });
  });
