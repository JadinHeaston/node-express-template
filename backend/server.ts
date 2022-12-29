import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { isStringObject } from 'util/types';

const fess_app = express(); //Creating an express application.
const listening_port = 80; // Port to listen on.

//Setting POST data to be interpreted as JSON.
fess_app.use(express.json());

fess_app.get('/', async function (req: Request, res: Response) {
	fess_app.use(express.static('frontend')); //Setting root directory for front-end work.

	//Show UI.
	res.send(await readHTML('./frontend/index.html')).end();
});

var server = fess_app.listen(listening_port, function () {
	const server_information = server.address();

	if (server_information !== null && !isStringObject(server_information))
		console.log("[F-ESS] Listening at http://%s:%s", server_information.address, server_information.port);
	else
		console.log('[F-ESS] Running on port: ' + listening_port);
});

fess_app.on('uncaughtException', function (err) {
	console.log('Caught exception: ' + err);
});







async function readHTML(filepath: string): Promise<string> {
    var HTMLOutput = '';
    
    HTMLOutput = HTMLOutput.concat(readFileSync(filepath).toString());

    return HTMLOutput;
}
