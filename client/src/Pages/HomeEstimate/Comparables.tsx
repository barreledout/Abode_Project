import { ApiResponse } from "./HomeTypes";

type ComparableProps = {
  data: ApiResponse;
};

const Comparables = ({ data }: ComparableProps) => {
  return (
    <section>
      <div>
        <div className="text-center font-nunito my-16">
          <h1 className="text-2xl font-[600]">Home Estimate:</h1>
          <div>
            <h2 className="pt-2 text-2xl text-blue-600 font-[600]">
              {data.price
                ? `$${data.price.toLocaleString()}`
                : `Price Not Available`}
            </h2>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-[600] font-nunito text-center">
            Comparable Properties
          </h1>
          <div className="">
            <ul className="flex flex-col gap-2 mx-2 pt-2  md:grid md:grid-cols-4">
              {data.comparables.map((comparable) => (
                <li
                  key={comparable.id}
                  className="bg-slate-300 p-2 rounded-sm text-center font-nunito"
                >
                  <p>
                    <span className="font-[700]">Address:</span>{" "}
                    {comparable.formattedAddress}
                  </p>
                  <p>
                    <span className="font-[700]">Price:</span>{" "}
                    {`$${comparable.price.toLocaleString()}`}
                  </p>
                  <p>
                    <span className="font-[700]">Property Type:</span>{" "}
                    {comparable.propertyType}
                  </p>
                  <p>
                    <span className="font-[700]">Bedrooms:</span>{" "}
                    {comparable.bedrooms}
                  </p>
                  <p>
                    <span className="font-[700]">Bathrooms:</span>{" "}
                    {comparable.bathrooms}
                  </p>
                  <p>
                    <span className="font-[700]">Square Footage:</span>{" "}
                    {comparable.squareFootage}
                  </p>
                  <p>
                    <span className="font-[700]">Correlation:</span>{" "}
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
