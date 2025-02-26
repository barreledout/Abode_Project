import { supabase } from "./supabase";
import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";


const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const PORT = 5000;

// Endpoint for home value estimate page.
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
      const requestCount: number = supabaseData[0]?.request_count;
      const resetDate: string = supabaseData[0]?.reset_date;
      const rowId: string = supabaseData[0]?.id;

      const requestLimit: number = 50;

      // Check if reset date has passed to update the request count back to 0 and replace with new reset date.
      const currentDate: Date = new Date();
      const currentYear: number = new Date().getFullYear();

      if (new Date(resetDate) <= currentDate) {
        await updateRequestCount(0, rowId);
        await updateResetDate(currentYear, resetDate, rowId);
      }

      // Check if request_count from DB has yet to reach the limit of 50.
      if (requestCount < requestLimit) {
        // fetch to RentCast API.
        const rentCastResponse = await fetch(rentCast_url, options);
        const rentCastData = await rentCastResponse.json();

        // send data back to users.
        res.json(rentCastData);

        // update the request_count in database
        await updateRequestCount(requestCount + 1, rowId);

        // Send error if request_count has reached its limit of 50.
      } else {
        console.log(
          "check:",
          requestCount < requestLimit,
          requestCount,
          requestLimit
        );
        console.log("Successfully prevented fetching data.");
        res.status(500).json({
          message: `API usage amount has reached the monthly limit. Try again after ${new Date(
            resetDate
          ).toLocaleDateString("en-US")}.`,
          requestAmount: (requestCount / 50) * 100,
        });
      }
    }
  } catch (error) {
    console.error("Error in /homeData:", error);
    res.status(500).json({message: "Failed to fetch home data.", error});
  }
});

// Endpoint for market data page.
// app.post("/marketData"),
//   async (req: Request, res: Response) => {
//     const { zipCode, dataType, historyRange } = req.body;
//     const RENTCAST_TOKEN = process.env.RENTCAST_TOKEN as string;

//     // Checks if the api key is not undefined.
//     if (!RENTCAST_TOKEN) {
//       throw new Error("RentCast API key is missing or undefined");
//     }
//   };

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
    return `Failed to update the request count. Error: ${error}`;
  }
};

// Updating the reset date in database
const updateResetDate = async (
  currentYear: number,
  resetDate: string,
  id: string
) => {
  const newResetDate = checkResetDate(currentYear, resetDate);

  try {
    const { error } = (await supabase
      .from("api_limit")
      .update({ reset_date: newResetDate.toISOString() })
      .eq("id", id)
      .select()) as {
      error: unknown;
    };

    if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

// Checking if we need to update to next reset date if current date <= reset date.
const checkResetDate = (currentYear: number, resetDate: string) => {
  let currentMonth: number = new Date().getMonth();
  let prevMonth: number = currentMonth === 0 ? 11 : currentMonth;

  // gets the last day of the previous month
  let totalDaysInMonth = new Date(currentYear, prevMonth + 1, 0).getDate();

  let futureResetDate = new Date(resetDate);
  futureResetDate.setDate(futureResetDate.getDate() + totalDaysInMonth);

  return futureResetDate;
};

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
