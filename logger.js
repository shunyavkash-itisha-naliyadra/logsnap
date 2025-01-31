/*
Copyright (c) 2025 Itisha Naliyadra

This middleware function is designed to log HTTP requests and responses for a Node.js/Express application.
It offers customization for logging various details such as HTTP method, status code, request duration, and more.

This logger supports color-coded logs for the console and can log to a file. By default, it logs the following:
- HTTP Method
- Request Path
- Status Code
- Duration of the request

Customization options are available to choose what details to log and where to store the logs.
*/


const fs = require("fs");
const path = require("path");
const loggger = (options = {}) => {
  // Destructure the options object to allow customization of what gets logged
  let {
    logIncoming = true, // Log incoming requests (default is true)
    logStatusCode = true, // Log response status code (default is true)
    logDuration = true, // Log request duration (default is true)
    logMethod = true, // Log HTTP method (default is true)
    logPath = true, // Log the requested URL path (default is true)
    logIP = false, // Log client IP address (default is false)
    logUserAgent = false, // Log the User-Agent header (default is false)
    logToFile = false, // Log to a file (default is false)
    logFilePath = path.join(process.cwd(), "logs.txt"), // Log file path (default is "logs.txt")
  } = options;
  // Function to get the client's IP address
  const getClientIP = (req) => {
    // Check for the 'x-forwarded-for' header in case the request is behind a proxy
    const forwarded = req.headers["x-forwarded-for"];
    return forwarded
      ? forwarded.split(",")[0].trim()
      : req.connection?.remoteAddress ||
          req.socket?.remoteAddress ||
          "Unknown IP";
  };
  // Helper functions for color formatting log output
  const getMethodColor = (method) => {
    // Assign colors based on HTTP method for better readability
    switch (method) {
      case "GET":
        return "\x1b[38;2;128;255;128m";
      case "POST":
        return "\x1b[38;2;255;255;128m";
      case "PUT":
        return "\x1b[38;2;128;128;255m";
      case "DELETE":
        return "\x1b[1;38;2;255;128;128m";
      default:
        return "\x1b[38;2;255;255;255m";
    }
  };
  const getStatusColor = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return "\x1b[38;2;128;255;128m";
    if (statusCode >= 300 && statusCode < 400) return "\x1b[38;2;128;128;255m";
    if (statusCode >= 400 && statusCode < 500) return "\x1b[38;2;255;255;128m";
    if (statusCode >= 500) return "\x1b[38;2;255;128;128m";
    return "\x1b[38;2;255;255;255m";
  };
  const getPathColor = () => "\x1b[38;2;255;255;255m";
  // Function to remove color codes from the log message for file storage
  const removeColorCodes = (message) => {
    return message.replace(/\x1b\[[0-9;]*m/g, "");
  };
  // Function to log messages to a plain text file
  const logToPlainTextFile = (message) => {
    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, "Log file created\n"); // Create the file with an initial line
    }
    // Remove color codes before writing to the file for readability
    const plainMessage = removeColorCodes(message);
    fs.appendFileSync(logFilePath, plainMessage + "\n");
  };
  // Middleware function to log requests and responses
  return (req, res, next) => {
    const start = Date.now();
    // Log incoming request details
    if (logIncoming) {
      let logMessage = "";
      if (logMethod) {
        logMessage += `${getMethodColor(req.method)}${req.method}\x1b[0m `;
      }
      if (logPath) {
        logMessage += `${getPathColor(req.originalUrl)}${
          req.originalUrl
        }\x1b[0m `;
      }
      if (logIP) {
        logMessage += `from ${getClientIP(req)} `;
      }
      if (logUserAgent) {
        logMessage += `(User-Agent: ${req.headers["user-agent"]}) `;
      }
      logMessage += `Incoming request`;
      if (logToFile) {
        logToPlainTextFile(logMessage);
      } else {
        console.log(logMessage);
      }
    }
    res.on("finish", () => {
      const duration = Date.now() - start;
      let logMessage = "";
      if (logMethod) {
        logMessage += `${getMethodColor(req.method)}${req.method}\x1b[0m `;
      }
      if (logPath) {
        logMessage += `${getPathColor(req.originalUrl)}${
          req.originalUrl
        }\x1b[0m `;
      }
      if (logStatusCode) {
        logMessage += `${getStatusColor(res.statusCode)}${
          res.statusCode
        }\x1b[0m `;
      }
      if (logDuration) {
        logMessage += `\x1b[33m${(duration / 1000).toFixed(3)} seconds\x1b[0m `;
      }
      if (logToFile) {
        logToPlainTextFile(logMessage);
      } else {
        console.log(logMessage);
      }
    });
    next();
  };
};
module.exports = loggger;
