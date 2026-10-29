export interface InteractiveHotspot {
  id: string;
  name: string;
  role: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

export interface DiscoveryItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  symbol: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageLicense?: string;
  imageSource: string;
  read: number;
  body: string;
  extendedBody?: string[];
  source: string;
  sourceName: string;
  fact: string;
  keyFacts: string[];
  scientificClassification?: {
    domain?: string;
    phylum?: string;
    class?: string;
    order?: string;
    notableFeature?: string;
  };
  depthOrScale?: string;
  hotspots?: InteractiveHotspot[];
  simulationType?: 'anatomy' | 'cryptobiosis' | 'lookback' | 'regeneration' | 'none';
  audioNarration?: string;
}

export const DISCOVERIES: DiscoveryItem[] = [
  {
    id: "octopus",
    category: "BIOLOGY",
    title: "The octopus is unlike almost any other animal",
    excerpt: "A distributed nervous system helps its arms explore and respond to the world around them.",
    symbol: "🐙",
    image: "/images/octopus.jpg",
    imageAlt: "A dumbo octopus swimming in the deep sea, photographed during NOAA’s 2019 deep-sea exploration",
    imageCredit: "NOAA Ocean Exploration · CC BY-SA 2.0",
    imageLicense: "https://creativecommons.org/licenses/by-sa/2.0/",
    imageSource: "https://commons.wikimedia.org/wiki/File:Dumbo_Octopus_(49203817176).jpg",
    read: 4,
    body: "An octopus has a very different nervous system from ours. In the common octopus, roughly two-thirds of its neurons are in its arms rather than its head. This distributed arrangement helps the arms process sensory information as they explore. Octopuses also show learning and problem-solving abilities, although their behaviour should not be described as human-like intelligence.",
    extendedBody: [
      "In addition to their decentralized neural architecture, octopuses possess three distinct hearts. A systemic heart pumps copper-rich, hemocyanin-based blue blood throughout the body, while two branchial hearts pump blood through each of the two gills.",
      "Remarkably, when an octopus swims, its systemic heart actually ceases beating, which is why cephalopods quickly tire during rapid jet propulsion and prefer crawling along the seabed.",
      "Furthermore, research has revealed that octopuses extensively edit their own messenger RNA (mRNA) at rates orders of magnitude higher than mammals. This allows them to dynamically re-code proteins in response to drastic ocean temperature swings without altering underlying DNA."
    ],
    source: "https://ocean.si.edu/ocean-life/invertebrates/octopuses-squids-and-relatives",
    sourceName: "Smithsonian Ocean — Cephalopods",
    fact: "Roughly two-thirds of a common octopus’s neurons are in its arms, not its head.",
    depthOrScale: "Depth: 100m – 7,000m (Dumbo Grimpoteuthis)",
    scientificClassification: {
      domain: "Eukaryota",
      phylum: "Mollusca",
      class: "Cephalopoda",
      order: "Octopoda",
      notableFeature: "Hemocyanin blue blood & 3 Hearts"
    },
    keyFacts: [
      "Over 500 million neurons, with ~350 million located directly in the 8 arms as autonomous neural clusters.",
      "Three functional hearts: one systemic heart and two dedicated branchial (gill) hearts.",
      "Blue hemocyanin blood binds oxygen with copper rather than iron, optimizing oxygen transport in freezing deep waters.",
      "Can alter skin pigmentation and 3D texture in under 200 milliseconds using dermal chromatophores."
    ],
    hotspots: [
      {
        id: "brain",
        name: "Central Brain & Esophagus Ring",
        role: "Central Executive Node",
        description: "Surrounds the esophagus with ~150 million neurons. Manages overarching goals, memory, and visual interpretation while delegating tactical arm movement to the limbs.",
        x: 48,
        y: 28
      },
      {
        id: "hearts",
        name: "Triple Circulatory System",
        role: "Systemic + 2 Branchial Hearts",
        description: "The systemic heart halts during active swimming. The two gill hearts circulate deoxygenated blood through the branchial lamellae to absorb oxygen.",
        x: 52,
        y: 42
      },
      {
        id: "arm-ganglia",
        name: "Radial Arm Ganglia (8 Ring Nodes)",
        role: "Semi-autonomous Arm Processing",
        description: "Each arm contains its own mini-brain ring that can smell, taste with suckers, reflexively curl, and inspect crevices without continuous central supervision.",
        x: 28,
        y: 68
      },
      {
        id: "skin",
        name: "Chromatophores & Papillae",
        role: "Optical Camouflage Matrix",
        description: "Microscopic elastic pigment sacs controlled by radial muscles allow instantaneous color, reflectivity, and physical surface texture matching.",
        x: 74,
        y: 52
      }
    ],
    simulationType: "anatomy",
    audioNarration: "The octopus is unlike almost any other creature on our planet. In the common octopus, roughly two-thirds of its 500 million neurons are located directly within its arms, allowing each limb to taste, touch, and make semi-autonomous movement choices. Coupled with three hearts and copper-based blue blood, the octopus represents one of nature's most extraordinary evolutionary pathways."
  },
  {
    id: "tardigrade",
    category: "EXTREME LIFE",
    title: "The tiny animal built for extreme conditions",
    excerpt: "Some tardigrades can enter a dormant state that helps them endure environmental stress.",
    symbol: "🧬",
    image: "/images/tardigrade.jpg",
    imageAlt: "A tardigrade, or water bear, photographed through a microscope",
    imageCredit: "DSparrow14 · CC BY-SA 4.0",
    imageLicense: "https://creativecommons.org/licenses/by-sa/4.0/",
    imageSource: "https://commons.wikimedia.org/wiki/File:Tardigrade_under_microscope.jpg",
    read: 5,
    body: "Tardigrades, often called water bears, are microscopic animals found in many environments. Some can enter a dehydrated dormant state called anhydrobiosis, in which their metabolism drops dramatically. Experiments have shown that some tardigrades can survive particular space-exposure conditions, but not every individual survives every extreme. Their resilience depends on species, treatment and exposure; they are not indestructible.",
    extendedBody: [
      "During cryptobiosis, tardigrades curl their eight legs inward, expel over 97% of their cellular water, and synthesize unique tardigrade-disordered proteins (TDPs). These proteins turn the interior of their cells into a protective bioglass, preventing cellular structures from collapsing.",
      "In this vitrified state, they have endured temperatures near absolute zero (-272°C), heat surges up to 150°C, pressures six times greater than the deepest ocean trenches, and cosmic ionizing radiation."
    ],
    source: "https://www.nasa.gov/humans-in-space/microscopic-superheroes-to-help-protect-astronaut-health-in-space/",
    sourceName: "NASA — Microscopic Superheroes",
    fact: "Some tardigrades tolerate severe stress by entering a dormant state.",
    depthOrScale: "Scale: 0.1mm – 1.2mm (Microscopic)",
    scientificClassification: {
      domain: "Eukaryota",
      phylum: "Tardigrada",
      class: "Eutardigrada",
      order: "Parachela",
      notableFeature: "Anhydrobiosis & Dsup radiation shield protein"
    },
    keyFacts: [
      "Can survive over 1,000 times the lethal radiation dose of a human.",
      "Enters a 'tun' state where metabolic activity drops to less than 0.01% of normal levels.",
      "Contains a unique damage-suppressor protein (Dsup) that physically binds and shields DNA from X-ray breaks.",
      "First animal proven to survive direct exposure to the open vacuum and cosmic radiation of space (FOTON-M3 mission)."
    ],
    simulationType: "cryptobiosis",
    audioNarration: "Tardigrades, commonly known as water bears, are eight-legged microscopic invertebrates celebrated for their ability to withstand the harshest environments in the universe. By transitioning into a glass-like dehydrated tun state, they can pause their metabolism for decades and reawaken with a single drop of water."
  },
  {
    id: "axolotl",
    category: "REGENERATION",
    title: "The salamander that can regrow lost limbs",
    excerpt: "Axolotls regenerate limbs and repair some tissues, giving researchers clues about healing.",
    symbol: "🦎",
    image: "/images/axolotl.jpg",
    imageAlt: "A pale axolotl with feathery external gills in an aquarium",
    imageCredit: "Bildflut · CC0 public domain dedication",
    imageLicense: "https://creativecommons.org/publicdomain/zero/1.0/",
    imageSource: "https://commons.wikimedia.org/wiki/File:Axolotl_in_aquarium.jpg",
    read: 4,
    body: "The axolotl is an aquatic salamander best known for retaining juvenile features into adulthood. It can regenerate lost limbs and repair several tissues, making it a valuable model organism for regeneration research. The process involves coordinated activity by cells and tissues; it does not mean that every injury can be repaired perfectly or that the same ability is available in humans.",
    extendedBody: [
      "Unlike mammals whose wounds typically produce thick fibrotic scar tissue, the axolotl rapidly migrates epithelial cells over an amputated stump to form a wound epidermis. Beneath this barrier, mature cells dedifferentiate back into progenitor stem cells, forming a proliferative mass called a blastema.",
      "Over 40 to 60 days, positional cues guided by the peripheral nervous system orchestrate the exact regrowth of bones, tendons, muscles, blood vessels, and nerves without a trace of scarring."
    ],
    source: "https://www.britannica.com/animal/axolotl",
    sourceName: "Encyclopaedia Britannica — Axolotl",
    fact: "Axolotls can regenerate limbs and are studied for their healing abilities.",
    depthOrScale: "Habitat: Lake Xochimilco, Valley of Mexico",
    scientificClassification: {
      domain: "Eukaryota",
      phylum: "Chordata",
      class: "Amphibia",
      order: "Urodela",
      notableFeature: "Neoteny & Perfect scar-free epimorphic regeneration"
    },
    keyFacts: [
      "Can regrow limbs, portions of their heart ventricles, spinal cord, and even parts of their forebrain.",
      "Practices neoteny: reaches sexual maturity while permanently retaining its larval aquatic form and feathery gills.",
      "Possesses a giant genome consisting of 32 billion base pairs—more than 10 times larger than the human genome.",
      "Studied globally as the premier model organism for regenerative medicine and wound repair."
    ],
    simulationType: "regeneration",
    audioNarration: "The axolotl, native to the ancient canals of Lake Xochimilco in Mexico, holds a rare regenerative superpower. When injured or missing a limb, its cells revert to a juvenile stem-cell state, assembling a blastema that meticulously rebuilds bone, muscle, and nerve pathways completely free of scar tissue."
  },
  {
    id: "space",
    category: "SPACE",
    title: "When you look at stars, you look into the past",
    excerpt: "Light travels at a finite speed, so distant objects appear as they were when their light began its journey.",
    symbol: "🌌",
    image: "/images/space.jpg",
    imageAlt: "A deep-field view filled with distant galaxies across the dark universe",
    imageCredit: "NASA, ESA, S. Beckwith (STScI) and the HUDF Team · Public domain",
    imageSource: "https://commons.wikimedia.org/wiki/File:Hubble_ultra_deep_field.jpg",
    read: 3,
    body: "Light takes time to travel across space. Sunlight takes about eight minutes to reach Earth; light from distant stars may have travelled for years or far longer before reaching our eyes. Astronomy is therefore also a way of looking back in time.",
    extendedBody: [
      "In empty vacuum, photons travel at exactly 299,792 kilometers per second. While this seems instantaneous on Earth, interstellar distances are vast beyond intuition. When you observe the Andromeda Galaxy (M31) on a clear night, the light entering your eye left that galaxy 2.5 million years ago, when early hominids were first crafting stone tools.",
      "Deep space observatories like Hubble and James Webb peer back more than 13.4 billion years, observing primordial proto-galaxies that formed just after the cosmic dawn."
    ],
    source: "https://science.nasa.gov/universe/",
    sourceName: "NASA Science — The Universe",
    fact: "Sunlight takes roughly eight minutes to reach Earth.",
    depthOrScale: "Distance: 13.4+ Billion Light-Years Lookback",
    scientificClassification: {
      domain: "Cosmology & Astrophysics",
      notableFeature: "Finite speed of light (c = 299,792 km/s)"
    },
    keyFacts: [
      "Sunlight is 8 minutes and 20 seconds old by the time it reaches Earth's surface.",
      "The nearest star system, Alpha Centauri, is seen as it existed 4.37 years ago.",
      "The Hubble Ultra Deep Field captures approximately 10,000 galaxies in a patch of sky the size of a pinhead held at arm's length.",
      "Cosmic expansion stretches traveling wavelengths, shifting primordial ultraviolet light into the infrared spectrum."
    ],
    simulationType: "lookback",
    audioNarration: "When you gaze upward into a starry night, you are peering into an immense chronological archive. Because light travels at roughly 300,000 kilometers per second, the stars you observe are not as they are right now, but snapshots of how they appeared millions or even billions of years in the cosmic past."
  },
  {
    id: "bees",
    category: "ANIMALS",
    title: "Bees can learn visual patterns",
    excerpt: "Research suggests bees can learn patterns and use experience while foraging.",
    symbol: "🐝",
    image: "/images/bees.jpg",
    imageAlt: "A honeybee collecting nectar from a flower in close-up",
    imageCredit: "Abirami Narayanan · CC BY-SA 4.0",
    imageLicense: "https://creativecommons.org/licenses/by-sa/4.0/",
    imageSource: "https://commons.wikimedia.org/wiki/File:HoneyBee_on_flower.jpg",
    read: 4,
    body: "Honeybees have small brains, yet experiments show they can learn associations and solve carefully designed tasks. Researchers have even tested how bees respond to numerical concepts, including the idea of zero. Such results should be interpreted within the specific experiment: they do not mean bees understand numbers exactly as humans do. Their learning abilities show how complex behaviour can emerge from very different nervous systems.",
    extendedBody: [
      "A honeybee's brain contains barely 1 million neurons—less than 0.001% of a human brain—yet worker bees execute the intricate 'waggle dance' inside complete pitch darkness, encoding both the azimuth direction relative to the sun and the flight distance to flower patches.",
      "Controlled laboratory experiments have demonstrated that bees can master rule-based concepts such as 'same versus different', perform elementary addition and subtraction, and categorize human artistic paintings by Monet and Picasso."
    ],
    source: "https://www.science.org/doi/10.1126/science.360.6393.1124",
    sourceName: "Science — Numerical ordering of zero in honey bees",
    fact: "Honeybees can learn tasks that reveal more learning flexibility than their size suggests.",
    depthOrScale: "Brain: ~960,000 Neurons (< 1 mm³ volume)",
    scientificClassification: {
      domain: "Eukaryota",
      phylum: "Arthropoda",
      class: "Insecta",
      order: "Hymenoptera",
      notableFeature: "Waggle dance vector communication & Numerical abstraction"
    },
    keyFacts: [
      "Can comprehend the mathematical concept of zero as an empty set less than one.",
      "Performs the waggle dance to communicate polar coordinates of forage sites up to 6 kilometers away.",
      "Can learn facial recognition patterns by assembling geometric arrangements of dots and contours.",
      "Possesses compound eyes sensitive to ultraviolet polarized sunlight, navigating even through dense overcast cloud cover."
    ],
    audioNarration: "Despite having a brain smaller than a sesame seed with under one million neurons, honeybees display astonishing cognitive flexibility. They can count items, comprehend abstract mathematical principles like the value of zero, and communicate precise geographic vectors to nestmates through their famous waggle dance."
  },
  {
    id: "deepsea",
    category: "DEEP SEA",
    title: "An ocean world that sunlight never reaches",
    excerpt: "The deep ocean hosts remarkable life adapted to cold, pressure and darkness.",
    symbol: "🌊",
    image: "/images/deepsea.jpg",
    imageAlt: "A deep-sea dragonfish with a bioluminescent light organ in the dark ocean",
    imageCredit: "Edith Widder / HBOI / NOAA · Public domain",
    imageSource: "https://commons.wikimedia.org/wiki/File:Photostomias.jpg",
    read: 5,
    body: "Sunlight does not reach much of the deep ocean, where animals face high pressure and often limited food. Some species have slow metabolisms; others use specialised senses or bioluminescence to find food, communicate or avoid predators. The deep sea is not uniformly lifeless or identical from place to place: conditions vary with depth, geography and available energy, and researchers continue to study its diverse ecosystems.",
    extendedBody: [
      "Below 1,000 meters—the Bathypelagic or Midnight Zone—solar illumination drops to zero. Hydrostatic pressure increases by approximately 1 atmosphere for every 10 meters of descent, reaching over 1,000 atmospheres in deep trenches.",
      "To prevent proteins and cellular membranes from solidifying under crushing pressure, abyssal creatures produce high concentrations of trimethylamine N-oxide (TMAO) and piezolyte barophilic chaperones. Many utilize bioluminescence not just for illumination, but for counter-illumination camouflage, blurring their silhouettes against dim downwelling surface light."
    ],
    source: "https://ocean.si.edu/ecosystems/deep-sea/deep-sea",
    sourceName: "Smithsonian Ocean — The Deep Sea",
    fact: "The deep ocean includes animals adapted to darkness, pressure and limited food.",
    depthOrScale: "Depth: 1,000m – 10,935m (Mariana Trench)",
    scientificClassification: {
      domain: "Abyssal & Hadal Oceanography",
      notableFeature: "Piezolyte TMAO stabilizers & Specialized photophores"
    },
    keyFacts: [
      "The average depth of the world's oceans is 3,682 meters (12,080 feet).",
      "Over 75% of deep-sea pelagic organisms are capable of producing their own biochemical light.",
      "Hydrothermal vent communities thrive completely independent of solar energy, fueled by sulfur-oxidizing chemosynthetic bacteria.",
      "Water temperatures in the bathypelagic abyss remain perpetually cold, hovering between 1°C and 4°C."
    ],
    audioNarration: "Covering the vast majority of our planet's living space, the deep ocean is a world plunged in perpetual midnight, extreme cold, and crushing hydrostatic pressure. Far from being a barren void, it hosts strange bioluminescent predators, towering hydrothermal vents, and organisms adapted to thrive under thousands of atmospheres."
  },
  {
    id: "mycelium",
    category: "MYCOLOGY",
    title: "The subterranean fungal network that connects entire forests",
    excerpt: "Underground fungal threads shuttle carbon, nutrients, and distress signals between distant trees.",
    symbol: "🍄",
    image: "/images/mycelium.jpg",
    imageAlt: "Forest floor mushrooms connected through subterranean mycelial hyphae",
    imageCredit: "Unsplash / Creative Commons",
    imageSource: "https://unsplash.com/photos/mushrooms-on-forest-soil",
    read: 4,
    body: "Beneath the forest floor lies a dense web of fungal threads called mycelium. Far more than passive soil dwellers, mycorrhizal fungi form symbiotic partnerships with tree roots, trading soil minerals like phosphorus and nitrogen for photosynthesized plant sugars.",
    extendedBody: [
      "Pioneering research led by forest ecologists demonstrates that these fungal networks act as an ecological conduit. When a mature 'mother tree' has access to abundant canopy sunlight, it can transfer carbon sugars through mycelial pathways to nourish shaded seedlings on the forest floor.",
      "Additionally, when trees are attacked by insect pests, they release chemical defense volatile compounds and transmit electrical and biochemical pulses along fungal channels, prompting neighboring trees to preemptively fortify their own defensive tannins."
    ],
    source: "https://www.nature.com/articles/35003180",
    sourceName: "Nature — Mycorrhizal networks in forest ecosystems",
    fact: "A single teaspoon of healthy forest soil can contain over a kilometer of microscopic fungal hyphae.",
    depthOrScale: "Subterranean: 0 – 30cm root rhizosphere",
    scientificClassification: {
      domain: "Eukaryota",
      phylum: "Basidiomycota / Glomeromycota",
      notableFeature: "Symbiotic bidirectional carbon-mineral transport"
    },
    keyFacts: [
      "Known colloquially as the 'Wood Wide Web' connecting distinct tree species.",
      "Trades phosphorus and nitrogen mined from rock crevices for plant sugars.",
      "Transmits warning signals that trigger pest defense responses in neighboring plants.",
      "Mycelial webs sequester immense amounts of terrestrial carbon into soil ecosystems."
    ],
    audioNarration: "Beneath the forest floor stretches a vast underground network of microscopic fungal threads called mycelium. Connecting the root systems of distant trees, this mycorrhizal lattice shares carbon sugars, delivers vital minerals, and relays chemical alerts when pests strike."
  },
  {
    id: "titan",
    category: "PLANETARY",
    title: "Methane lakes and frozen dunes of Saturn's moon Titan",
    excerpt: "The only celestial body besides Earth known to host stable liquid rivers and lakes on its surface.",
    symbol: "🪐",
    image: "/images/titan.jpg",
    imageAlt: "Saturn's moon Titan shrouded in its golden nitrogen hydrocarbon haze",
    imageCredit: "NASA / JPL-Caltech / Space Science Institute · Public domain",
    imageSource: "https://commons.wikimedia.org/wiki/File:Titan_in_true_color.jpg",
    read: 5,
    body: "Titan, the largest moon of Saturn, is one of the most chemically complex worlds in the solar system. Shrouded in a dense nitrogen-rich atmosphere with atmospheric pressure 50% greater than Earth's, Titan features rain, rivers, and sprawling seas—not of water, but of liquid methane and ethane.",
    extendedBody: [
      "At surface temperatures of -179°C (-290°F), water ice behaves like impenetrable granite rock, forming mountainous peaks and riverbeds. In place of hydrological water cycles, Titan has an active methane weather cycle, complete with seasonal downpours, flash floods, and cloud formations.",
      "Photochemical reactions high in its atmosphere break apart methane and nitrogen molecules to synthesize complex organic polymers called tholins. In 2028, NASA's Dragonfly rotorcraft mission will land on Titan to explore prebiotic chemistry across its dunes and impact craters."
    ],
    source: "https://science.nasa.gov/saturn/moons/titan/",
    sourceName: "NASA Solar System Exploration — Titan",
    fact: "Titan's atmosphere is 1.5 times denser than Earth's and composed of 95% nitrogen.",
    depthOrScale: "Distance: 1.4 Billion km from Earth",
    scientificClassification: {
      domain: "Astrobiology & Planetary Science",
      notableFeature: "Liquid hydrocarbon cycle & dense prebiotic atmosphere"
    },
    keyFacts: [
      "Surface gravity is low (14% of Earth's) and air density is high—a human strapped with wings could fly through muscle power alone.",
      "Seas like Kraken Mare span hundreds of thousands of square kilometers and reach depths over 300 meters.",
      "Beneath its rigid ice crust lies a deep internal ocean of liquid water and ammonia.",
      "Targeted by the upcoming NASA Dragonfly nuclear-powered octocopter mission."
    ],
    audioNarration: "Saturn's enigmatic moon Titan is the only celestial body in our solar system other than Earth with liquid lakes and seasonal rain on its surface. Instead of water, its rivers flow with freezing liquid methane and ethane across mountains made of rock-hard ice."
  },
  {
    id: "oklo",
    category: "GEOPHYSICS",
    title: "Earth's natural two-billion-year-old nuclear reactor",
    excerpt: "In Gabon, West Africa, natural uranium deposits once sustained self-moderated nuclear fission.",
    symbol: "💎",
    image: "/images/oklo.jpg",
    imageAlt: "Natural uranium ore deposit and geological strata specimen from Oklo, Gabon",
    imageCredit: "Geological Survey / Academic Archives · Public domain",
    imageSource: "https://commons.wikimedia.org/wiki/File:Pitchblende_Pechblende_Uraninite_Pribram_Tschechien.jpg",
    read: 4,
    body: "In 1972, French physicists examining uranium ore from the Oklo mine in Gabon discovered an anomaly: the concentration of uranium-235 was significantly lower than expected throughout the solar system. The explanation was astonishing: roughly two billion years ago, a natural nuclear fission reactor operated in the rock.",
    extendedBody: [
      "At that geological era, uranium-235 was far more abundant than today due to radioactive decay. Groundwater seeping through sandstone fissures served as a natural neutron moderator, slowing fast neutrons down so they could sustain a controlled chain reaction.",
      "As heat built up, boiling groundwater turned to steam and expanded, which reduced neutron moderation and safely shut the reaction down until the rock cooled and water flowed back in. This pulsed cycle operated spontaneously for hundreds of thousands of years without catastrophic meltdown."
    ],
    source: "https://www.scientificamerican.com/article/the-workings-of-an-ancient-nuclear-reactor/",
    sourceName: "Scientific American — The Workings of an Ancient Nuclear Reactor",
    fact: "Natural fission ran cyclically for an estimated 100,000 to 500,000 years in prehistoric Gabon.",
    depthOrScale: "Age: 1.7 Billion Years Before Present",
    scientificClassification: {
      domain: "Nuclear Physics & Paleogeology",
      notableFeature: "Pulsed thermal-neutron moderation via natural groundwater"
    },
    keyFacts: [
      "Generated an average thermal power output of roughly 100 kilowatts.",
      "Natural fissile isotope U-235 was ~3% abundant 2 billion years ago, similar to modern low-enriched nuclear fuel.",
      "Insoluble fission byproducts like ruthenium and technetium remained locked within surrounding clay minerals for billions of years.",
      "Provides crucial evidence for evaluating long-term geological nuclear waste containment."
    ],
    audioNarration: "Two billion years before humans split the atom, nature beat us to the punch. At Oklo in Gabon, unique combinations of uranium deposits and groundwater created a self-regulating nuclear fission reactor that operated smoothly for over a hundred thousand years."
  },
  {
    id: "bioluminescence",
    category: "CHEMISTRY",
    title: "Cold light: how creatures glow without generating heat",
    excerpt: "The chemical alchemy of luciferin and oxygen illuminates the darkest corners of the biosphere.",
    symbol: "✨",
    image: "/images/bioluminescence.jpg",
    imageAlt: "Bioluminescent organism glowing vivid electric blue along oceanic depths",
    imageCredit: "NOAA Ocean Photobiology Archives · Public domain",
    imageSource: "https://commons.wikimedia.org/wiki/File:Bioluminescence_in_waves.jpg",
    read: 4,
    body: "Unlike light bulbs or fire that produce light as a byproduct of intense heat, bioluminescence is near-100% efficient 'cold light'. When an enzyme called luciferase catalyzes the oxidation of a pigment molecule called luciferin, the excited reaction product releases energy almost entirely as visible photons.",
    extendedBody: [
      "In the oceans, bioluminescent flashes serve distinct functions: dinoflagellates glow when mechanically disturbed to act as a burglar alarm, revealing grazing predators to larger hunters.",
      "Deep sea anglerfish cultivate symbiotic luminescent bacteria within their dangling illicium lures, while the cookiecutter shark employs counter-illumination to match surface light and conceal its profile from below."
    ],
    source: "https://ocean.si.edu/ocean-life/fish/bioluminescence",
    sourceName: "Smithsonian Ocean — The Science of Bioluminescence",
    fact: "Over 90% of open-ocean animals between 200m and 1,000m depth use bioluminescence.",
    depthOrScale: "Wavelength: 470nm (Blue) & 680nm (Deep red)",
    scientificClassification: {
      domain: "Biochemistry & Photobiology",
      notableFeature: "Luciferin-luciferase catalytic chemiluminescence"
    },
    keyFacts: [
      "Almost zero heat is wasted—nearly 100% of chemical bond energy is converted into photons.",
      "Blue-green light travels furthest through saltwater, making it the universal bioluminescent hue.",
      "Some rare deep-sea predators like the Malacosteus dragonfish emit red light, functioning as an invisible infrared sniper scope.",
      "Widely adapted by medical researchers as non-invasive glowing reporter tags for cancer and genetic tracking."
    ],
    audioNarration: "Bioluminescence is cold light generated with virtually zero wasted heat. Through an enzymatic reaction between luciferin and luciferase, living creatures from fireflies to abyssal fish convert pure chemical energy directly into brilliant flashes of light."
  },
  {
    id: "crow-minds",
    category: "COGNITION",
    title: "Corvid minds and the puzzle-solving genius of crows",
    excerpt: "New Caledonian crows craft hooked tools, recall human faces, and plan multi-step actions.",
    symbol: "🦅",
    image: "/images/crows.jpg",
    imageAlt: "A raven displaying its intelligent gaze perched in nature",
    imageCredit: "Academic Ethology Archives · Creative Commons",
    imageSource: "https://commons.wikimedia.org/wiki/File:Corvus_corax_02.jpg",
    read: 4,
    body: "Crows, ravens, and magpies—members of the corvid family—possess some of the highest neuron densities in the animal kingdom. While avian brains lack a laminated mammalian neocortex, they evolved a densely packed, hyper-efficient structure called the nidopallium, enabling reasoning comparable to great apes.",
    extendedBody: [
      "New Caledonian crows in wild habitats actively sculpt complex tools from pandanus leaves, fashioning barbed hooks to spear grubs hidden inside tree crevices.",
      "Experiments demonstrate crows can solve the classical Aesop's fable water-displacement puzzle, dropping heavy stones into water tubes to raise floating food rewards, and can remember human faces associated with threat for over five years, even teaching the warning to their offspring."
    ],
    source: "https://www.nature.com/articles/nature08247",
    sourceName: "Nature — Crows make rational decisions using multi-step tools",
    fact: "Crows can recognize specific human faces for years and transmit threat warnings across generations.",
    depthOrScale: "Neuron density: ~300 million cortical-equivalent neurons",
    scientificClassification: {
      domain: "Eukaryota",
      phylum: "Chordata",
      class: "Aves",
      order: "Passeriformes",
      notableFeature: "Nidopallium hyper-density & Meta-tool construction"
    },
    keyFacts: [
      "Can comprehend casual displacement physics like water buoyancy and density.",
      "Understands meta-tool tasks: using a short stick to retrieve a longer stick to reach food.",
      "Possesses episodic-like memory, remembering what was hidden, where, and when it will spoil.",
      "Passes cultural tool-shaping traditions down through social learning within family groups."
    ],
    audioNarration: "Crows and ravens are avian geniuses. With brains packed with more neurons per gram than most mammals, corvids can craft hooked tools, solve multi-step physics puzzles, remember individual human faces for years, and share discoveries across generations."
  },
  {
    id: "quantum-vacuum",
    category: "QUANTUM",
    title: "Empty space is boiling with virtual particles",
    excerpt: "According to quantum field theory, a pure vacuum is never truly empty, but a frothing quantum foam.",
    symbol: "⚛️",
    image: "/images/quantum.jpg",
    imageAlt: "Computer visualization of quantum vacuum fluctuations and field energy in deep space",
    imageCredit: "Physics Visualization Archives · Academic fair use",
    imageSource: "https://commons.wikimedia.org/wiki/File:Quantum_fluctuations.png",
    read: 4,
    body: "If you remove every atom, molecule, and photon from a sealed chamber, classical intuition suggests the space is completely empty. In quantum physics, however, Heisenberg's uncertainty principle dictates that energy and time cannot both be zero simultaneously.",
    extendedBody: [
      "As a result, pairs of virtual particle-antiparticle pairs constantly pop into existence, interact for a fraction of a picosecond, and annihilate back into the vacuum state.",
      "This is not mere mathematical conjecture: the Casimir Effect, demonstrated in precision laboratories, shows that two uncharged metallic plates placed nanometers apart in vacuum are pushed together by the pressure of external virtual photon wavelengths exceeding the confined interior modes."
    ],
    source: "https://physics.aps.org/articles/v12/131",
    sourceName: "Physical Review Letters — Precision measurement of the Casimir effect",
    fact: "The Casimir effect proves that empty space exerts measurable physical pressure on real objects.",
    depthOrScale: "Timescale: 10⁻²¹ seconds (Subatomic vacuum jitter)",
    scientificClassification: {
      domain: "Quantum Field Theory & Particle Physics",
      notableFeature: "Casimir force & Zero-point quantum fluctuations"
    },
    keyFacts: [
      "Heisenberg's energy-time uncertainty relation: ΔE · Δt ≥ ℏ / 2.",
      "The Casimir force pulls microscopic mirrors together in an absolute vacuum.",
      "Hawking radiation arises when virtual particle pairs separate at a black hole's event horizon.",
      "Quantum vacuum fluctuations during the inflationary Big Bang seeded the cosmic web of galaxies we observe today."
    ],
    audioNarration: "In modern quantum mechanics, pure nothingness does not exist. Even in a perfect vacuum stripped of all matter, virtual particle-antiparticle pairs continuously materialize from the quantum vacuum, flicker for an instant, and annihilate back into the fundamental fields of the universe."
  }
];
