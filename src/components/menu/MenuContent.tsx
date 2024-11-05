// MenuContent.tsx
import React from 'react';
import { Element } from 'react-scroll';

interface PopularItem {
    name: string;
    image: string;
    price: string;
}

interface FoodItem {
    name: string;
    image: string;
    price: string;
}

interface MenuContentProps {
    activeSection: string;
    popular: PopularItem[];
    otherSections: Record<string, FoodItem[]>;
}

export default function MenuContent({ activeSection, popular, otherSections }: MenuContentProps) {
    return (
        <main className="container mx-auto px-4 py-8">
            <Element name="Popular">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Popular</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popular.map((item) => (
                            <div
                                key={item.name}
                                className={`flex items-center space-x-4 p-4 border rounded-lg dark:border-[#947198] dark:bg-transparent border-gray-400 bg-white`}>
                                <div className="relative h-24 w-24 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover rounded-lg h-full w-full"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium text-lg">{item.name}</h3>
                                    <div className="text-[#764ab3] dark:text-[#d3a1d9] font-semibold">
                                        $ {item.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Element>

            {Object.entries(otherSections).map(([sectionName, items]) => (
                <Element key={sectionName} name={sectionName}>
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">{sectionName}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <div
                                    key={item.name}
                                    className={`flex items-center space-x-4 p-4 border rounded-lg dark:border-[#947198] dark:bg-transparent border-gray-400 bg-white`}>
                                    <div className="relative h-24 w-24 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover rounded-lg h-full w-full"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                        <div className="text-[#764ab3] dark:text-[#d3a1d9] font-semibold">
                                            $ {item.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Element>
            ))}
        </main>
    );
}