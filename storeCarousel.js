import { atom } from "jotai";

export const carouselAtom = atom(0)
export const pictureAtom = atom({
    pictures : [
        {
            title: 'Grand Walkway',
            credit: 'https://unsplash.com/photos/nKuxm4Tk-j0?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
            src: '/images/carousel/Grand Walkway.jpg'
        },
        {
            title: 'Adobe Home',
            credit: 'https://unsplash.com/photos/4ojhpgKpS68?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
            src: '/images/carousel/Adobe Home.jpg'
        },
        {
            title: 'Mix Wood Brick Home',
            credit: 'https://unsplash.com/photos/KqOLr8OiQLU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
            src: '/images/carousel/Mix Wood Brick Home.jpg'
        },
        {
            title: 'Apartment',
            credit: 'https://unsplash.com/photos/KqOLr8OiQLU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
            src: '/images/carousel/Apartment.jpg'
        },
        {
            title: 'Tube',
            credit: 'https://unsplash.com/photos/BIU3G8dPIRQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
            src: '/images/carousel/Tube.jpg'
        },
        {
            title: 'Red Tower',
            credit: 'https://unsplash.com/photos/bh2BuKhQelU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
            src: '/images/carousel/Red Tower.jpg'
        },
    ]
})