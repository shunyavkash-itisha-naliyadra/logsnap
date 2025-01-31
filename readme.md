# logsnap

`logsnap` is a customizable logging middleware for Node.js applications, particularly designed to log incoming HTTP requests and their responses in an easy-to-read format. It supports logging to both the console and a file, and offers flexibility to choose which details to log, such as HTTP method, status code, request duration, client IP address, and user-agent.

## Features
- **Customizable Logging**: Log incoming requests, response status codes, duration, HTTP methods, paths, IP addresses, and user-agents.
- **Color-Coded Console Output**: Colorful output for better readability in the terminal.
- **Log to File**: Optionally log the details to a file (`logs.txt` by default).
- **Easy Integration**: Simple middleware that can be integrated into Express.js or similar Node.js frameworks.

## Installation

```bash
npm install logsnap

## Usage

#####Basic Usage

In your Node.js/Express application, you can use logsnap as middleware:
```js

const express = require('express');
const loggger = require('logsnap'); // Import the logsnap package

const app = express();

app.use(loggger());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

#### Output

When a request is made to the server, you'll see a log like:

```csharp
[INFO] GET / 200 0.003s
```

- Method: GET
- Route: /
- Status Code: 200
- Request Duration: 0.003 seconds (color-coded)

## Example with Customization

You can also customize the logger behavior by passing options:

```js
const express = require("express");
const performanceLogger = require("perf-logx");

const app = express();

// Use the logger middleware with customized options
app.use(
  performanceLogger({
    logIncoming: true, // Log incoming requests
    logStatusCode: true, // Log response status codes
    logDuration: true, // Log the request duration
    logMethod: true, // Log the HTTP method
    logPath: true, // Log the request path
    logIP: true, // Log the IP address of the requester
    logUserAgent: true, // Log the User-Agent of the requester
  })
);

// Example route
app.get("/example", (req, res) => {
  res.send("This is an example route.");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

## Configuration Options
You can customize what gets logged by passing an options object to loggger. The available options are:

| Option          | Type    | Default | Description                                                   |
| --------------- | ------- | ------- | ------------------------------------------------------------- |
| `logIncoming`   | Boolean | `true`  | Whether to log incoming requests.       |
| `logStatusCode` | Boolean | `true`  | Whether to log the response status code. |
| `logDuration`   | Boolean | `true`  | Whether to log the duration of the request.    |
| `logMethod`     | Boolean | `true`  | Whether to log the HTTP method (GET, POST, etc.).          |
| `logPath`       | Boolean | `true`  | Whether to log the request path (URL).        |
| `logIP`         | Boolean | `false` | Whether to log the client's IP address.              |
| `logUserAgent`  | Boolean | `false` | Whether to log the User-Agent header.              |
| `logToFile`     | Boolean | `false` | Whether to log to a file instead of the console.               |
| `logFilePath`   | string | `logs.txt` | The path of the log file (if logToFile is true).               |

## Example with File Logging

```js
app.use(loggger({
  logToFile: true, // Enable file logging
  //logFilePath: path.join(__dirname, "server_logs.txt")
}));
```
This will log the request details to the file logs.txt in the root of your project.

## How It Works
The loggger middleware logs request and response information such as HTTP method, path, status code, duration, client IP, and user-agent.
Logs can be color-coded in the console for better readability.
If logToFile is enabled, it will append logs to a file (logs.txt by default) without color formatting for easy text-based reading.

## License

This package is licensed under the MIT License. See the LICENSE file for details.

For any issues or feature requests, feel free to open an issue in the repository.
### Key Sections:
1. **Introduction**: A brief overview of what the package does.
2. **Features**: A list of the key features of the package.
3. **Installation**: How to install the package via npm.
4. **Usage**: How to use the package with example code.
5. **Configuration Options**: A table explaining the available configuration options.
6. **How It Works**: A brief explanation of how the middleware operates.
7. **License**: Information about the licensing.

Feel free to tweak the README according to your preferences or any additional features you might want to highlight!
