import HomeForm from "./HomeForm"

const HomeEstimate = () => {
  return (
    <section className="bg-gray-300/45 py-3">
      <div className=" text-center">
        <h1 className="font-nunito font-[600] text-lg md:text-lg lg:text-2xl">Home Value Estimator</h1>
      </div>
      <HomeForm />
    </section>
  );
};

export default HomeEstimate;
