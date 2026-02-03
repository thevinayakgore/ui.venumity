export default function BentoGrid() {
  const cards = [
    {
      id: "01",
      col: "col-span-12 sm:col-span-6 md:col-span-5",
      row: "row-span-6",
    },
    {
      id: "02",
      col: "col-span-12 sm:col-span-6 md:col-span-7",
      row: "row-span-3",
    },
    {
      id: "03",
      col: "col-span-6 sm:col-span-4 md:col-span-3",
      row: "row-span-3",
    },
    {
      id: "04",
      col: "col-span-6 sm:col-span-8 md:col-span-4",
      row: "row-span-6",
    },
    {
      id: "05",
      col: "col-span-12 sm:col-span-12 md:col-span-8",
      row: "row-span-6",
    },
    {
      id: "06",
      col: "col-span-6 sm:col-span-4 md:col-span-4",
      row: "row-span-3",
    },
    {
      id: "07",
      col: "col-span-6 sm:col-span-4 md:col-span-3",
      row: "row-span-6",
    },
    {
      id: "08",
      col: "col-span-6 sm:col-span-4 md:col-span-3",
      row: "row-span-3",
    },
    {
      id: "09",
      col: "col-span-6 sm:col-span-4 md:col-span-3",
      row: "row-span-6",
    },
    {
      id: "10",
      col: "col-span-6 sm:col-span-4 md:col-span-3",
      row: "row-span-9",
    },
    {
      id: "11",
      col: "col-span-6 sm:col-span-4 md:col-span-3",
      row: "row-span-3",
    },
    {
      id: "12",
      col: "col-span-6 sm:col-span-8 md:col-span-4",
      row: "row-span-3",
    },
    {
      id: "13",
      col: "col-span-6 sm:col-span-12 md:col-span-5",
      row: "row-span-3",
    },
  ];

  return (
    <>
      <main className="relative px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <h1 className="absolute -top-12 sm:-top-16 md:-top-20 left-1/2 -translate-x-1/2 text-center text-4xl sm:text-6xl md:text-8xl lg:text-[15rem] xl:text-[20rem] uppercase tracking-wide whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-linear-to-b from-foreground/15 via-foreground/5 leading-none">
          Gallery
        </h1>
        <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-30 grid grid-cols-12 grid-rows-12 gap-3 sm:gap-4 w-full auto-rows-fr">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${card.col} ${card.row} relative rounded-lg sm:rounded-xl overflow-hidden min-h-40 sm:min-h-50 md:min-h-60 bg-zinc-500/10 backdrop-blur-sm`}
            >
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 font-medium text-sm sm:text-base font-mono">
                {card.id}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
