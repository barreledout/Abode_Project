import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"

const app = express();
const PORT = 5000;
const rentCast_Key = process.env.RentCastKEY

app.get("/api/homeData", (req, res) => {
    res.json({"hello": ["hi"]})
})



app.listen(PORT, () => (console.log(`Server is listening on port: ${PORT}`)))