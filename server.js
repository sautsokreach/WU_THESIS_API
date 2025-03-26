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
import db from "./api/config/db.config.js";
import cron from 'node-cron';
import winston from 'winston';
import { StringSession } from "telegram/sessions/index.js";
import  {TelegramClient}  from "telegram";
import input from "input";
import { Api } from "telegram/tl/index.js";

var corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://wu-thesis-ten.vercel.app","https://va.webill365.com","https://test-va.webill365.com"]
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  logger.info({
    message: "Incoming Request",
    method: req.method,
    url: req.originalUrl,
    body: req.body,  // Logs the request body
    query: req.query, // Logs query params (optional)
    headers: req.headers, // Logs headers (optional)
  });
  next();
});

const logger = winston.createLogger({
  level: 'info',  // Default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to log
    winston.format.json()       // Format logs as JSON
  ),
  transports: [
    new winston.transports.Console(), // Output logs to console
    new winston.transports.File({ filename: 'logs/app.log' }) // Output logs to a file
  ],
});

const keepDatabaseAlive = () => {
  db.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error keeping DB alive:', err);
    } else {
      console.log('Database is alive:', res.rows);
    }
  });
};
cron.schedule('*/5 * * * *', () => {
  keepDatabaseAlive(); // Ping DB every minute
});

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


 const APP_ID = 25415215;
 const API_HASH = "3f45b77345adbf975c91f2fe8175c174";

// const session = new StringSession(""); // Empty string for a new session
// const client = new TelegramClient(session, APP_ID, API_HASH, {
//     connectionRetries: 5,
// });

// (async () => {
//     await client.start({
//         phoneNumber: async () => await input.text("Enter phone number: "),
//         password: async () => await input.text("Enter password (if enabled): "),
//         phoneCode: async () => await input.text("Enter the code you received: "),
//         onError: (err) => console.log(err),
//     });

//     console.log("Session string:", client.session.save());
//     await client.sendMessage("me", { message: client.session.save() }); // Send session to yourself
// })();

const SESSION_STRING = ``

const client = new TelegramClient(new StringSession(SESSION_STRING), APP_ID, API_HASH, {
  connectionRetries: 5,
});

await client.start();

// // Your bot or script logic goes here
// await client.sendMessage("me", { message: "Hello from your bot!" });

// console.log("Bot is running...");
// Listen for new messages
// client.addEventHandler(async (event) => {
//   console.log('No New Message:',event.className);
//   // Check if the event is a new message
//   if ( event.className === 'UpdateShortMessage' || event.className === 'UpdateNewMessage') {
//     const message = event.message;
    
//     try {
//       // Extract message details
//       const messageDetails = {
//         id: message.id,
//         peerId: message.peerId,
//         senderId: message.senderId,
//         text: message.message,
//         timestamp: message.date,
//         isOutgoing: message.out,
//         media: message.media ? true : false
//       };

//       console.log('New Message:', message);
//       try {
//         await client.sendMessage("-1002699373762", { message });
//         console.log('Message sent successfully');
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }

//       // Add your custom logic here
//       // For example, you might want to:
//       // - Store the message
//       // - Trigger specific actions based on content
//       // - Send automated responses
//     } catch (error) {
//       console.error('Error processing message:', error);
//     }
//   }
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server run on port : localhost:" + port);
});
