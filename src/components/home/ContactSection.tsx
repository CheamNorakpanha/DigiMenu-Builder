import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
    return (
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black transition-colors duration-200">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-gray-900 dark:text-white">
                    Get in Touch
                </h2>
                <div className="flex justify-center">
                    <span className="border-t-2 border-[#71389d] mb-8">&emsp;&emsp;&emsp;</span>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-zinc-900 dark:border-[#d3a1d9] dark:text-white"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-zinc-900 dark:border-[#d3a1d9] dark:text-white"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-zinc-900 dark:border-[#d3a1d9] dark:text-white"
                                    placeholder="Your message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md bg-[#71389d] dark:bg-[#d3a1d9] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:hover:bg-[#947198] w-full"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div className="space-y-4 pt-5">
                        <ContactInfo icon={Mail} text="contact@digimenubuilder.com" />
                        <ContactInfo icon={Phone} text="+1 (555) 123-4567" />
                        <ContactInfo icon={MapPin} text="123 Menu Street, Foodville, FL 12345" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Helper component for contact information items
function ContactInfo({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="w-6 h-6 text-[#71389d] dark:text-[#d3a1d9]" />
            <span className="text-gray-600 dark:text-gray-300">{text}</span>
        </div>
    );
}
