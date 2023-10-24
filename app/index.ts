import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import * as command from '@app/functions/commands';
import dataSource from '@app/functions/database';


(async () => {
	await dataSource.initialize();
	await dataSource.runMigrations();
	await command.quit();
	await command.start();
	await command.adminhello();
	await command.report();
	await command.launch();
})();


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('client/public'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'));
});


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, Express with TypeScript!' });
});

// Define a route with URL parameters
app.get('/greet/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
