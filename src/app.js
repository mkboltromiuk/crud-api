const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);

sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
