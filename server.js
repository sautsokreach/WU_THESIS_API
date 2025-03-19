import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import Files from Route
import rooms from "./api/routes/Room.routes.js";
import departments from "./api/routes/Department.routes.js";
import university from "./api/routes/University.routes.js";
import professor from "./api/routes/Professor.routes.js";
import subject from "./api/routes/Subject.routes.js";
import professor_schedule from "./api/routes/Professor_Schedule.routes.js";
import Major from "./api/routes/Major.routes.js";
import Auth from "./api/routes/auth.routes.js";
import User from "./api/routes/UserLogin.routes.js";
import Schedule from "./api/routes/Schedule.routes.js";
import ScheduleDay from "./api/routes/Schedule_Day.routes.js";
import Test from "./api/routes/Test.routes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


var corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://wu-thesis-ten.vercel.app","https://va.webill365.com","https://test-va.webill365.com"]
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Use Routes
rooms(app);
departments(app);
university(app);
professor(app);
subject(app);
professor_schedule(app);
Major(app);
Auth(app);
User(app);
Schedule(app);
ScheduleDay(app);
Test(app);
// Server Port

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",  // 🔥 Change from "2.0" to "3.0.0"
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic', // Basic authentication scheme
        },
      },
    },
    security: [
      {
        basicAuth: [], // This applies the basicAuth to the routes
      },
    ]
  },
  apis: ['./api/routes/*.js'],    // Path to the files where your API routes are defined (use glob pattern)
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// (Optional) Serve raw Swagger JSON (if needed)
app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server run on port : localhost:" + port);
});
