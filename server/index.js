import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log('Conectado a mongo db', mongoose.connection.name))
    .catch( err => console.error('Error al conectar a base de datos', err));

app.get('/', (req, res) => {
    res.send('API Funcionando!');
});

app.use('/api/auth/', authRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));