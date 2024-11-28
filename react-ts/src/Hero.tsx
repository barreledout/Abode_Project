import { useInView } from "react-intersection-observer";

const HeroImg = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div
      className="w-full h-full relative"
      style={{ boxShadow: "2.2px 4.3px 4.3px hsl(0deg 0% 0% / 0.4)" }}
      ref={ref}
    >
      <img
        src="/heroHome1.jpg"
        alt="Home page daytime home."
        className="min-w-[200px] w-full max-h-[400px] object-cover brightness-75 "
      />

      <div className="max-w-[400px] font-jost font-[700] text-[1.1rem] text-pretty text-sm leading-normal mq400w:text-nowrap mq400w:text-[1.2em] mq500w:text-[1.3em] sm:text-[1.5em] sm:leading-9 md:leading-10 md:text-[2em] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2  text-white">
        <h2 className="text-center contrast-100">
          Property value insight, <br className=" sm:block"/> Investment
          success.
        </h2>
      </div>
    </div>
  );
};

export default HeroImg;
