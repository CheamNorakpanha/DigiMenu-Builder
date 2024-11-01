export default function SeeItInActionSection() {
    const background = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/9c/94/a0/cherry-blossom-season.jpg?w=1000&h=-1&s=1';

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 transition-colors duration-200"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white dark:text-white">
                    See It in Action
                </h2>
                <div className="flex flex-col items-center space-y-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR Code" width={200} height={200} className="rounded-lg shadow-md bg-white dark:bg-white" />
                    <p className="text-gray-300 dark:text-gray-300">Scan the QR code or click the button below to view a sample menu</p>
                    <button
                        className="inline-flex items-center justify-center rounded-md bg-[#71389d] dark:bg-[#d3a1d9] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:hover:bg-[#947198]"
                        onClick={() => window.open("https://menufic.com/restaurant/clel0b9zg0000mh08m5keb7h0/menu", "_blank")}
                    >
                        View Sample Menu
                    </button>
                </div>
            </div>
        </section>
    );
}
