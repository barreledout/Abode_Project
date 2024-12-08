import { ApiResponse} from "./HomeTypes";

type ComparableProps = {
  data: ApiResponse;
};


const Comparables = ({ data }: ComparableProps) => {

  return (
    <section>
      <div>
        <div className="text-center font-nunito my-16">
          <h1 className="text-2xl font-[600] md:text-4xl ">Home Estimate:</h1>
          <div>
            <h2 className="pt-2 text-2xl text-blue-600 font-[600] md:text-4xl">
              {data.price
                ? `$${data.price.toLocaleString()}`
                : `Price Not Available`}
            </h2>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-[600] pb-3 text-center font-jost md:text-3xl">
            Comparable Properties
          </h1>
          <div className="">
            <ul className="flex flex-col gap-2 mx-2 pt-2 md:grid md:grid-cols-3 md:px-3">
              {data.comparables.map((comparable) => (
                <li
                  key={comparable.id}
                  className="bg-slate-300 p-2 rounded-sm  font-nunito"
                >
                  <p className="">
                    <span className="font-[500] lg:text-lg ">Address:</span>{" "}
                    {comparable.formattedAddress}
                  </p>
                  <p className="">
                    <span className="font-[500] lg:text-lg ">Price:</span>{" "}
                    {`$${comparable.price.toLocaleString()}`}
                  </p>
                  <p className="hidden md:block">
                    <span className="font-[500] lg:text-lg ">Property Type:</span>{" "}
                    {comparable.propertyType}
                  </p>
                  <p className="hidden md:block">
                    <span className="font-[500] lg:text-lg ">Bedrooms:</span>{" "}
                    {comparable.bedrooms}
                  </p>
                  <p className="hidden md:block">
                    <span className="font-[500] lg:text-lg ">Bathrooms:</span>{" "}
                    {comparable.bathrooms}
                  </p>
                  <p className="hidden md:block">
                    <span className="font-[500] lg:text-lg ">Square Footage:</span>{" "}
                    {comparable.squareFootage}
                  </p>
                  <p className="">
                    <span className="font-[500] lg:text-lg ">Correlation:</span>{" "}
                    {comparable.correlation}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparables;
