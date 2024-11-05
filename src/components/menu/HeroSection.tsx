import { MapPin } from 'lucide-react'

export default function HeroSection() {
    const menuBackground = 'https://img.freepik.com/free-photo/street-food-still-life_23-2151535299.jpg?t=st=1730601966~exp=1730605566~hmac=fc0f6c9f9e53b3e36b1f93e7c577fc1117b0620fa16d8dcf23f87723ca4840be&w=1380';

    return (
        <div
            className="relative flex justify-center items-center h-[500px] mx-4 sm:mx-8 md:mx-16 lg:mx-36 xl:mx-48 rounded-lg my-4"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${menuBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h1 className="text-4xl font-bold text-white mb-2">New York Beef Burger (Tonle Basak)</h1>
                <div className="flex items-center text-white">
                    <MapPin className="h-5 w-5 mr-2" />
                    <p>St. 308, Sangkat Tonle Bassac, Khan Chamkar Mon, Phnom Penh</p>
                </div>
            </div>
        </div>
    );
}
