import art1 from '../assets/art-1.jpg'  
import art2 from '../assets/art-2.jpg'


export interface Comment {
    id: number;
    userId: string;
    comment: string;
    replies: string[];
}

export interface Art {
    id: string;
    name: string;
    description: string;
    numberOfLikes: number;
    image: string;
    comments: string[];
}
const arts: Art[] = [
    {
        id: "1",
        name: 'The Starry Night',
        description: 'A painting of a starry night sky. A painting of a starry night sky. A painting of a starry night sky. A painting of a starry night sky.  A painting of a starry night sky. A painting of a starry night sky. A painting of a starry night sky.',
        
        numberOfLikes: 5,
        image: art1,
        comments: ["This is a nice Art"],
    },
    {
        id: "2",
        name: 'The Monalisa',
        description: 'A painting of a lady smiling',
        
        numberOfLikes: 10,
        image: art2,
        comments: [],
    },
    
]


export default arts