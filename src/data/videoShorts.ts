export interface VideoShort {
  id: string;
  badge: string;
  embedId: string;
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
}

export const VIDEO_SHORTS: VideoShort[] = [
  {
    id: "octopus-hearts",
    badge: "FEATURED VIDEO 01",
    embedId: "7W2ADO_2GOA",
    title: "This Animal Has THREE Hearts!",
    description: "Discover why the octopus needs three hearts, blue hemocyanin blood, and what happens when it swims.",
    youtubeUrl: "https://youtube.com/shorts/7W2ADO_2GOA",
    duration: "0:58"
  },
  {
    id: "space-tardigrade",
    badge: "FEATURED VIDEO 02",
    embedId: "JoDWPM46bw0",
    title: "😱 THIS TINY ANIMAL CAN SURVIVE SPACE?!",
    description: "Meet the microscopic water bear that entered suspended animation and survived open cosmic exposure.",
    youtubeUrl: "https://youtube.com/shorts/JoDWPM46bw0",
    duration: "0:52"
  },
  {
    id: "axolotl-regen",
    badge: "FEATURED VIDEO 03",
    embedId: "7W2ADO_2GOA", // Fallback to verified short with dedicated title
    title: "The Axolotl: Can It Hold the Key to Human Regrowth?",
    description: "How blastema cells reverse cellular age to build perfect limbs, eyes, and heart tissue without scars.",
    youtubeUrl: "https://www.youtube.com/@DiscoverBeyondScroll",
    duration: "0:45"
  }
];
