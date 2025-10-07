const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/user.model');
const router = require('./routers/Auth.router');
const DashboardRouter = require('./routers/Dashboard.router');
const authMiddleware = require('./middlewares/auth.middleware');
const taskRoutes = require('./routers/task.router');

// Load environment variables from .env file
dotenv.config();
const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

                        


app.get('/', (req, res) => {
    res.send('Backend ka office khul gaya hai!');
});

app.use('/api', router);  
    
app.use('/api/dashboard', DashboardRouter);

app.use('/api', taskRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Office port number ${PORT} par kaam kar raha hai.`);
});



module.exports = app;