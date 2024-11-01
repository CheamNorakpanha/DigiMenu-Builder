import { DollarSign, Building2, SquareCheckBig } from "lucide-react";

export default function PricingSection() {
    const background = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/9c/8c/ee/blossom-season.jpg?w=1000&h=-1&s=1';
    const plans = [
        { icon: DollarSign, title: "Free", price: "$0/month", features: ["1 Restaurant", "Basic Customization", "QR Code Generation"], buttonText: "Get Started" },
        { icon: DollarSign, title: "Pro", price: "$29.99/month", features: ["5 Restaurants", "Advanced Customization", "Analytics"], buttonText: "Contact Us" },
        { icon: Building2, title: "Enterprise", price: "Custom/month", features: ["Unlimited Restaurants", "White-label Solution", "Dedicated Support"], buttonText: "Contact Us" }
    ];

    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-200"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-white dark:text-white">
                    Pricing
                </h2>
                <div className="flex justify-center">
                    <span className='border-t-2 border-[#71389d] mb-8'>&emsp;&emsp;&emsp;</span>
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <div key={index} className="backdrop-blur-sm flex flex-col p-6 bg-gray-50 rounded-lg shadow-lg dark:bg-transparent transition-colors duration-200 border border-gray-400 dark:border-[#d3a1d9]">
                            <plan.icon className="w-12 h-12 mb-4 text-[#764ab3] dark:text-[#71389d]" />
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{plan.title}</h3>
                            <p className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{plan.price}</p>
                            <ul className="mb-6 space-y-2 flex-grow">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                                        <SquareCheckBig className="mr-2 h-5 w-5 text-black dark:text-white" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-auto inline-flex items-center justify-center rounded-md bg-[#71389d] dark:bg-[#4f276d] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:hover:bg-[#371b4c] w-full">
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
