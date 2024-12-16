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
import { useForm } from "react-hook-form";

type FormFields = z.infer<typeof schema>;

interface ErrorDataProp {
  message: string;
  requestAmount: number;
}

const MarketForm = () => {
  const [isSubmitted, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      zipCode: "",
      dataType: "All",
      historyRange: 12,
    },
  });

  const onSubmit = async () => {};

  return (
    <>
      <Form {...form}>
        <form
          className="grid mt-5 gap-2 font-geistSans text-left md:max-w-[600px] mq400w:justify-center mq400w:mx-auto lg:grid-cols-2 lg:px-6 lg:min-w-[900px] "
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
                <FormDescription className="lg:text-base">
                  A valid 5-digit US zip code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default MarketForm;
