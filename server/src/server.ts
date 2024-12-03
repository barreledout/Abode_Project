import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
app.use(cors())
const PORT = 5000;
const rentCast_Key = process.env.RentCastKEY

app.get("/api/homeData", (req: Request, res: Response) => {
    res.json({"hello": ["hi"]})
})



app.listen(PORT, () => (console.log(`Server is listening on port: ${PORT}`)))