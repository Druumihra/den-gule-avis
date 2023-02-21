import express from "express";

const server = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get('/', (_req, res) => {
        res.send("Hello world!");
    });

    app.listen(5000, () => {
        console.log('API listening on port', 5000)
    });
}

server().catch((error) => console.error('Failed to start server', error));
