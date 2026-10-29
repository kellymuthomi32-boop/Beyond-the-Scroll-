export interface DailyFact {
  image: string;
  alt: string;
  credit: string;
  source: string;
  title: string;
  text: string;
  category: string;
}

export const FACTS: DailyFact[] = [
  {
    image: "/images/octopus.jpg",
    alt: "A dumbo octopus swimming in the deep sea",
    credit: "NOAA Ocean Exploration · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Dumbo_Octopus_(49203817176).jpg",
    title: "An octopus has a remarkable nervous system.",
    text: "A large share of an octopus's neurons are in its arms, helping them sense, taste, and respond independently to their surroundings.",
    category: "BIOLOGY"
  },
  {
    image: "/images/tardigrade.jpg",
    alt: "A tardigrade, or water bear, under a microscope",
    credit: "DSparrow14 · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Tardigrade_under_microscope.jpg",
    title: "Some tiny animals can enter suspended animation.",
    text: "Some tardigrades enter a dormant state called cryptobiosis that lets them endure freezing, boiling heat, and the vacuum of outer space.",
    category: "EXTREME LIFE"
  },
  {
    image: "/images/axolotl.jpg",
    alt: "A pale axolotl with feathery external gills in an aquarium",
    credit: "Bildflut · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Axolotl_in_aquarium.jpg",
    title: "Axolotls can regenerate lost limbs.",
    text: "Axolotls are studied worldwide by scientists for their extraordinary ability to regrow intact limbs, spinal cords, and heart tissue without scarring.",
    category: "REGENERATION"
  },
  {
    image: "/images/space.jpg",
    alt: "A deep-field view filled with distant galaxies",
    credit: "NASA, ESA, S. Beckwith (STScI) and the HUDF Team · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Hubble_ultra_deep_field.jpg",
    title: "Space is a time machine.",
    text: "Because light travels at a finite speed, every star or distant galaxy we look at is seen exactly as it appeared in the distant past.",
    category: "SPACE"
  },
  {
    image: "/images/bees.jpg",
    alt: "A honeybee collecting nectar from a flower",
    credit: "Abirami Narayanan · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:HoneyBee_on_flower.jpg",
    title: "Bees learn from visual clues.",
    text: "Bees can recognize visual patterns, understand the abstract concept of zero, and use polarized sunlight to navigate home through heavy clouds.",
    category: "ANIMALS"
  },
  {
    image: "/images/deepsea.jpg",
    alt: "A deep-sea dragonfish with a bioluminescent photophore",
    credit: "Edith Widder / HBOI / NOAA · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Photostomias.jpg",
    title: "The ocean abyss glows with cold light.",
    text: "Over three-quarters of deep-sea marine animals generate their own bioluminescent glow for camouflage, attracting prey, and silent signaling in the dark.",
    category: "DEEP SEA"
  },
  {
    image: "/images/titan.jpg",
    alt: "Saturn's moon Titan in true color",
    credit: "NASA / JPL-Caltech · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Titan_in_true_color.jpg",
    title: "Titan has lakes of liquid methane.",
    text: "Saturn's largest moon Titan has clouds, rain, rivers, and seas—not made of liquid water, but of frigid liquid methane and ethane at -179°C.",
    category: "PLANETARY"
  }
];
