export interface Lesson {
  id: string;
  title: string;
  category: 'Literature' | 'History' | 'Adventure' | 'Science';
  grade: 'K-5' | '6-8' | '9-12';
  description: string;
  emoji: string;
  estimatedTime: string;
  prompt: string; // For OpenAI generation
}

export const LESSONS: Lesson[] = [
  // Elementary (K-5)
  {
    id: 'three-pigs',
    title: 'The Three Little Pigs',
    category: 'Literature',
    grade: 'K-5',
    description: 'Help the three pigs build their houses and escape the big bad wolf!',
    emoji: '🐷',
    estimatedTime: '5 min',
    prompt: 'Create a 5-scene story adaptation of The Three Little Pigs. Each scene should be 30-45 seconds of dialogue. Make it exciting and fun for young kids with simple language. Include: 1) The three pigs leaving home, 2) Building houses of straw and sticks, 3) Building the brick house, 4) Wolf attacking first two houses, 5) Wolf defeated at brick house. Include character dialogue and narration.',
  },
  {
    id: 'tortoise-hare',
    title: 'The Tortoise and the Hare',
    category: 'Literature',
    grade: 'K-5',
    description: 'Race with the speedy hare and steady tortoise in this classic tale!',
    emoji: '🐢',
    estimatedTime: '5 min',
    prompt: 'Create a 5-scene story adaptation of The Tortoise and the Hare. Each scene should be 30-45 seconds. Make it engaging for young children with clear lessons about perseverance. Include: 1) The challenge, 2) Race begins, 3) Hare takes a nap, 4) Tortoise passes, 5) Tortoise wins. Use simple, encouraging language.',
  },
  {
    id: 'wild-things',
    title: 'Where the Wild Things Are',
    category: 'Literature',
    grade: 'K-5',
    description: "Journey to the land of Wild Things with Max's imagination!",
    emoji: '👹',
    estimatedTime: '6 min',
    prompt: 'Create a 6-scene adaptation of Where the Wild Things Are. Each scene 30-45 seconds. Capture the magic and adventure for kids. Include: 1) Max in wolf suit causing mischief, 2) Sent to bed without supper, 3) Room transforms to forest, 4) Sailing to Wild Things island, 5) Becoming king of Wild Things, 6) Returning home to warm supper.',
  },
  {
    id: 'moon-landing-kids',
    title: 'First Moon Landing',
    category: 'History',
    grade: 'K-5',
    description: 'Blast off with astronauts to the Moon in this amazing adventure!',
    emoji: '🚀',
    estimatedTime: '5 min',
    prompt: 'Create a simplified 5-scene story about the Moon Landing for young children. Each scene 30-45 seconds. Make it exciting and easy to understand. Include: 1) Preparing for launch, 2) Rocket blasting off, 3) Flying through space, 4) Landing on the Moon, 5) Walking on the Moon and returning home. Use simple language and emphasize the wonder.',
  },
  {
    id: 'wright-brothers',
    title: "The Wright Brothers' First Flight",
    category: 'History',
    grade: 'K-5',
    description: 'Build and fly the first airplane with Wilbur and Orville!',
    emoji: '✈️',
    estimatedTime: '5 min',
    prompt: 'Create a 5-scene story about the Wright Brothers for young kids. Each scene 30-45 seconds. Make it inspiring and fun. Include: 1) Brothers dreaming of flight, 2) Building the airplane, 3) Test preparations at Kitty Hawk, 4) First successful flight, 5) Celebration and impact. Simple, encouraging language.',
  },
  {
    id: 'rosa-parks',
    title: 'Rosa Parks and the Bus',
    category: 'History',
    grade: 'K-5',
    description: "Learn about Rosa Parks' brave stand for equal rights!",
    emoji: '🚌',
    estimatedTime: '5 min',
    prompt: 'Create a 5-scene age-appropriate story about Rosa Parks for young children. Each scene 30-45 seconds. Focus on courage and fairness. Include: 1) Rosa going home after work, 2) Getting on the bus, 3) Being asked to give up her seat, 4) Saying no bravely, 5) How she helped change unfair laws. Use simple, positive language about doing the right thing.',
  },

  // Middle School (6-8)
  {
    id: 'romeo-juliet',
    title: 'Romeo and Juliet',
    category: 'Literature',
    grade: '6-8',
    description: 'Experience the timeless love story of Romeo and Juliet!',
    emoji: '💕',
    estimatedTime: '8 min',
    prompt: 'Create a 6-scene adaptation of Romeo and Juliet focusing on key moments. Each scene 45-60 seconds. Age-appropriate for middle school. Include: 1) Montagues and Capulets feud, 2) Romeo and Juliet meet at the ball, 3) Balcony scene, 4) Secret marriage, 5) Tragic misunderstanding, 6) Families unite in grief. Keep dialogue accessible but meaningful.',
  },
  {
    id: 'outsiders',
    title: 'The Outsiders',
    category: 'Literature',
    grade: '6-8',
    description: 'Walk with Ponyboy and the Greasers through friendship and loyalty!',
    emoji: '🌅',
    estimatedTime: '8 min',
    prompt: 'Create a 6-scene adaptation of The Outsiders. Each scene 45-60 seconds. Capture themes of friendship, class conflict, and finding oneself. Include: 1) Ponyboy and brothers at home, 2) Movie theater encounter, 3) Park confrontation, 4) Church hideout, 5) Fire rescue, 6) "Stay gold" message. Maintain the emotional depth.',
  },
  {
    id: 'mockingbird',
    title: 'To Kill a Mockingbird',
    category: 'Literature',
    grade: '6-8',
    description: 'Stand up for justice with Scout and Atticus Finch!',
    emoji: '⚖️',
    estimatedTime: '8 min',
    prompt: 'Create a 6-scene adaptation of To Kill a Mockingbird. Each scene 45-60 seconds. Focus on justice and moral courage. Include: 1) Scout, Jem, and Boo Radley mystery, 2) Atticus takes the case, 3) Courthouse courage, 4) Trial testimony, 5) Verdict and aftermath, 6) Boo Radley saves the children. Age-appropriate but impactful.',
  },
  {
    id: 'moon-landing',
    title: 'The Moon Landing',
    category: 'History',
    grade: '6-8',
    description: 'Experience the drama of Apollo 11\'s historic mission!',
    emoji: '🌙',
    estimatedTime: '7 min',
    prompt: 'Create a 6-scene detailed story of the Moon Landing for middle schoolers. Each scene 45-60 seconds. Include technical details and drama. Cover: 1) Kennedy\'s challenge and preparation, 2) Launch of Apollo 11, 3) Journey and tension, 4) Landing ("The Eagle has landed"), 5) First steps and flag, 6) Safe return and impact on humanity.',
  },
  {
    id: 'declaration',
    title: 'Declaration of Independence',
    category: 'History',
    grade: '6-8',
    description: 'Join the Founding Fathers in declaring freedom!',
    emoji: '📜',
    estimatedTime: '7 min',
    prompt: 'Create a 6-scene dramatization of the Declaration of Independence. Each scene 45-60 seconds. Make history come alive. Include: 1) Colonial frustrations with Britain, 2) Continental Congress debates, 3) Jefferson writing the document, 4) Franklin and Adams\' input, 5) Signing ceremony, 6) Reading to the public and its impact.',
  },
  {
    id: 'civil-rights',
    title: 'The Civil Rights Movement',
    category: 'History',
    grade: '6-8',
    description: 'March with heroes who fought for equality and justice!',
    emoji: '✊',
    estimatedTime: '8 min',
    prompt: 'Create a 6-scene story about key moments in the Civil Rights Movement. Each scene 45-60 seconds. Inspiring and educational. Include: 1) Rosa Parks and bus boycott, 2) Little Rock Nine, 3) MLK\'s "I Have a Dream", 4) Student sit-ins, 5) Selma march, 6) Civil Rights Act passage. Focus on courage and change.',
  },
  {
    id: 'moby-dick',
    title: 'Moby Dick',
    category: 'Adventure',
    grade: '6-8',
    description: 'Sail the seas with Captain Ahab hunting the great white whale!',
    emoji: '🐋',
    estimatedTime: '8 min',
    prompt: 'Create a 6-scene adventure adaptation of Moby Dick. Each scene 45-60 seconds. Capture the obsession and adventure. Include: 1) Ishmael joins the Pequod, 2) Meeting Captain Ahab, 3) Ahab reveals his obsession with Moby Dick, 4) Thrilling whale hunts, 5) Final confrontation with Moby Dick, 6) Aftermath and Ishmael\'s survival.',
  },
  {
    id: 'treasure-island',
    title: 'Treasure Island',
    category: 'Adventure',
    grade: '6-8',
    description: 'Search for buried treasure with Jim Hawkins and pirates!',
    emoji: '🏴‍☠️',
    estimatedTime: '7 min',
    prompt: 'Create a 6-scene adaptation of Treasure Island. Each scene 45-60 seconds. Full of adventure and excitement. Include: 1) Jim finds the treasure map, 2) Setting sail on the Hispaniola, 3) Discovering Long John Silver\'s mutiny plan, 4) Marooned on the island, 5) Finding Ben Gunn, 6) Recovering the treasure.',
  },

  // High School (9-12)
  {
    id: 'hamlet',
    title: 'Hamlet',
    category: 'Literature',
    grade: '9-12',
    description: 'To be or not to be? Explore Shakespeare\'s greatest tragedy!',
    emoji: '💀',
    estimatedTime: '10 min',
    prompt: 'Create a 6-scene adaptation of Hamlet for high school students. Each scene 60-75 seconds. Preserve Shakespeare\'s depth and famous quotes. Include: 1) Ghost reveals murder, 2) "To be or not to be" soliloquy, 3) The play within a play, 4) Confrontation with Gertrude, 5) Ophelia\'s tragedy, 6) Final duel and death. Use accessible but elevated language.',
  },
  {
    id: 'great-gatsby',
    title: 'The Great Gatsby',
    category: 'Literature',
    grade: '9-12',
    description: 'Enter the Jazz Age with Jay Gatsby and his impossible dream!',
    emoji: '🎩',
    estimatedTime: '10 min',
    prompt: 'Create a 6-scene adaptation of The Great Gatsby. Each scene 60-75 seconds. Capture the glamour and tragedy of the American Dream. Include: 1) Nick moves to West Egg, 2) Gatsby\'s lavish party, 3) Reunion with Daisy, 4) Plaza Hotel confrontation, 5) Myrtle\'s death, 6) Gatsby\'s death and funeral. Maintain Fitzgerald\'s style.',
  },
  {
    id: '1984',
    title: '1984',
    category: 'Literature',
    grade: '9-12',
    description: 'Experience Orwell\'s chilling vision of a totalitarian future!',
    emoji: '👁️',
    estimatedTime: '10 min',
    prompt: 'Create a 6-scene adaptation of 1984. Each scene 60-75 seconds. Maintain the dystopian atmosphere and themes. Include: 1) Winston\'s daily life under Big Brother, 2) Secret diary and thoughtcrime, 3) Meeting Julia, 4) The Brotherhood and O\'Brien, 5) Capture and Room 101, 6) "He loved Big Brother." Keep the political commentary sharp.',
  },
  {
    id: 'kennedy-moon',
    title: "Kennedy's Moon Speech",
    category: 'History',
    grade: '9-12',
    description: 'Witness JFK\'s challenge to reach the Moon in this defining moment!',
    emoji: '🎤',
    estimatedTime: '9 min',
    prompt: 'Create a 6-scene dramatization around Kennedy\'s Moon Speech. Each scene 60-75 seconds. Include historical context and impact. Cover: 1) Cold War space race tension, 2) Kennedy\'s Rice University speech, 3) NASA\'s response and preparation, 4) Public reaction and debate, 5) Years of work and setbacks, 6) Legacy and achievement. Use powerful, inspiring language.',
  },
  {
    id: 'gettysburg',
    title: 'The Gettysburg Address',
    category: 'History',
    grade: '9-12',
    description: 'Stand at Gettysburg as Lincoln redefines America\'s purpose!',
    emoji: '🎩',
    estimatedTime: '9 min',
    prompt: 'Create a 6-scene dramatization of the Gettysburg Address. Each scene 60-75 seconds. Capture the gravity and eloquence. Include: 1) Battle of Gettysburg aftermath, 2) Preparing for the dedication ceremony, 3) Edward Everett\'s long speech, 4) Lincoln\'s brief but powerful address, 5) Initial mixed reactions, 6) Growing recognition as defining American ideals.',
  },
  {
    id: 'call-wild',
    title: 'The Call of the Wild',
    category: 'Adventure',
    grade: '9-12',
    description: 'Journey with Buck from domestication to wild freedom!',
    emoji: '🐺',
    estimatedTime: '10 min',
    prompt: 'Create a 6-scene adaptation of The Call of the Wild. Each scene 60-75 seconds. Capture Buck\'s transformation and the harsh beauty of nature. Include: 1) Buck\'s comfortable life stolen, 2) Learning the law of club and fang, 3) Finding good masters, 4) John Thornton\'s kindness, 5) Thornton\'s death, 6) Buck answering the call of the wild. Maintain London\'s raw, powerful prose.',
  },
];

export function getLessonsByGrade(grade: 'K-5' | '6-8' | '9-12'): Lesson[] {
  return LESSONS.filter(lesson => lesson.grade === grade);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find(lesson => lesson.id === id);
}

export function getCategoriesForGrade(grade: 'K-5' | '6-8' | '9-12'): string[] {
  const lessons = getLessonsByGrade(grade);
  const categories = new Set(lessons.map(l => l.category));
  return Array.from(categories);
}

