import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";
import cors from 'cors';
import bodyParser from "body-parser";

const port = config.get("port") as number;
const host = config.get("host") as string;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/images'))

app.use(cors({
  origin: '*'
}));
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);
  connect();
  routes(app);
});
