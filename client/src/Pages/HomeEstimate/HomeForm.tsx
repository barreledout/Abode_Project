"use client";
import schema from "./FormSchema";
import { ApiResponse } from "./HomeTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import Comparables from "./Comparables";

type FormFields = z.infer<typeof schema>;

const HomeForm = () => {
  const [isSubmitted, setIsSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const childRef = useRef<HTMLElement>(null);

  // Scrolls screen down to comparables once the data is received from API.
  useEffect(() => {
    if (data && childRef.current) {
      childRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data]);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      Address: "",
      PropertyType: "Single Family",
      Radius: 1,
      Comparables: 15,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/homeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Data not received");
      }
      const result: ApiResponse = await response.json();
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
          action="/api/homeData"
          className="grid mt-5 gap-2 font-geistSans lg:grid-cols-2 lg:px-6 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Address */}
          <FormField
            control={form.control}
            name="Address"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base lg:text-2xl">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="5500 Grand Lake Drive, San Antonio, TX, 78244"
                    className="bg-white lg:text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="lg:text-base">
                  Street, City, State, Zip or latitude/longitude
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Property Type */}
          <FormField
            control={form.control}
            name="PropertyType"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base lg:text-2xl">
                  Property Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-white lg:text-base">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white ">
                    <SelectItem value="Select A Property" disabled>
                      Select A Property
                    </SelectItem>
                    <SelectItem value="Single Family">Single Family</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                    <SelectItem value="Manufactured">Manufactured</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Radius */}
          <FormField
            control={form.control}
            name="Radius"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base lg:text-2xl">
                  Radius (miles)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="1"
                    className="bg-white lg:text-base"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription className="lg:text-base">
                  Distance between comparable listings and the subject property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comparable */}
          <FormField
            control={form.control}
            name="Comparables"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base lg:text-2xl">
                  Amount of Comparable Listings
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="5"
                    className="bg-white lg:text-base"
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription className="lg:text-base">
                  The number of homes that will be used in the price evaluation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="items-center mt-5 flex lg:relative lg:left-1/2 ">
            <Button
              type="submit"
              className="bg-blue-300/30 hover:bg-blue-300/30 py-1 px-4 rounded-md max-w-[170px] mx-auto shadow-md font-[500] text-black lg:min-w-[300px] lg:text-lg"
              disabled={isSubmitted}
            >
              Get Home Value
            </Button>
          </div>
        </form>
      </Form>
      {data && <Comparables data={data} ref={childRef} />}
    </>
  );
};

export default HomeForm;
