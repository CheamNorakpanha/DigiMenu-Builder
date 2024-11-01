import { Building2, PenSquare, Zap, Share2 } from "lucide-react";

export default function HowItWorksSection() {
    const steps = [
        { icon: Building2, title: "Step 1: Create Restaurant", description: "Create your own restaurant with basic details." },
        { icon: PenSquare, title: "Step 2: Add Content", description: "Add menu-related content to your restaurant." },
        { icon: Zap, title: "Step 3: Publish Restaurant", description: "Publish your restaurant to make it accessible to anyone." },
        { icon: Share2, title: "Step 4: Share", description: "Share the generated QR code or menu URL with the world." }
    ];

    return (
        <section id='how-it-works' className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black transition-colors duration-200">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-gray-900 dark:text-white">
                    How It Works
                </h2>
                <div className="flex justify-center">
                    <span className='border-t-2 border-[#71389d] mb-8'>&emsp;&emsp;&emsp;</span>
                </div>
                <div className="grid gap-6 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg dark:bg-transparent transition-colors duration-200 border border-gray-400 dark:border-[#d3a1d9]">
                            <step.icon className="w-12 h-12 mb-4 text-[#764ab3] dark:text-[#71389d]" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
