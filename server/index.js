import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then( () => console.log('Conectado a Mongo') )
.catch( err => console.error('Error al conectar', err) );

app.get('/', (req, res) => {
    res.send('API Funcionando!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));