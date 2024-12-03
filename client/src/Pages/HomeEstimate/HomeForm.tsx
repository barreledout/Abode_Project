"use client";
import schema from "./FormSchema";
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
import { useState } from "react";
import Comparables from "./Comparables";

type FormFields = z.infer<typeof schema>;

const HomeForm = ({
  onEstimateSubmit,
}: {
  onEstimateSubmit: (formData: FormData) => void;
}) => {
  const [isSubmitted, setIsSubmitting] = useState<boolean>(false);
  const [data, setData] = useState(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      Address: "",
      PropertyType: "Single Family",
      Radius: 1,
      Comparables: 15,
    },
  });
  //TODO: submit to server
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/homeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Data not received");
      }
      const result = await response.json();
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
          className="grid mt-5 gap-2 font-nunito"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Address */}
          <FormField
            control={form.control}
            name="Address"
            render={({ field }) => (
              <FormItem className="mx-2">
                <FormLabel className="text-base">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="5500 Grand Lake Drive, San Antonio, TX, 78244"
                    className="bg-white"
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
                <FormLabel className="text-base">Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
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
                <FormLabel className="text-base">Radius (miles)</FormLabel>
                <FormControl>
                  <Input placeholder="1" className="bg-white" {...field} />
                </FormControl>
                <FormDescription>
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
                <FormLabel className="text-base">
                  Amount of Comparable Listings
                </FormLabel>
                <FormControl>
                  <Input placeholder="5" className="bg-white" {...field} />
                </FormControl>
                <FormDescription>
                  The number of homes that will be used in the price evaluation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-300/30 mt-2 py-1 px-4 rounded-md max-w-[170px] mx-auto shadow-md font-[500] text-black"
            disabled={isSubmitted}
          >
            Get Home Value
          </Button>
        </form>
      </Form>
      {data && <Comparables data={data} />}
    </>
  );
};

export default HomeForm;

{
  /* <form
      action=""
      className="grid mt-5 gap-2 font-nunito"
      onSubmit={handleSubmit(onSubmit)}
    >
      
      <label htmlFor="Address" className="grid mx-2">
        Property Address:
        <input
          {...register("Address", {
            required: "Property Address is required.",
          })}
          type="text"
          id="Address"
          className="border border-[1px] rounded-md "
        />
        {errors.Address && (
          <span className="text-red-400 font-jost">
            {errors.Address.message}
          </span>
        )}
      </label>

      
      <label htmlFor="PropertyType" className="grid mx-2">
        Property Type:
        <select
          id=""
          className="border border-[1px] rounded-md"
          {...register("PropertyType")}
        >
          <option value="Select Property Type" disabled>
            Select Property Type
          </option>
        </select>
      </label>

      
      <label htmlFor="Radius" className="grid mx-2">
        Radius:
        <input
          {...register("Radius")}
          type="number"
          id="Radius"
          className="border border-[1px] rounded-md"
        />
      </label>

      
      <label htmlFor="Comparable" className="grid mx-2">
        Amount of Comparable Properties:
        <input
          {...register("Comparables")}
          type="number"
          id="Comparable"
          className="border border-[1px] rounded-md"
        />
      </label>
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-300/30 mt-2 py-1 px-4 rounded-md max-w-[170px] mx-auto shadow-sm font-[500]"
      >
        {isSubmitting ? "Getting Shitted" : "Get Home Value"}
      </button>
      {errors.root && (
        <span className="text-red-400 font-jost">{errors.root.message}</span>
      )}
    </form> */
}
