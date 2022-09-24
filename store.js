import {atom} from 'jotai'

export const locationsAtom = atom({
    locations:[
        {
            title: 'Kyiv',
            coords:{
                lat: 50.4501,
                lng: 30.5234
            },
            texture: '/textures/locations/9dbceec6-e43d-40ed-a542-9e33782f3220_mucem.jpg'
        },
        {
            title: 'Cancun',
            coords:{
                lat: 21.1619,
                lng: -86.8515
            },
            texture: '/textures/locations/9dbceec6-e43d-40ed-a542-9e33782f3220_mucem.jpg'
        },
        {
            title: 'Paris',
            coords:{
                lat: 48.8566,
                lng: 2.3522
            },
            texture: '/textures/locations/eiffel tower grass.jpg'
        },
        {
            title: 'New-York',
            coords:{
                lat: 40.7831,
                lng: -73.9712
            },
            texture: '/textures/locations/NYC.jpg'
        },
        {
            title: 'Hawaii',
            coords:{
                lat: 19.8968,
                lng: -155.5828
            },
            texture: '/textures/locations/9dbceec6-e43d-40ed-a542-9e33782f3220_mucem.jpg'
        },
        {
            title: 'Hong Kong',
            coords:{
                lat: 22.3193,
                lng: 114.1694
            },
            texture: '/textures/locations/Helsingborg.jpg'
        },
        {
            title: 'St. Peter\'s Basilica',
            coords:{
                lat: 41.9022,
                lng: 12.4539
            },
            texture: '/textures/locations/St. Peter\'s Basilica.jpg'
        },
    ],
    selected: '/textures/locations/9dbceec6-e43d-40ed-a542-9e33782f3220_mucem.jpg'
    
})