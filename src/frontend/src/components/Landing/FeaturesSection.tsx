import houseBg from "../../assets/landingPage/houseBg.jpg";

export default function FeaturesSection() {
  return (
    <div
      className="w-full h-14 lg:h-24 flex justify-center mt-4 z-10 bg-no-repeat bg-cover overflow-hidden"
      style={{
        backgroundImage: `url(${houseBg})`,
        backgroundPosition: "center calc(100% + 70px)",
        borderRadius: window.innerWidth < 1024 ? "0.25rem" : ".75rem", // Adição de arredondamento direto por aqui porque por tailwind não estava sendo aplicado.
      }} // Definindo o background com style
    >
      <div className="flex-1 flex justify-center items-center">
        <p className="font-bold text-white lg:text-2xl">Agilidade</p>
      </div>

      <div className="flex-1 flex justify-center items-center border-l-2 border-r-2 border-white-900">
        <p className="font-bold text-white lg:text-2xl">Segurança</p>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <p className="font-bold text-white lg:text-2xl">Simplicidade</p>
      </div>
    </div>
  );
}
