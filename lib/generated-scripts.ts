export interface SceneScript {
  sceneNumber: number;
  title: string;
  script: string;
  duration: string;
}

export interface GeneratedStory {
  lessonId: string;
  title: string;
  scenes: SceneScript[];
  totalDuration: string;
}

// Pre-generated scripts with ElevenLabs audio tags for engaging narration
export const GENERATED_SCRIPTS: Record<string, GeneratedStory> = {
  'three-pigs': {
    lessonId: 'three-pigs',
    title: 'The Three Little Pigs',
    totalDuration: '5 min',
    scenes: [
      {
        sceneNumber: 1,
        title: 'The Three Pigs Leave Home',
        duration: '45 sec',
        script: `[cheerfully] Once upon a time, there were three little pigs who lived with their mother. [warmly] One day, she said to them, "My dear children, you are now old enough to build your own houses and make your way in the world." [excitedly] The three little pigs were so excited! [happily] They hugged their mother goodbye and set off down the road, ready for their big adventure. [playfully] "Let's build the best houses ever!" squealed the youngest pig. [enthusiastically] And off they went, singing and dancing along the way!`,
      },
      {
        sceneNumber: 2,
        title: 'Building Houses of Straw and Sticks',
        duration: '50 sec',
        script: `[casually] The first little pig was feeling lazy. [dismissively] "I'll build my house out of straw," he said. "It'll be quick and easy!" [light chuckle] In no time at all, he had a straw house and was relaxing inside. [slightly worried] The second little pig found some sticks. "These will work just fine," he said. [quickly] He built his stick house in just one afternoon. [contentedly] "Perfect! Now I can play!" he said. [proudly] Both pigs were very pleased with themselves and settled in for a nice, easy life.`,
      },
      {
        sceneNumber: 3,
        title: 'The Brick House',
        duration: '55 sec',
        script: `[seriously] But the third little pig was very wise. [thoughtfully] "I'm going to build my house out of bricks," she said. [determinedly] "It will take longer, but it will be strong and safe." [sound of hammering] Day after day, she worked hard, laying brick after brick. [tiredly] Sometimes she got tired, [encouragingly] but she kept going! [with effort] She mixed the mortar, placed each brick carefully, and built a chimney too. [proudly] Finally, after many days of hard work, her brick house was complete! [happily] "Now THIS is a proper house!" she said with a big smile.`,
      },
      {
        sceneNumber: 4,
        title: 'The Wolf Attacks!',
        duration: '60 sec',
        script: `[ominously] One day, a big bad wolf came prowling through the forest. [hungrily] "Mmmm, I smell pigs!" he growled. [menacingly] He arrived at the straw house first. [roughly] "Little pig, little pig, let me come in!" [defiantly] "Not by the hair on my chinny chin chin!" squealed the first pig. [angrily] "Then I'll HUFF and I'll PUFF and I'll BLOW your house in!" [whooshing sound] WHOOOOSH! The straw house collapsed! [frantically] The first pig ran as fast as he could to his brother's stick house. [menacingly] But the wolf followed. [roughly] "Little pigs, little pigs, let me come in!" [together, defiantly] "Not by the hair on our chinny chin chins!" [furiously] "Then I'll HUFF and I'll PUFF and I'll BLOW your house in!" [huge whoosh] WHOOOOOOSH! Down came the stick house too!`,
      },
      {
        sceneNumber: 5,
        title: 'Safe in the Brick House',
        duration: '50 sec',
        script: `[frantically] The two little pigs ran as fast as their legs could carry them to their sister's brick house. [urgently] "Let us in! Let us in! The wolf is coming!" [calmly] Their wise sister opened the door. [reassuringly] "Don't worry, you're safe now." [menacingly] Soon the wolf arrived. [roughly] "Little pigs, little pigs, let me come in!" [united, confidently] "Not by the hair on our chinny chin chins!" roared all three pigs. [furiously] "Then I'll HUFF and I'll PUFF and I'll BLOW your house in!" [enormous effort] The wolf huffed and puffed... and PUFFED and HUFFED... [exhausted] but the brick house didn't budge! [defeated] Finally, the tired wolf gave up and ran away. [cheerfully] The three little pigs celebrated, [warmly] and from that day on, they all lived happily together in the strong brick house. [wisely] And they learned that hard work always pays off! THE END.`,
      },
    ],
  },
  'romeo-juliet': {
    lessonId: 'romeo-juliet',
    title: 'Romeo and Juliet',
    totalDuration: '8 min',
    scenes: [
      {
        sceneNumber: 1,
        title: 'The Ancient Feud',
        duration: '60 sec',
        script: `[dramatically] In fair Verona, where our story takes place, [sorrowfully] two noble families hate each other with a burning passion. [seriously] The Montagues and the Capulets have been enemies for so long, [sadly] nobody even remembers why the feud began. [angrily] In the streets, they fight! In the marketplace, they argue! [intensely] Young men from both families carry swords, always ready for battle. [ominously] The Prince of Verona has had enough. [authoritatively] "If you disturb the peace again," he declares, [sternly] "death shall be your punishment!" [whispers] But love, as we shall see, cares nothing for old grudges...`,
      },
      {
        sceneNumber: 2,
        title: 'The Capulet Ball',
        duration: '70 sec',
        script: `[cheerfully] The Capulets are throwing a grand masquerade ball! [excitedly] Music fills the air, guests dance in beautiful costumes, [playfully] and Romeo Montague sneaks in wearing a mask, even though he's not invited! [chuckles] His friends think he's crazy. [romantically] But then... Romeo sees her. [in awe] Juliet Capulet, standing across the room like the sun itself. [softly, lovingly] "Did my heart love till now?" Romeo whispers. "For I never saw true beauty till this night." [curiously] Juliet notices him too. Their eyes meet. [warmly] They move toward each other as if pulled by fate itself. [gently] Their hands touch. [romantically] They speak in poetry. They share a kiss. [dreamily] In that moment, nothing else exists. [suddenly worried] But then Juliet's cousin Tybalt recognizes Romeo's voice! [angrily] "A Montague here? This is an outrage!" [urgently] Romeo must leave... but his heart stays behind.`,
      },
      {
        sceneNumber: 3,
        title: 'The Balcony Scene',
        duration: '75 sec',
        script: `[whispers] Later that night, Romeo cannot stay away. [sneakily] He climbs the walls of the Capulet garden. [in awe] Above him, Juliet appears at her balcony window. [romantically] "But soft! What light through yonder window breaks? It is the east, and Juliet is the sun!" [dreamily] Juliet doesn't know he's there. She speaks to the stars. [longingly] "Oh Romeo, Romeo, wherefore art thou Romeo?" [sadly] "Why must you be a Montague? What's in a name?" [passionately] "A rose by any other name would smell as sweet!" [startled] Romeo steps forward. "Call me but love, and I'll be new baptized!" [shocked but happy] Juliet gasps! [nervously] They talk for hours beneath the moon. [determinedly] They make a vow. [seriously] Tomorrow, they will be married in secret! [worriedly] Even if their families are enemies, [hopefully] their love will conquer all!`,
      },
      {
        sceneNumber: 4,
        title: 'Secret Marriage',
        duration: '65 sec',
        script: `[solemnly] The next morning, in Friar Lawrence's chapel, [warmly] Romeo and Juliet are married in secret. [hopefully] "Perhaps," thinks the wise Friar, [optimistically] "this marriage will end the feud between your families." [joyfully] The young lovers are overjoyed! [happily] They promise to love each other forever. [sweetly] "Good night, good night! Parting is such sweet sorrow," Juliet says. [lovingly] Romeo replies, "Sleep dwell upon thine eyes, peace in thy breast!" [contentedly] For a brief moment, everything seems perfect. [ominously] But in Verona's streets, [tensely] trouble is brewing. The hot summer sun makes tempers flare. [worried] Romeo's friend Mercutio and Juliet's cousin Tybalt meet. [angrily] Words are exchanged. [dramatically] Swords are drawn! [urgently] Romeo arrives and tries to make peace, [desperately] but tragedy strikes...`,
      },
      {
        sceneNumber: 5,
        title: 'Tragic Misunderstanding',
        duration: '70 sec',
        script: `[sorrowfully] After a duel leads to death, [sadly] Romeo is banished from Verona. [frantically] Juliet's parents, not knowing she's already married, [firmly] insist she must marry another man named Paris. [desperately] "I cannot!" cries Juliet. [determinedly] She runs to Friar Lawrence for help. [conspiratorially] The Friar has a dangerous plan. [seriously] He gives Juliet a special potion. [whispers] "Drink this tonight. You will appear to be dead for two days. [reassuringly] When you wake up, Romeo will be there to take you away!" [nervously] Juliet drinks the potion. [dramatically] Her family finds her and believes she has died! [sorrowfully] They place her in the family tomb. [urgently] But the message to Romeo never arrives! [devastatingly] He hears only that Juliet is dead. [anguished] His heart breaks! [desperately] He rushes to her tomb with poison in his hand.`,
      },
      {
        sceneNumber: 6,
        title: 'Two Families United in Grief',
        duration: '60 sec',
        script: `[sorrowfully] At Juliet's tomb, [heartbroken] Romeo drinks the poison just before Juliet wakes. [tragically] She finds him dead beside her. [anguished] "What's here? A cup closed in my true love's hand?" [devastated] Unable to live without him, [dramatically] Juliet takes her own life. [heavily] When both families discover their children dead, [overwhelmed with grief] the Montagues and Capulets finally understand the cost of their hatred. [solemnly] The Prince speaks: [sternly] "See what a scourge is laid upon your hate." [sadly] The families, weeping together, [remorsefully] shake hands and promise to end their feud. [meaningfully] Two golden statues are built in the lovers' memory. [wisely] Sometimes, love's greatest power is shown through the lessons it teaches us. [gently] Thus ends the tale of Romeo and Juliet. THE END.`,
      },
    ],
  },
  'moon-landing-kids': {
    lessonId: 'moon-landing-kids',
    title: 'First Moon Landing',
    totalDuration: '5 min',
    scenes: [
      {
        sceneNumber: 1,
        title: 'Getting Ready for Launch',
        duration: '45 sec',
        script: `[excitedly] On July 16, 1969, something AMAZING was about to happen! [enthusiastically] Three brave astronauts - Neil Armstrong, Buzz Aldrin, and Michael Collins - [proudly] were getting ready to fly to the MOON! [in awe] Can you believe it? The actual MOON! [cheerfully] They put on their big white spacesuits and giant helmets. [playfully] The spacesuits looked like snowsuits, but way cooler! [seriously] Everything had to be perfect because space is very dangerous. [encouragingly] The astronauts were a little nervous but mostly excited. [determinedly] They were ready to do something no human had ever done before!`,
      },
      {
        sceneNumber: 2,
        title: 'Blast Off!',
        duration: '50 sec',
        script: `[dramatically] The astronauts climbed into their rocket called Apollo 11. [impressively] The rocket was taller than a 30-story building! [building tension] Mission Control counted down: "Ten... nine... eight... seven... six... five... four... three... two... one..." [thunderously] "LIFTOFF!" [with immense power] VROOOOOOM! The rocket's engines roared to life! [amazed] Fire and smoke shot out from the bottom! [excitedly] The ground shook! The rocket slowly lifted off the launch pad, [increasingly excited] going faster and faster and FASTER! [in wonder] In just a few minutes, they were zooming through the clouds! [amazed] Soon, they could see the curve of Earth below them. [whispers in awe] They were in SPACE!`,
      },
      {
        sceneNumber: 3,
        title: 'Flying Through Space',
        duration: '55 sec',
        script: `[calmly] For three whole days, the astronauts flew through space toward the Moon. [curiously] What do you think space looks like? [in wonder] It's very dark, with millions and millions of twinkling stars everywhere! [playfully] Inside the spacecraft, everything floated! [chuckles] The astronauts could do somersaults in mid-air! [matter-of-factly] They ate special space food from pouches and slept in sleeping bags attached to the walls. [excitedly] Out the window, they could see Earth getting smaller and smaller, [amazed] and the Moon getting bigger and BIGGER! [nervously] As they got closer, their hearts beat faster. [whispers] They were almost there! [seriously] Now came the hardest part - landing on the Moon!`,
      },
      {
        sceneNumber: 4,
        title: 'Landing on the Moon',
        duration: '50 sec',
        script: `[tensely] Neil Armstrong and Buzz Aldrin climbed into the lunar module - a special spacecraft that would land on the Moon. [encouragingly] Michael Collins stayed in orbit to help them. [seriously] As they got closer to the Moon's surface, [concerned] alarms started beeping! The computer was having trouble! [calmly but firmly] But Neil Armstrong took control. [concentrating] He carefully steered the lunar module, [searching] looking for a safe place to land. [nervously] The fuel was running low! They had less than a minute! [focused] Lower... lower... [dramatically] Almost there... [triumphantly] TOUCHDOWN! [relieved and happy] They made it! Neil Armstrong radioed to Earth: [proudly] "The Eagle has landed!" [cheering] Back on Earth, everyone cheered and clapped!`,
      },
      {
        sceneNumber: 5,
        title: 'One Small Step',
        duration: '60 sec',
        script: `[with anticipation] A few hours later, Neil Armstrong opened the hatch door. [carefully] He climbed down the ladder very slowly. [in awe] The whole world watched on TV! [historically] Then, Neil Armstrong put his foot on the Moon's surface and said: [clearly and meaningfully] "That's one small step for man, one giant leap for mankind." [joyfully] He was the first person EVER to walk on the Moon! [excitedly] Buzz Aldrin joined him, and they bounced around like kangaroos! [playfully] On the Moon, you weigh six times less, so it's easy to jump really high! [proudly] They planted an American flag and collected Moon rocks to bring home. [happily] They took pictures and did experiments. [warmly] After a few hours of exploring, [contentedly] they flew back to Earth, where everyone celebrated. [inspirationally] And that's how humans landed on the Moon! THE END.`,
      },
    ],
  },
};

export function getGeneratedScript(lessonId: string): GeneratedStory | null {
  return GENERATED_SCRIPTS[lessonId] || null;
}

export function hasGeneratedScript(lessonId: string): boolean {
  return lessonId in GENERATED_SCRIPTS;
}

