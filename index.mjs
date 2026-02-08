import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { createBareServer } from '@tomphttp/bare-server-node';

const app = express();
const bare = createBareServer('/bare/');
const server = createServer();

app.use(express.static('public'));
app.use('/uv/', express.static(uvPath));

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.route(req, res);
    } else {
        app(req, res);
    }
});

const port = process.env.PORT || 8080;
server.listen(port, '0.0.0.0');
