import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NuevoCliente from '../Components/NuevoCliente'; 
import clientService from '../services/clientService';
jest.mock('../services/clientService'); // Mocking the client service module

describe('NuevoCliente Component', () => {
  test('renders without errors', () => {
    render(<NuevoCliente />);
    expect(screen.getByText('Agregar cliente')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre comercial:')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo electrónico:')).toBeInTheDocument();
    expect(screen.getByLabelText('Teléfono:')).toBeInTheDocument();
  });

  test('form submission with success', async () => {
    render(<NuevoCliente />);
    fireEvent.change(screen.getByLabelText('Nombre comercial:'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono:'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByText('Guardar'));
    

    clientService.createCliente.mockResolvedValueOnce({});
    
    expect(screen.getByRole('status')).toBeInTheDocument(); 
    
    await waitFor(() => {
      expect(screen.getByText('Cliente creado con éxito')).toBeInTheDocument(); 
      
    });
    expect(screen.queryByText('Agregar cliente')).not.toBeInTheDocument(); 
    
  });

  test('form submission with error', async () => {
    render(<NuevoCliente />);
    fireEvent.change(screen.getByLabelText('Nombre comercial:'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono:'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByText('Guardar'));
    

    clientService.createCliente.mockRejectedValueOnce(new Error('Error creating client'));
    
    expect(screen.getByRole('status')).toBeInTheDocument(); 
    
    await waitFor(() => {
      expect(screen.getByText('Hubo un error al crear el cliente. Inténtalo de nuevo')).toBeInTheDocument(); 
      
    });
    expect(screen.getByText('Agregar cliente')).toBeInTheDocument();
  });
});
