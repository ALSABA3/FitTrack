import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";
import instagram from "@/assets/instagram.png";
import facebook from "@/assets/facebook.png";
import linkedin from "@/assets/linkedin.png";
import data from "@/dummyReviews.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GetApp = () => {
  return (
    <section className="mt-8 container" id="GetTheApp">
      <div className="mx-auto grid grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="leading-10 text-4xl tracking-tighter font-mine mb-4 text-stone-950">
            Get The App Now
          </h2>
          <p className="text-lg leading-7 mb-4">
            Transform your fitness journey with our cutting-edge app designed to
            elevate your workouts and inspire lasting results. Whether you're a
            beginner or a seasoned athlete, our personalized approach adapts to
            your unique goals and fitness level, offering tailored workout
            plans, expert guidance, and motivating challenges.
          </p>
          <div className="flex items-center">
            <a
              href="#"
              className="w-auto px-4 py-3 bg-slate-800  text-slate-100 rounded-lg inline-flex content-center items-center"
            >
              <svg
                className="w-7 h-7 mr-3"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
              <div className="text-left">
                <div className="text-xs mb-1 leading-4">Download it on</div>
                <div className="text-sm font-semibold leading-5 -mt-1">
                  App Store
                </div>
              </div>
            </a>
            <a
              href="#"
              className="w-auto px-4 py-3 bg-slate-800  text-slate-100 rounded-lg inline-flex content-center items-center ml-4"
            >
              <svg
                className="w-7 h-7 mr-3"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google-play"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                ></path>
              </svg>
              <div className="text-left">
                <div className="text-xs mb-1 leading-4">Download it on</div>
                <div className="text-sm font-semibold leading-5 -mt-1">
                  Google Play
                </div>
              </div>
            </a>
          </div>
        </div>
        <img
          className="w-64 mx-auto"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/iphone-mockup.png"
          alt="mobile app"
        />
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="flex flex-col mt-20" id="HowItWorks">
      <div className="m-[4rem_auto] flex flex-col w-full max-w-screen-md items-center">
        <h2 className="text-5xl font-semibold mb-24">How it works</h2>
        <div
          className="grid grid-rows-[repeat(auto-fit,minmax(10px,_max-content))]"
          style={{ height: "1520px" }}
        >
          <div className="flex items-center mb-0 ">
            <span
              style={{
                display: "inlineBlock",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: "1",
                border: "0",
                margin: "0",
                padding: "0",
                position: "relative",
                maxWidth: "100%",
              }}
            >
              <img src={img1} className="w-[450px] rounded-lg" />
            </span>
            <div className="flex flex-col mb-16 ml-11 text-left items-start max-w-80 px-1">
              <h2 className="font-mine text-6xl text-primary font-normal">1</h2>
              <p className="font-mine text-3xl leading-10 font-normal">
                Presonalize
              </p>
              <p className="text-base mt-4 leading-7">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
                rerum tempora esse culpa, aliquam at nihil, assumenda eaque sit
                delectus ipsum minima quasi doloremque iusto? Quos nam ipsam
                minus odio.
              </p>
            </div>
          </div>

          <div className="flex items-center mb-0 flex-row-reverse">
            <span
              style={{
                display: "inlineBlock",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: "1",
                border: "0",
                margin: "0",
                padding: "0",
                position: "relative",
                maxWidth: "100%",
              }}
            >
              <img src={img2} className="w-[450px] rounded-lg" />
            </span>
            <div className="flex flex-col mb-16 ml-11 text-left items-start max-w-80 px-1">
              <h2 className="font-mine text-6xl text-primary font-normal">2</h2>
              <p className="font-mine text-3xl leading-10 font-normal">
                Work out
              </p>
              <p className="text-base mt-4 leading-7">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
                rerum tempora esse culpa, aliquam at nihil, assumenda eaque sit
                delectus ipsum minima quasi doloremque iusto? Quos nam ipsam
                minus odio.
              </p>
            </div>
          </div>

          <div className="flex items-center mb-0 ">
            <span
              style={{
                display: "inlineBlock",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: "1",
                border: "0",
                margin: "0",
                padding: "0",
                position: "relative",
                maxWidth: "100%",
              }}
            >
              <img src={img3} className="w-[450px]  rounded-lg" />
            </span>
            <div className="flex flex-col mb-16 ml-11 text-left items-start max-w-80 px-1">
              <h2 className="font-mine text-6xl text-primary font-normal">3</h2>
              <p className="font-mine text-3xl leading-10 font-normal">
                Track Your Goal
              </p>
              <p className="text-base mt-4 leading-7">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
                rerum tempora esse culpa, aliquam at nihil, assumenda eaque sit
                delectus ipsum minima quasi doloremque iusto? Quos nam ipsam
                minus odio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Review = () => {
  return (
    <section
      className="flex flex-col py-20 bg-primary items-center content-center mt-6"
      id="Reviews"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="14rem"
        height="100%"
        viewBox="0 0 881 130"
        version="1.1"
        xmlSpace="preserve"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
        }}
      >
        <g transform="matrix(1,0,0,1,-634.728,-382.568)">
          <path
            d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
            style={{ fill: "rgb(255,255,255)" }}
          />
        </g>
        <g transform="matrix(1,0,0,1,-447.914,-382.568)">
          <path
            d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
            style={{ fill: "rgb(255,255,255)" }}
          />
        </g>
        <g transform="matrix(1,0,0,1,-261.961,-382.568)">
          <path
            d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
            style={{ fill: "rgb(255,255,255)" }}
          />
        </g>
        <g transform="matrix(1,0,0,1,-76.0238,-382.568)">
          <path
            d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
            style={{ fill: "rgb(255,255,255)" }}
          />
        </g>
        <g transform="matrix(1,0,0,1,109.853,-382.568)">
          <path
            d="M702.68,382.568L718.721,431.938L770.632,431.938L728.635,462.45L744.677,511.82L702.68,481.308L660.683,511.82L676.724,462.45L634.728,431.938L686.639,431.938L702.68,382.568Z"
            style={{ fill: "rgb(255,255,255)" }}
          />
        </g>
      </svg>
      <h2 className="font-mine mt-8 text-5xl text-white">5-Star Reviews</h2>
      <Carousel
        className="w-full max-w-xl"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="mt-8">
          {data.map((rev) => (
            <CarouselItem key={rev.id}>
              <div className="flex flex-col items-center content-center">
                <p className="text-base text-center mb-2 text-white">
                  {rev.message}
                </p>
                <p className="text-lg font-bold text-white">{rev.auther}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <HowItWorks />
      <Review />
      <GetApp />
      <footer className="mt-8">
        <section className="flex flex-col py-20 bg-primary items-center content-center mt-6">
          <p className="text-white">
            ©2024 MyFitnessPal, Inc. Community Guidelines Feedback Terms Privacy
            API Ad Choices Do Not Sell My Personal Information
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://www.instagram.com">
              <img src={instagram} style={{ filter: "invert()" }} />
            </a>
            <a href="https://www.facebook.com">
              <img src={facebook} style={{ filter: "invert()" }} />
            </a>
            <a href="https://www.linkedin.com">
              <img src={linkedin} style={{ filter: "invert()" }} />
            </a>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Home;
