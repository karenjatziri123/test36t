import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://ext-donation-lance-hunger.trycloudflare.com', 
    headers: {
        'Content-Type': 'application/json',
    },
});

const clientService = {
    getClientes: async () => {
        try {
            const response = await apiClient.get('/api/v1/cliente/');
            return response.data;
        } catch (error) {
            console.error("Error fetching clients:", error);
            throw error;
        }
    },

    createCliente: async (cliente) => {
        try {
            const response = await apiClient.post('/api/v1/cliente/', cliente);
            return response.data;
        } catch (error) {
            console.error("Error creating client:", error);
            throw error;
        }
    },

    updateCliente: async (id, cliente) => {
        try {
            const response = await apiClient.patch(`/clientes/${id}`, cliente);
            return response.data;
        } catch (error) {
            console.error("Error updating client:", error);
            throw error;
        }
    },

    deleteCliente: async (id) => {
        try {
            await apiClient.delete(`/clientes/${id}`);
        } catch (error) {
            console.error("Error deleting client:", error);
            throw error;
        }
    },
};

export default clientService;
