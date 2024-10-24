import houseBg from "../../assets/landingPage/houseBg.jpg";

export default function FeaturesSection() {
  return (
    <div
          className="w-full h-14 flex justify-center mt-4 z-10  bg-no-repeat bg-cover rounded-md"
          style={{
            backgroundImage: `url(${houseBg})`,
            backgroundPosition: "center calc(100% + 40px)",
          }} // Definindo o background com style
        >
          <div className="flex-1 flex justify-center items-center">
            <p className="font-bold text-white">Agilidade</p>
          </div>

          <div className="flex-1 flex justify-center items-center border-l-2 border-r-2 border-white-900">
            <p className="font-bold text-white">Segurança</p>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <p className="font-bold text-white">Simplicidade</p>
          </div>
        </div>
  );
}
