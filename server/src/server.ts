import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { error } from "console";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/homeData", async (req: Request, res: Response) => {
  const { Address, PropertyType, Radius, Comparables } = req.body;

  const RENTCAST_TOKEN = process.env.RENTCAST_TOKEN as string;

  // Checks if the api key is not undefined.
  if (!RENTCAST_TOKEN) {
    throw new Error("RentCast API key is missing or undefined");
  }

  // RentCast API
  const rentCast_url = `https://api.rentcast.io/v1/avm/value?address=${encodeURIComponent(
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
    const [rentCastResponse] = await Promise.all([
      fetch(rentCast_url, options),
    ]);

    const rentCastData = await rentCastResponse.json();
    res.json(rentCastData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch home data." });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
