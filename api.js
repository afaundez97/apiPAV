// Importa el módulo Express
const express = require('express');
// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Arreglo de objetos que representa Smartphones
const Smartphones = [
    { id: 1, name: 'Xiaomi 11', almacenamiento: 128, enroll: true },
    // ... otros objetos
];

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Node JS api');
});

// Ruta para obtener todos los Smartphones
app.get('/api/Smartphones', (req, res) => {
    res.send(Smartphones);
});

// Ruta para obtener un Smartphone por su ID
app.get('/api/Smartphones/:id', (req, res) => {
    // Encuentra el Smartphone por su ID
    const Smartphone = Smartphones.find(c => c.id === parseInt(req.params.id));
    // Si no se encuentra, devuelve un mensaje de error
    if (!Smartphone) return res.status(404).send('Modelo no encontrado');
    // Si se encuentra, devuelve el Smartphone
    else res.send(Smartphone);
});

// Ruta para agregar un nuevo Smartphone
app.post('/api/Smartphones', (req, res) => {
    // Crea un nuevo objeto Smartphone con la información proporcionada en la solicitud
    const newSmartphone = {
        id: Smartphones.length + 1,
        name: req.body.name,
        almacenamiento: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    // Agrega el nuevo Smartphone al arreglo
    Smartphones.push(newSmartphone);
    // Devuelve el nuevo arreglo de Smartphones como respuesta
    res.send(Smartphones);
});

// Ruta para eliminar un Smartphone por su ID
app.delete('/api/Smartphones/:id', (req, res) => {
    // Encuentra el Smartphone por su ID
    const Smartphone = Smartphones.find(c => c.id === parseInt(req.params.id));
    // Si no se encuentra, devuelve un mensaje de error
    if (!Smartphone) return res.status(404).send('Smartphone no encontrado');

    // Encuentra el índice del Smartphone en el arreglo
    const index = Smartphones.indexOf(Smartphone);
    // Elimina el Smartphone del arreglo
    Smartphones.splice(index, 1);
    // Devuelve el nuevo arreglo de Smartphones como respuesta
    res.send(Smartphones);
});

// Puerto en el que la aplicación escucha las solicitudes
const port = process.env.port || 80;
// Inicia la aplicación en el puerto especificado
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
