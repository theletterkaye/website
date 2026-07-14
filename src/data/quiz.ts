// Brand Archetype Quiz — questions and scoring map.
//
// Rebuilt from the original TryInteract quiz (250K+ takers). Each answer
// awards one point split evenly across its mapped archetypes. The
// archetype-to-answer mappings were inferred from Kaye's archetype
// profiles when the quiz was archived from Interact; edit the
// `archetypes` arrays below to tune scoring.
//
// Slugs must match src/content/archetypes/*: innocent, explorer, sage,
// hero, maverick, magician, girl-guy-next-door, lover, entertainer,
// caregiver, royal, creator.

export interface QuizAnswer {
  text: string;
  archetypes: string[];
}

export interface QuizQuestion {
  question: string;
  answers: QuizAnswer[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    question: "What's your brand's biggest strength?",
    answers: [
      { text: 'Relating to others', archetypes: ['girl-guy-next-door'] },
      { text: 'Curiosity', archetypes: ['explorer', 'sage'] },
      { text: 'Empowering others', archetypes: ['magician', 'royal', 'hero'] },
      { text: 'Your magnetic personality', archetypes: ['entertainer'] },
      { text: 'Following your heart', archetypes: ['lover'] },
      { text: 'Imagination', archetypes: ['creator'] },
      { text: 'Compassion', archetypes: ['caregiver'] },
      { text: 'Always working to improve', archetypes: ['hero'] },
      { text: 'A strong sense of identity', archetypes: ['innocent', 'maverick'] },
    ],
  },
  {
    question: "Which person feels most in line with your brand's mission?",
    answers: [
      { text: 'Athlete', archetypes: ['hero'] },
      { text: 'Best friend', archetypes: ['girl-guy-next-door'] },
      { text: 'Revolutionary', archetypes: ['maverick'] },
      { text: 'Yoga instructor', archetypes: ['magician'] },
      { text: 'Stylist', archetypes: ['lover'] },
      { text: 'Tour guide', archetypes: ['explorer'] },
      { text: 'Nurse', archetypes: ['caregiver'] },
      { text: 'CEO', archetypes: ['royal'] },
      { text: 'Stand-up comedian', archetypes: ['entertainer'] },
    ],
  },
  {
    question: "What's your brand's biggest weakness?",
    answers: [
      { text: 'Dealing with feelings', archetypes: ['sage'] },
      { text: 'Crossing the line too often', archetypes: ['maverick'] },
      { text: 'Ignoring practical advice', archetypes: ['lover'] },
      { text: 'Relating to the average person', archetypes: ['royal'] },
      { text: 'Losing your own identity', archetypes: ['girl-guy-next-door'] },
      { text: 'Organization', archetypes: ['entertainer'] },
      { text: 'Commitment', archetypes: ['explorer'] },
      { text: 'Saying "no"', archetypes: ['caregiver'] },
      { text: "Understanding others' beliefs", archetypes: ['innocent'] },
    ],
  },
  {
    question: 'Which character best represents your brand?',
    answers: [
      { text: 'Geppetto (Pinocchio): imaginative craftsman', archetypes: ['creator'] },
      { text: 'Jack Sparrow (Pirates of the Caribbean): strong-willed, quirky', archetypes: ['maverick'] },
      { text: 'The Fairy Godmother (Cinderella): maternal, transformational', archetypes: ['magician', 'caregiver'] },
      { text: 'Sherlock Holmes: smart, questioning', archetypes: ['sage'] },
      { text: 'Dorothy (The Wizard of Oz): positive, accepting', archetypes: ['innocent', 'girl-guy-next-door'] },
      { text: 'Luke Skywalker (Star Wars): loyal, adventurous', archetypes: ['hero', 'explorer'] },
      { text: 'Bugs Bunny: jokester, charismatic', archetypes: ['entertainer'] },
      { text: 'Prince Eric (The Little Mermaid): refined, ambitious', archetypes: ['royal'] },
      { text: 'Romeo (Romeo & Juliet): emotional, spirited', archetypes: ['lover'] },
    ],
  },
  {
    question: "What's your brand's top value?",
    answers: [
      { text: 'Community', archetypes: ['girl-guy-next-door'] },
      { text: 'Beauty', archetypes: ['lover'] },
      { text: 'Living in the moment', archetypes: ['entertainer'] },
      { text: 'Universal truth', archetypes: ['sage'] },
      { text: 'Generosity', archetypes: ['caregiver'] },
      { text: 'Audacity', archetypes: ['maverick'] },
      { text: 'Evolution', archetypes: ['magician'] },
      { text: 'Simplicity', archetypes: ['innocent'] },
      { text: 'Uniqueness', archetypes: ['creator'] },
      { text: 'Excellence', archetypes: ['royal'] },
      { text: 'Discovery', archetypes: ['explorer'] },
      { text: 'Bravery', archetypes: ['hero'] },
    ],
  },
  {
    question: 'What tone of voice will your brand use?',
    answers: [
      { text: 'Factual', archetypes: ['sage'] },
      { text: 'Aspirational', archetypes: ['royal'] },
      { text: 'Questioning', archetypes: ['explorer'] },
      { text: 'Intuitive', archetypes: ['magician'] },
      { text: 'Simple', archetypes: ['innocent'] },
      { text: 'Practical', archetypes: ['girl-guy-next-door'] },
      { text: 'Strong', archetypes: ['hero'] },
      { text: 'Kind', archetypes: ['caregiver'] },
      { text: 'Candid', archetypes: ['maverick'] },
      { text: 'Passionate', archetypes: ['lover'] },
      { text: 'Imaginative', archetypes: ['creator'] },
      { text: 'Funny', archetypes: ['entertainer'] },
    ],
  },
  {
    question: "How would you describe your brand's personality?",
    answers: [
      { text: 'Optimistic and pure', archetypes: ['innocent'] },
      { text: 'Approachable and friendly', archetypes: ['girl-guy-next-door'] },
      { text: 'Analytical and wise', archetypes: ['sage'] },
      { text: 'Bold and uninhibited', archetypes: ['maverick'] },
      { text: 'Driven and self-disciplined', archetypes: ['hero'] },
      { text: 'Passionate and devoted', archetypes: ['lover'] },
      { text: 'Imaginative and vibrant', archetypes: ['creator'] },
      { text: 'Considerate and generous', archetypes: ['caregiver'] },
      { text: 'Resourceful and adventurous', archetypes: ['explorer'] },
      { text: 'Insightful and mysterious', archetypes: ['magician'] },
      { text: 'Playful and captivating', archetypes: ['entertainer'] },
      { text: 'Refined and influential', archetypes: ['royal'] },
    ],
  },
  {
    question: 'Which kind of content appeals to you most?',
    answers: [
      { text: 'Motivational content', archetypes: ['hero'] },
      { text: 'Ways for people to connect and build relationships', archetypes: ['girl-guy-next-door', 'lover'] },
      { text: 'Exposés about shady industry practices', archetypes: ['maverick'] },
      { text: 'Case studies of successful people and companies', archetypes: ['royal', 'magician'] },
      { text: 'Memes and funny videos', archetypes: ['entertainer'] },
      { text: 'Well-researched articles', archetypes: ['sage'] },
      { text: 'New experiences or techniques to try', archetypes: ['explorer', 'creator'] },
      { text: 'Uplifting quotes', archetypes: ['innocent', 'caregiver'] },
    ],
  },
  {
    question: 'How does your brand solve client problems?',
    answers: [
      { text: 'By encouraging clients to look within themselves for the tools to overcome their challenges', archetypes: ['magician'] },
      { text: 'By helping clients shift their perspective and see problems in a new way', archetypes: ['entertainer', 'explorer', 'maverick'] },
      { text: 'By sharing personal experience and providing a safe space to be honest', archetypes: ['caregiver', 'girl-guy-next-door'] },
      { text: 'By teaching a clear point of view about the world and how to solve the problem', archetypes: ['innocent', 'royal', 'sage'] },
    ],
  },
  {
    question: "What's your brand's goal?",
    answers: [
      { text: 'Create more freedom', archetypes: ['explorer'] },
      { text: 'Motivate others to improve', archetypes: ['hero'] },
      { text: 'Create something new and imaginative', archetypes: ['creator'] },
      { text: 'Achieve success and influence', archetypes: ['royal'] },
      { text: 'Advocate for different thinking', archetypes: ['maverick'] },
      { text: 'Help as many people as possible', archetypes: ['caregiver'] },
      { text: 'Build a community', archetypes: ['girl-guy-next-door'] },
      { text: "Transform people's lives", archetypes: ['magician'] },
      { text: 'Help people enjoy life', archetypes: ['entertainer'] },
      { text: 'Find and share the truth', archetypes: ['sage'] },
      { text: 'Keep things natural and simple', archetypes: ['innocent'] },
      { text: 'Enjoy life passionately', archetypes: ['lover'] },
    ],
  },
  {
    question: 'What do you believe about the world?',
    answers: [
      { text: 'You have to work hard to get what you want', archetypes: ['hero'] },
      { text: "By giving what you can, you'll always have enough", archetypes: ['caregiver'] },
      { text: "What's popular is usually wrong", archetypes: ['maverick'] },
      { text: 'Being uncomfortable and out of place inspires growth', archetypes: ['explorer'] },
      { text: 'We become whole by finding balance within ourselves', archetypes: ['innocent'] },
      { text: 'The world runs on relationships between regular people', archetypes: ['girl-guy-next-door'] },
    ],
  },
  {
    question: 'Which statement resonates most?',
    answers: [
      { text: 'Follow your passions and listen to your heart', archetypes: ['lover'] },
      { text: 'Never expect less than your worth', archetypes: ['royal'] },
      { text: 'You are capable of more than you know, and change is within your power', archetypes: ['magician'] },
      { text: 'Knowledge is the key to success', archetypes: ['sage'] },
      { text: 'Imagination plus passion is all you need', archetypes: ['creator'] },
      { text: 'You only live once', archetypes: ['entertainer'] },
    ],
  },
];
