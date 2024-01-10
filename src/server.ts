import http from 'node:http';
import express, { Router, Request, Response, NextFunction } from 'express';
import helmet from 'helmet'
import endpoints from './endpoints';

const app = express();
const server = require('http').Server(app);
app.use(express.json());
const port = 3000;

app.use('/api', endpoints);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
  });

app.get('/api', (req: Request, res: Response) => {
	res.send('Hello, TypeScript Express!');
  });

module.exports = server;