import { useInView } from "react-intersection-observer";

const HeroImg = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div className="w-full h-full relative shadow-lg" ref={ref}>
      <img
        src="/heroHome1.jpg"
        alt="Home page daytime home."
        className="min-w-[200px] w-full max-h-[400px] object-cover brightness-75 "
      />

      <div className="max-w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <h2 className=" text-white text-center contrast-100 font-jost font-[700] text-[1.1rem] text-pretty text-sm leading-normal mq400w:text-nowrap mq400w:text-[1.2em] mq500w:text-[1.3em] sm:text-[1.5em] sm:leading-9 md:leading-10 md:text-4xl  2xl:text-5xl">
          Property value insight, <br className=" sm:block" /> Investment
          success.
        </h2>
      </div>
    </div>
  );
};

export default HeroImg;
