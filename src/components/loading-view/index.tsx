import Image from "next/image";

const LoadingView = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-6 h-screen">
      <Image
        src="/dimaior/dimaior-head.svg"
        width={100}
        height={100}
        alt="Loading..."
      />
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-[32px] font-medium max-sm:text-center">
          Seu currículo tá quase pronto!
        </h1>
        <p className="text-base font-light text-[#8C8C8C] max-sm:text-center">
          Aproveita pra dar uma pausa... 🧘
        </p>
      </div>
    </div>
  );
};

export { LoadingView };
