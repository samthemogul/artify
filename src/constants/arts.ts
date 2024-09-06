import art1 from '../assets/art-1.jpg'  
import art2 from '../assets/art-2.jpg'


export interface Comment {
    id: number;
    userId: string;
    comment: string;
    replies: string[];
}

export interface Art {
    id: number;
    name: string;
    description: string;
    artist: string;
    numberOfLikes: number;
    image: string;
    comments: Comment[];
}
const arts: Art[] = [
    {
        id: 1,
        name: 'The Starry Night',
        description: 'A painting of a starry night sky. A painting of a starry night sky. A painting of a starry night sky. A painting of a starry night sky.  A painting of a starry night sky. A painting of a starry night sky. A painting of a starry night sky.',
        artist: 'Vincent van Gogh',
        numberOfLikes: 5,
        image: art1,
        comments: [{ id: 1, comment: "This is a nice Art", replies: [], userId: "aedh"}],
    },
    {
        id: 2,
        name: 'The Monalisa',
        description: 'A painting of a lady smiling',
        artist: 'Edvard Munch',
        numberOfLikes: 10,
        image: art2,
        comments: [{ id: 1, comment: "This is a nice Art", replies: [], userId: "aedh"}],
    },
    {
        id: 3,
        name: 'The Monalisa',
        description: 'A painting of a lady smiling',
        artist: 'Edvard Munch',
        numberOfLikes: 10,
        image: art2,
        comments: [{ id: 1, comment: "This is a nice Art", replies: [], userId: "aedh"}],
    },

]


export default arts