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
    totalDuration: '2 min',
    scenes: [
      {
        sceneNumber: 1,
        title: 'Building the Houses',
        duration: '20 sec',
        script: `[cheerfully] The first little pig said, [casually, lazy voice] "I'll build my house out of straw! Quick and easy!" [slightly more serious] The second pig chose sticks. [pause] [determinedly, with admiration] But the third pig? She was wise. [proudly] "I'm building mine with BRICKS," she declared. [meaningfully] "It will be strong and safe."`,
      },
      {
        sceneNumber: 2,
        title: 'The Wolf Arrives',
        duration: '20 sec',
        script: `[ominously, building tension] One day... [suspensefully, low voice] a big bad wolf appeared. [hungrily, growling tone] "Mmmm, I smell pigs!" [menacingly, knock knock knock] He knocked on the straw house. [roughly, demanding] "Little pig, little pig, let me come in!" [high pitched, scared but defiant] "Not by the hair on my chinny chin chin!"`,
      },
      {
        sceneNumber: 3,
        title: 'Huffing and Puffing',
        duration: '20 sec',
        script: `[angrily, roaring] "Then I'll HUFF and I'll PUFF and I'll BLOW your house in!" [dramatically, building up] The wolf took a HUGE breath... [enormous effort, straining] and he HUFFED and he PUFFED [massive exhale] and he BLEEEW! [suddenly loud] WHOOOOSH! [dramatically] The straw house collapsed! [frantically, quick pace] The little pig ran for his life!`,
      },
      {
        sceneNumber: 4,
        title: 'The Brick House Stands Strong',
        duration: '20 sec',
        script: `[menacingly, prowling] The wolf reached the brick house. [pounding rhythm, rough] "Little pigs, let me come in!" [united voices, boldly shouting] "NOT by the hair on our chinny chin chins!" [furiously, with massive effort] The wolf huffed [huge inhale] and puffed [huge exhale] and HUFFED [bigger inhale] and PUFFED! [exhausted, out of breath] But... [pause] [amazed] the brick house stood strong!`,
      },
      {
        sceneNumber: 5,
        title: 'The Wolf Gives Up',
        duration: '20 sec',
        script: `[exhausted, panting heavily] The wolf was so tired! [pause] [defeated, groaning weakly] "I... give up!" [fading away, running] And he ran far, far away! [suddenly cheerful, celebrating] The three pigs cheered with joy! [chuckles warmly] [wisely, with a smile] And they learned... [meaningfully] that hard work truly pays off. [contentedly] The end.`,
      },
    ],
  },
  'romeo-juliet': {
    lessonId: 'romeo-juliet',
    title: 'Romeo and Juliet',
    totalDuration: '2 min',
    scenes: [
      {
        sceneNumber: 1,
        title: 'Love at First Sight',
        duration: '20 sec',
        script: `[mysteriously] Romeo snuck into the Capulet ball wearing a mask. [pause] [suddenly breathless, in awe] And then... he saw her. Juliet. [romantically, mesmerized, softly] "Did my heart love till now?" he whispered. [dreamily] "For I never saw true beauty... till this night." [warmly, with wonder] Their eyes met. [gently, intimately] Their hands touched. [whispers] And they kissed.`,
      },
      {
        sceneNumber: 2,
        title: 'The Balcony',
        duration: '20 sec',
        script: `[quietly, sneaking] That night, Romeo climbed into her garden. [pause] [looking up, awestruck, romantically] "But soft!" he breathed. [building emotion] "What light through yonder window breaks?" [passionately] "It is the east, and Juliet is the sun!" [from above, longingly, sighing deeply] Juliet appeared at her window. "Oh Romeo, Romeo... wherefore art thou Romeo?"`,
      },
      {
        sceneNumber: 3,
        title: 'A Rose by Any Other Name',
        duration: '20 sec',
        script: `[thoughtfully, questioning] "What's in a name?" Juliet wondered aloud. [poetically, beautifully] "A rose by any other name would smell as sweet." [suddenly, stepping forward eagerly] Romeo revealed himself! [passionately] "Call me but love, and I'll be new baptized!" [gasps sharply] [shocked but overjoyed] Juliet gasped! [determinedly, firmly] "Tomorrow... we marry in secret."`,
      },
      {
        sceneNumber: 4,
        title: 'The Sleeping Potion',
        duration: '20 sec',
        script: `[desperately, frantic] Juliet rushed to Friar Lawrence. [seriously, lowering voice conspiratorially] The Friar had a dangerous plan. He handed her a vial. [ominously, warning] "Drink this tonight. You will appear... to be dead." [pause, nervous breathing] Juliet's hand trembled. [with fierce determination] But she lifted the vial... [dramatically, gulping] and drank every last drop.`,
      },
      {
        sceneNumber: 5,
        title: 'Star-Crossed Ending',
        duration: '20 sec',
        script: `[sorrowfully, heavy with grief] Romeo found Juliet in the cold tomb. [heartbroken, voice breaking] Believing she was truly gone... [anguished, crying] he drank the poison. [tragically, slowly] Juliet woke moments later... [devastated, screaming silently] to find him dead beside her. [heavily, with deep sadness] The families' hatred... [pause] [gently, meaningfully] had destroyed them both. [softly] The end.`,
      },
    ],
  },
  'moon-landing-kids': {
    lessonId: 'moon-landing-kids',
    title: 'First Moon Landing',
    totalDuration: '2 min',
    scenes: [
      {
        sceneNumber: 1,
        title: 'The Countdown',
        duration: '20 sec',
        script: `[building tension, serious] Mission Control began the countdown. [dramatically, each number building] "Ten... nine... eight... seven... six... five... four... three... two... one..." [pause] [suddenly explosive, triumphant] "LIFTOFF!" [with immense power, rumbling voice] The massive rocket roared to life! [increasingly excited] It climbed higher and higher, [amazed] blasting toward the Moon!`,
      },
      {
        sceneNumber: 2,
        title: 'Flying to the Moon',
        duration: '20 sec',
        script: `[in wonder, peaceful] For three whole days, the astronauts soared through the darkness of space. [playfully, amazed] Inside the spacecraft, everything floated! [chuckles, delighted] They could flip and tumble through the air! [excitedly, building anticipation] Through the window, [pause] the Moon grew larger... [suspensefully] and larger... [nervously, quick] and LARGER! [breathless] They were almost there!`,
      },
      {
        sceneNumber: 3,
        title: 'The Eagle Has Landed',
        duration: '20 sec',
        script: `[tensely, focused] Neil Armstrong carefully steered downward. [concerned, urgent] Suddenly, alarms started beeping! [nervously, breathing faster] The fuel was running low! [with determination] He searched for a safe spot. [counting down softly] Lower... lower... [dramatically building] almost there... [triumphantly, relieved] TOUCHDOWN! [proudly, clearly] "The Eagle has landed!" [celebratory, joyful] The world erupted in cheers!`,
      },
      {
        sceneNumber: 4,
        title: 'One Small Step',
        duration: '20 sec',
        script: `[with great anticipation, slow] Neil Armstrong opened the hatch. [carefully, deliberately] Step by step, he climbed down the ladder. [pause] [in awe, breathless] Millions of people watched their televisions. [historically, clearly, meaningfully] His foot touched the Moon's surface. [pause] [solemnly, with weight] "That's one small step for man... [powerfully] one giant leap for mankind."`,
      },
      {
        sceneNumber: 5,
        title: 'Moonwalk!',
        duration: '20 sec',
        script: `[joyfully, laughing] Neil and Buzz bounced across the Moon like kangaroos! [playfully, excited] With less gravity, they could jump SO high! [proudly, strong] They planted the American flag. [amazed, gathering] They collected rocks from another world! [pause] [inspirationally, triumphant, building to crescendo] Humanity... had reached... the MOON! [contentedly, with smile] The end.`,
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

// Helper function to remove audio tags from script for display
export function removeAudioTags(script: string): string {
  return script.replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim();
}

// Helper function to get audio file path for a scene
export function getAudioPath(lessonId: string, sceneNumber: number): string {
  return `/audio/${lessonId}/scene-${sceneNumber}.mp3`;
}

// Helper function to check if audio file exists (client-side)
export async function checkAudioExists(lessonId: string, sceneNumber: number): Promise<boolean> {
  try {
    const response = await fetch(getAudioPath(lessonId, sceneNumber), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

