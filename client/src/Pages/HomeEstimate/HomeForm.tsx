import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const schema = z.object({
  Address: z.string().min(1, "Enter a property address"),
  PropertyType: z.string(),
  Radius: z.number().min(1),
  Comparables: z.number(),
});

type FormFields = z.infer<typeof schema>;

const HomeForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      Comparables: 5,
    },
    resolver: zodResolver(schema),
  });

  //   Async function to server
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Wrong address yur",
      });
    }
  };

  return (
    <form
      action=""
      className="grid mt-5 gap-2 font-nunito"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Address */}
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

      {/* Property Type */}
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

      {/* Radius */}
      <label htmlFor="Radius" className="grid mx-2">
        Radius:
        <input
          {...register("Radius")}
          type="number"
          id="Radius"
          className="border border-[1px] rounded-md"
        />
      </label>

      {/* Comparable Properties */}
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
    </form>
  );
};

export default HomeForm;
