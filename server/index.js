import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/usersRoutes.js';
import fs from 'fs';
import colors from 'colors';
import { execSync } from 'child_process';
import { errorHandler } from './middlewares/errorHandler.js';

//detectar rama actual de git
let currentBranch = "unknown";
try{
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
} catch(err){
    console.log('No se puede detectar la rama de GIT');
}


if(fs.existsSync('.env.dev') && process.env.NODE_ENV !== 'production'){
    dotenv.config({path: '.env.dev'});
    console.log(colors.cyan(`🌱 Estás en la rama: ${currentBranch} | Entorno: desarrollo (.env.dev)`));
}else{
    dotenv.config({path: '.env.prod'});
    console.log(colors.yellow(`🚀 Estás en la rama: ${currentBranch} | Entorno: producción (.env.prod)`));
}

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
app.use('/api/users/', usersRoutes);
// 👇 SIEMPRE el último middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));