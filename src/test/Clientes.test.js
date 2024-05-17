import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Clientes from '../Components/Clientes';

describe('Clientes Component', () => {
  test('renders without errors', () => {
    render(<Clientes />);
    expect(screen.getByText('Directorio de Clientes')).toBeInTheDocument();
  });

  test('search functionality works correctly', () => {
    render(<Clientes />);
    fireEvent.change(screen.getByPlaceholderText('Buscar...'), { target: { value: 'test' } });
    expect(screen.getByPlaceholderText('Buscar...')).toHaveValue('test');
  });

  test('delete functionality works correctly', () => {
    render(<Clientes />);
    const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButton);
    expect(screen.queryByText('test cliente')).not.toBeInTheDocument();
  });

  test('edit functionality works correctly', () => {
    render(<Clientes />);
    const editButton = screen.getByRole('button', { name: /Editar/i });
    fireEvent.click(editButton);
    expect(screen.getByText('Edit client with id: 1')).toBeInTheDocument();
  });
});
