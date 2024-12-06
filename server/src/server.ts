import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/homeData", async (req: Request, res: Response) => {
  const { Address, PropertyType, Radius, Comparables } = req.body;
  // DEFUNCT API KEY
  const RENTCAST_TOKEN = "59c20821c724498fb6bfeb8780fca042";
  console.log(RENTCAST_TOKEN);
  // Checks if the api key is present.
  if (!RENTCAST_TOKEN) {
    throw new Error("RentCast API key is missing or undefined");
  }

  const url = `https://api.rentcast.io/v1/avm/value?address=${encodeURIComponent(
    Address
  )}&propertyType=${encodeURIComponent(
    PropertyType
  )}&radius=${encodeURIComponent(Radius)}&compCount=${encodeURIComponent(
    Comparables
  )}`;

  const options = {
    method: "GET",
    headers: { accept: "application/json", "X-Api-Key": RENTCAST_TOKEN },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch home data." });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
