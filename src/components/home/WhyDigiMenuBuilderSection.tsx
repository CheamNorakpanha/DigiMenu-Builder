import { Zap, Palette, Smartphone } from "lucide-react";

export default function WhyDigiMenuBuilderSection() {
    const features = [
        { icon: Zap, title: "Easy to Use", description: "Intuitive interface for quick menu creation and updates." },
        { icon: Palette, title: "Customizable Design", description: "Tailor your menu's look to match your brand identity." },
        { icon: Smartphone, title: "Mobile Responsive", description: "Your menu looks great on any device, from phones to tablets." }
    ];

    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-200">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-gray-900 dark:text-white">
                    Why DigiMenu Builder?
                </h2>
                <div className="flex justify-center">
                    <span className='border-t-2 border-[#71389d] mb-8'>&emsp;&emsp;&emsp;</span>
                </div>
                <p className="text-center mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Build your restaurant's menu with ease. Our website has several awesome features that make it perfect to take your restaurant's menu to the next level.
                </p>
                <div className="grid gap-8 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md dark:bg-transparent transition-colors duration-200 border border-gray-400 dark:border-[#d3a1d9]">
                            <feature.icon className="w-12 h-12 mb-4 text-[#764ab3] dark:text-[#71389d]" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
