import { supabase } from "./supabase";
import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import { error } from "console";
import { mock } from "node:test";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const PORT = 5000;

// RENTCAST API & Supabase
app.post("/homeData", async (req: Request, res: Response) => {
  const { Address, PropertyType, Radius, Comparables } = req.body;

  console.log(req.body);

  const RENTCAST_TOKEN = process.env.RENTCAST_TOKEN as string;

  // Checks if the api key is not undefined.
  if (!RENTCAST_TOKEN) {
    throw new Error("RentCast API key is missing or undefined");
  }

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
    // Checking Supabase db if the total api request is <= 50 & if it's not dont allow anymore request
    const supabaseData = await fetchToSupabase();
    if (supabaseData) {
      const requestCount = supabaseData[0]?.request_count;
      const resetDate = supabaseData[0]?.reset_date;
      const rowId = supabaseData[0]?.id;

      // Check if reset date has passed to update the request count back to 0.
      const currentDate: Date = new Date();
      if (new Date(resetDate) < currentDate) {
        await updateRequestCount(0, rowId);
      } else {
        // Check if request_count from DB has yet to reach the limit of 50.
        if (requestCount && requestCount < 50) {
          // fetch to RentCast API.
          const rentCastResponse = await fetch(rentCast_url, options);
          const rentCastData = await rentCastResponse.json();

          // send data back to users.
          res.json(rentCastData);

          // update the request_count in database
          await updateRequestCount(requestCount + 1, rowId);

          // Send error if request_count has reached its limit of 50.
        } else {
          console.log("Successfully prevented fetching data.");
          console.log("request count:", requestCount);
          res
            .status(500)
            .json({
              message: `API usage amount has reached the monthly limit. Try again after ${new Date(
                resetDate
              ).toLocaleDateString("en-US")}.`,
              requestAmount: (requestCount / 50) * 100
            });
        }
      }
    }
  } catch (error) {
    res.status(500).json("Failed to fetch home data.");
  }
});

interface supabaseDataRow {
  request_count: number;
  reset_date: string;
  id: string;
}

// Fetching to Supabase function
const fetchToSupabase = async (): Promise<supabaseDataRow[] | null> => {
  let { data, error } = (await supabase
    .from("api_limit")
    .select("id, request_count, reset_date")) as {
    data: supabaseDataRow[];
    error: unknown;
  };

  if (error) {
    console.error("Error fetching the data from database", error);
    return null;
  }

  return data;
};

// Updating the request amount in database
const updateRequestCount = async (newRequestCount: number, id: string) => {
  const { error } = (await supabase
    .from("api_limit")
    .update({ request_count: newRequestCount })
    .eq("id", id)
    .select()) as {
    error: unknown;
  };

  if (error) {
    console.error("Failed to update the request count", error);
    return `Failed to update the request count. Error: ${error}`;
  }
};

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
