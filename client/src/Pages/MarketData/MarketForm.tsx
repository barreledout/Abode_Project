"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./MarketSchema";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState, useRef, useEffect } from "react";
import ErrorScreen from "../../ErrorScreen";
import { SubmitHandler, useForm } from "react-hook-form";
import { Market } from "./MarketType";
import MarketResults from "./MarketResults";

type FormFields = z.infer<typeof schema>;

interface ErrorDataProp {
  message: string;
  requestAmount: number;
}

const MarketForm = () => {
  const [isSubmitted, setIsSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<Market | null>(null);
  const childRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [requestAmount, setRequestAmount] = useState<number>(0);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      zipCode: "",
      dataType: "All",
      historyRange: 12,
    },
  });

  // Scrolls screen down to comparables or error screen once the data is received from API.
  useEffect(() => {
    if (data || (status >= 400 && childRef.current)) {
      childRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data, status]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/marketData", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const { message, requestAmount }: ErrorDataProp = errorData;
        setErrorMessage(message);
        setRequestAmount(requestAmount);
        setStatus(response.status);
        return;
      }

      const result: Market = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="grid mt-5 gap-2 font-geistSans text-left md:max-w-[800px] mq400w:justify-center mq400w:mx-auto lg:px-6 lg:min-w-[900px] "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* zip code */}
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base lg:text-2xl">
                  Zip Code
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="29611"
                    className="bg-white lg:text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="">
                  A valid 5-digit US zip code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Market data */}
          <FormField
            control={form.control}
            name="dataType"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base lg:text-2xl">
                  Market Data
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-white lg:text-base">
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white ">
                    <SelectItem value="Select A Property" disabled>
                      Select Data
                    </SelectItem>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Sale">Sale</SelectItem>
                    <SelectItem value="Rental">Rental</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="">
                  The type of aggregate market data to retrieve.
                </FormDescription>
              </FormItem>
            )}
          />
          {/* History range */}
          <FormField
            control={form.control}
            name="historyRange"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base lg:text-2xl">
                  History Range
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    className="bg-white lg:text-base"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormDescription className="">
                  The time range for historical record entries, <b>in months</b>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="items-center mt-5 flex">
            <Button
              type="submit"
              className="bg-blue-300/30 hover:bg-blue-300/30 py-1 px-4 rounded-md max-w-[170px] mx-auto shadow-md font-[500] text-black lg:min-w-[300px] lg:text-lg"
              disabled={isSubmitted || errorMessage !== null}
            >
              Get Home Value
            </Button>
          </div>
        </form>
      </Form>
      {status >= 400 ? (
        <ErrorScreen
          statusCode={status}
          ref={childRef}
          errorMessage={errorMessage}
          progressBar={requestAmount}
        />
      ) : (
        data && <MarketResults data={data} ref={childRef} />
      )}
    </>
  );
};

export default MarketForm;
