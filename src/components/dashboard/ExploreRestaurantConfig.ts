// ExploreRestaurantConfig.ts

type ExploreRestaurant = {
    Eid: string;
    Ename: string;
    Eaddress: string;
    EcoverImage: string;
};

// URLs for restaurant cover images
const image1 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/9f/4a/50/brasserie-dining-room.jpg?w=1000&h=-1&s=1';
const image2 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/ac/d2/f4/namaste-india-bkk-a-touch.jpg?w=1000&h=-1&s=1';
const image3 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/49/e0/0c/restaurant-le-royal-at.jpg?w=900&h=-1&s=1';
const image4 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/bf/3d/d1/lantern-rooftop-bar-live.jpg?w=1000&h=-1&s=1';
const image5 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3a/71/c4/caption.jpg?w=900&h=500&s=1';
const image6 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/e8/4e/ed/view-from-the-stage-area.jpg?w=1000&h=-1&s=1';
const image7 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c6/8f/89/hyatt-regency-the-attic.jpg?w=1000&h=-1&s=1';
const image8 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/38/92/c0/hall-of-golden-chimes.jpg?w=1000&h=-1&s=1';
const image9 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/15/c3/b3/hemisphere-rooftop.jpg?w=1000&h=-1&s=1';

// Mock data for restaurants
export const allRestaurants: ExploreRestaurant[] = [
    { Eid: '1', Ename: "Brasserie Louis", Eaddress: "66 Monivong Boulevard, Phnom Penh 120211 Cambodia", EcoverImage: image1 },
    { Eid: '2', Ename: "Namaste India Restaurant BKK", Eaddress: "#177, Street 63 Corner 294, Phnom Penh 12302 Cambodia", EcoverImage: image2 },
    { Eid: '3', Ename: "Restaurant Le Royal", Eaddress: "92 Rukhak Vithei Daun Penh Sangkat Wat Phnom, Phnom Penh 12202 Cambodia", EcoverImage: image3 },
    { Eid: '4', Ename: "Lantern Rooftop Bar", Eaddress: "Baitong Hotel and Resort, number 10, St. 282 Sangkat Boeng Keng Kang I, Khan Chamkarmon, Phnom Penh 12302 Cambodia", EcoverImage: image4 },
    { Eid: '5', Ename: "Boma - Mediterranean Cuisine", Eaddress: "Rue Pasteur No. 51, Phnom Penh 12302 Cambodia", EcoverImage: image5 },
    { Eid: '6', Ename: "Yiqi", Eaddress: "282 7th Floor #5 St Rise Commercial, BKK1, Phnom Penh 12000 Cambodia", EcoverImage: image6 },
    { Eid: '7', Ename: "The Attic", Eaddress: "#55, Street 178 Sangkat Chey Chumnas, Phnom Penh 12206 Cambodia", EcoverImage: image7 },
    { Eid: '8', Ename: "Hall of Golden Chimes", Eaddress: "Level 5, NagaWorld2 Samdech Hun Sen Park, Phnom Penh 120101 Cambodia", EcoverImage: image8 },
    { Eid: '9', Ename: "Hemisphere Sky Bar", Eaddress: "No 47 Corner St 01 And St 94 Village 9 On Top Of Tribe Hotel, 11th Floor, Phnom Penh 12202 Cambodia", EcoverImage: image9 },
];