'use client'
import { useEffect, useState } from "react";

export default function SwapSlider() {
    // const slides = [
    //     { id: 1, image: "https://i.pinimg.com/736x/ee/c0/d8/eec0d8d24767c194dae7749470f266be.jpg" },
    //     { id: 2, image: "https://i.pinimg.com/1200x/b5/62/6b/b5626b9b25e5f59949beab342db47c85.jpg" },
    //     { id: 3, image: "https://i.pinimg.com/1200x/0f/46/54/0f4654709f59e52f2ea50a8bd671da07.jpg" },
    //     { id: 4, image: "https://i.pinimg.com/1200x/70/88/8c/70888c96bcf6514b507fe9ea67b0fae2.jpg" },
    //     { id: 5, image: "https://i.pinimg.com/736x/64/78/2b/64782bc68b74c049e92af29d6d5971cd.jpg" },
    // ];
    const slides = [
        { id: 1, image: "https://i.pinimg.com/1200x/45/77/3f/45773fa8dbfd9688caa49910fd7a7c6b.jpg" },
        { id: 2, image: "https://i.pinimg.com/1200x/5d/7d/38/5d7d38d1c18d05f6673e4fae487a4364.jpg" },
        { id: 3, image: "https://i.pinimg.com/1200x/a6/dd/8f/a6dd8fd4beab2d61d254b5804390588d.jpg" },
        { id: 4, image: "https://i.pinimg.com/1200x/7b/a7/fc/7ba7fc076422273eb163d9f178d16a6e.jpg" },
        { id: 5, image: "https://i.pinimg.com/1200x/3f/06/1f/3f061f70a8786b396f7c1655ed35cd31.jpg" },
    ];

    const smallSlides = [
        { id: 1, image: "https://i.pinimg.com/1200x/52/c5/1b/52c51bbe0ea48c66858a00816549edac.jpg" },
        { id: 2, image: "https://i.pinimg.com/736x/d3/67/ee/d367ee52160d23a2c76714a1a5012975.jpg" },
        { id: 3, image: "https://i.pinimg.com/1200x/be/d8/e1/bed8e168cf68f52dd0911b4dbad615de.jpg" },
        { id: 4, image: "https://i.pinimg.com/736x/d9/a2/95/d9a295021963aa78192e5bc2fe9472ce.jpg" },
        { id: 5, image: "https://i.pinimg.com/736x/ac/d2/91/acd291a8f4e069c8303341b15e732b58.jpg" },
    ];

    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);

    const nextSlide = () => {
        setFade(false);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
            setFade(true);
        }, 200);
    };

    const prevSlide = () => {
        setFade(false);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
            setFade(true);
        }, 200);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const [currentRight, setCurrentRight] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRight(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    // for right slider section 

    return (
        <section className="w-full bg-white rounded-[10px] my-4">
            <section className="max-w-[1300px] m-auto p-5 md:py-6 md:px-6 lg:px-9">
                <h3 className="font-bold text-[14px] md:text-md lg:text-lg uppercase mb-4 text-black">
                    top cell phones & tablets
                </h3>

                <div className="flex-col flex lg:flex-row gap-3 lg:gap-x-2">
                    {/* Main Slider - 70% width */}
                    <div className="relative max-h-[310px] rounded-[10px] overflow-hidden w-full lg:basis-7/10">
                        <div
                            className="flex transition-transform duration-500"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {slides.map((slide) => (
                                <div key={slide.id} className="shrink-0 w-full h-full">
                                    <img src={slide.image} alt="Slider" className="w-full h-full object-contain object-center" />
                                </div>
                            ))}
                        </div>

                        {/* Arrows */}
                        <button
                            onClick={prevSlide}
                            className="hover:cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            ‹
                        </button>

                        <button
                            onClick={nextSlide}
                            className="hover:cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            ›
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold">
                            {current + 1} / {slides.length}
                        </div>
                    </div>

                    {/* Right Slider - 30% width */}
                    <div className="relative max-h-[310px] rounded-[10px] overflow-hidden w-full lg:basis-3/10">
                        <div
                            className="flex transition-transform duration-500"
                            style={{ transform: `translateX(-${currentRight * 100}%)` }}
                        >
                            {smallSlides.map((data, index) => (
                                <img
                                    key={index}
                                    src={data.image}
                                    alt={`Small Slide ${index + 1}`}
                                    className="w-full lg:w-fit object-cover h-fit"
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </section>
        </section>
    );
}