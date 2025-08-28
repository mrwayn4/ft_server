import Fastify from "fastify";
import { Server } from "socket.io";
import fastifyCors from "@fastify/cors";
import itemRoutes from "./routes/items.js";


const fastify = Fastify({ logger: true });
const port = 5000;

// // Register routes
// fastify.register(itemRoutes);

// Create Socket.IO server
const io = new Server(fastify.server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected to the server");

  socket.on("message", (message) => {
    console.log("Message received: ", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected from the server");
  });
});

const start = async () => {
  try {
    await fastify.listen({ port });
    fastify.log.info(`Server running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();