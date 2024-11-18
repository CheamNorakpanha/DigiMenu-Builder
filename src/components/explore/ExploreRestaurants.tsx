function ExploreRestaurants({ allRestaurants }) {
    return (
        <div className="mb-20">
            <h1 className="text-3xl font-bold mb-4">Explore Restaurants</h1>
            <p className="text-gray-600 dark:text-[#947198] mb-8">
                Following are the restaurants published by all users.
            </p>
            <div className="transition-colors grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allRestaurants.map((restaurant) => (
                    <div key={restaurant.Eid} className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-500 dark:border-[#947198]">
                        <img
                            src={restaurant.EcoverImage}
                            alt={`${restaurant.Ename} cover`}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{restaurant.Ename}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{restaurant.Eaddress}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExploreRestaurants;