import { atom } from "jotai";


export const videoAtom = atom([
        {
            src: '/video/video-01.mp4',
            start: '/images/video/video-01-first.jpg',
            end: '/images/video/video-01-end.jpg',
        },
        {
            src: '/video/video-02.mp4',
            start: '/images/video/video-02-first.jpg',
            end: '/images/video/video-02-end.jpg',
        },
        {
            src: '/video/video-03.mp4',
            start: '/images/video/video-03-first.jpg',
            end: '/images/video/video-03-end.jpg',
        },
    ]
)

export const videoIndexAtom = atom(0)

export const videoPlayAtom = atom(true)