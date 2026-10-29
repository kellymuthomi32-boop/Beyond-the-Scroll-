export interface QuizQuestion {
  q: string;
  a: string[];
  correct: number;
  why: string;
  category: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "Which animal is famous for regenerating limbs and repairing tissues without scarring?",
    a: ["Axolotl", "Honeybee", "Penguin", "Starfish only"],
    correct: 0,
    why: "Axolotls can regenerate complete limbs, spinal cords, and heart muscle tissue without forming scar tissue.",
    category: "REGENERATION"
  },
  {
    q: "Why do distant stars appear as they were in the past?",
    a: ["Space reverses time", "Light takes time to travel", "Stars stop moving", "Earth spins"],
    correct: 1,
    why: "Photons travel at a finite speed (~300,000 km/s), so the farther an object is, the older the light reaching our eyes is.",
    category: "SPACE"
  },
  {
    q: "What is a tardigrade?",
    a: ["A microscopic animal", "A type of star", "A deep-sea plant", "A mineral crystal"],
    correct: 0,
    why: "Tardigrades are eight-legged microscopic invertebrates (water bears) celebrated for extreme stress tolerance.",
    category: "EXTREME LIFE"
  },
  {
    q: "What do honeybees use to help guide foraging and spatial navigation?",
    a: ["Only sound", "Visual cues, learned patterns, and polarized light", "Magnetic maps only", "Echolocation"],
    correct: 1,
    why: "Bees learn visual patterns, memorize landmark geometry, and use polarized ultraviolet light to orient themselves.",
    category: "ANIMALS"
  },
  {
    q: "How many functional hearts does an octopus have?",
    a: ["One central heart", "Two hearts", "Three hearts", "Four hearts"],
    correct: 2,
    why: "An octopus has three hearts: one systemic heart that pumps blood throughout the body, and two branchial hearts that pump blood through each gill.",
    category: "BIOLOGY"
  },
  {
    q: "What makes bioluminescent light so unique compared to incandescent light bulbs?",
    a: ["It burns at 1,000°C", "It produces almost zero heat ('cold light')", "It requires radioactive uranium", "It only shines in green"],
    correct: 1,
    why: "Bioluminescence converts nearly 100% of chemical bond energy directly into light photons with virtually zero thermal loss.",
    category: "CHEMISTRY"
  },
  {
    q: "What are the lakes and rivers on Saturn's moon Titan composed of?",
    a: ["Liquid water", "Liquid methane and ethane", "Liquid mercury", "Molten sulfur"],
    correct: 1,
    why: "At surface temperatures of -179°C, methane and ethane condense into liquids that form active weather, rivers, and deep seas.",
    category: "PLANETARY"
  }
];
