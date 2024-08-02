import 'dotenv/config'
import checkRoutes from "./routes/check.routes.js"
import  express from "express";
const app = express();

// import path from "path";
import methodOverride from "method-override";
import  ejsMate from "ejs-mate";

import cors from "cors";
import bodyParser from 'body-parser';
import  {connectToMongoDB} from "../connection.js";
// import userRoutes from "./routes/user.routes.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(methodOverride("_method"))
app.set ("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

// app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(bodyParser.json());

// app.use("/api/v1/users", userRoutes);

const dbUrl = process.env.ATLASDB_URL;
connectToMongoDB(dbUrl)
    .then((result) => {
        console.log("DB connected")
    }).catch((err) => {
        console.log("DB not connected", err)
    });

app.use("/home", checkRoutes);
app.use("/", (req,res)=>{
    console.log("hello...")
});

app.use("/a",(req,res)=>{
    res.send("Hello World");
})

app.listen(8080,()=>{
    console.log("Server Started");
});