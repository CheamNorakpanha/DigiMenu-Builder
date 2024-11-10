import { Link } from 'react-router-dom';

export default function WelcomeSection({ isAuthenticated, handleLogin }: { isAuthenticated: boolean, handleLogin: (provider: string) => void }) {
    const background = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/9c/94/b2/cherry-blossom-season.jpg?w=1000&h=-1&s=1';
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 transition-colors duration-200" 
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <div className="container px-4 md:px-6 mx-auto py-32">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="space-y-2">
                        <h1 className="text-7xl font-bold tracking-tighter text-white dark:text-white pb-10">
                            Welcome to <span className='text-[#3f238e] dark:text-[#d3a1d9] transition-colors'>DigiMenu Builder</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-300 text-xl dark:text-gray-200 pb-4">
                            Create stunning digital menus for your restaurant in minutes. Impress your customers with a modern, interactive dining experience.
                        </p>
                    </div>
                    <div className="space-y-4 w-full max-w-sm">
                        {isAuthenticated ? (
                            <Link to="/restaurant" className="inline-flex w-full items-center justify-center rounded-md bg-[#35246c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#25194b] hover:brightness-90 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <button onClick={() => handleLogin('github')} className="inline-flex w-full items-center justify-center rounded-md bg-[#35246c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#25194b] dark:bg-[#35246c] dark:hover:bg-[#25194b]">
                                    Login with GitHub
                                </button>
                                <button onClick={() => handleLogin('google')} className="inline-flex w-full items-center justify-center rounded-md bg-[#71389d] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:bg-[#71389d] dark:text-white dark:hover:bg-[#4f276d]">
                                    Login with Google
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
