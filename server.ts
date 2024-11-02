import express, { Request, Response } from "express";
import { ExpressPeerServer } from "peer";

// Initialize Express app
const app = express();

// Define a port
const PORT = process.env.PORT || 3001;

// Create an HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Options for the PeerJS server (using valid options)
const peerOptions = {
  proxied: true, // Enable proxy handling, or include other valid options
};

// Create the PeerJS server
const peerServer = ExpressPeerServer(server, peerOptions);

// Mount the PeerJS server at a specific route (e.g., '/peerjs')
app.use("/peerjs", peerServer);

// Simple route to check the server status
app.get("/", (req: Request, res: Response) => {
  res.send("PeerJS server is running!");
});

// Handle PeerJS events with correct method to get client ID
peerServer.on("connection", (client) => {
  console.log("Client connected:", client.getId());
});

peerServer.on("disconnect", (client) => {
  console.log("Client disconnected:", client.getId());
});
