export const categories = [
  {
    id: 'video',
    label: 'Video Editing',
    vehicles: [
      { id: 'video-editor', name: 'Social Video Editor', desc: 'Reels, shorts, hooks, captions, and pacing', rate: 2999, unit: 'project', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80' },
      { id: 'youtube-editor', name: 'YouTube Editor', desc: 'Long-form edits, thumbnails, chapters, and cleanup', rate: 6500, unit: 'video', image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80' },
      { id: 'podcast-editor', name: 'Podcast Editor', desc: 'Multi-cam podcasts, audio sync, intro/outro polish', rate: 4800, unit: 'episode', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand & Commercial',
    vehicles: [
      { id: 'brand-film', name: 'Brand Film Editor', desc: 'Campaign films, launches, product videos, case studies', rate: 12000, unit: 'project', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80' },
      { id: 'ad-editor', name: 'Performance Ad Editor', desc: 'Meta, YouTube, and marketplace ad variants', rate: 7500, unit: 'pack', image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80' },
      { id: 'motion-editor', name: 'Motion Graphics Editor', desc: 'Animated titles, product callouts, and visual polish', rate: 9000, unit: 'project', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80' },
    ],
  },
  {
    id: 'events',
    label: 'Events & Wedding',
    vehicles: [
      { id: 'wedding-editor', name: 'Wedding Film Editor', desc: 'Cinematic highlights, teasers, reels, and full films', rate: 15000, unit: 'event', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
      { id: 'event-recap', name: 'Event Recap Editor', desc: 'Fast turnaround recap films for events and conferences', rate: 8500, unit: 'event', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80' },
    ],
  },
  {
    id: 'post',
    label: 'Post Production',
    vehicles: [
      { id: 'colorist', name: 'Colorist', desc: 'Color correction, grade matching, LUTs, and finishing', rate: 7000, unit: 'project', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80' },
      { id: 'sound-editor', name: 'Sound Editor', desc: 'Noise cleanup, mixing, music balance, and mastering', rate: 5500, unit: 'project', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80' },
      { id: 'vfx-cleanup', name: 'VFX Cleanup Editor', desc: 'Object removal, screen replacements, and visual fixes', rate: 11000, unit: 'project', image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=600&q=80' },
    ],
  },
];

export const allVehicles = categories.flatMap(c =>
  c.vehicles.map(v => ({ ...v, category: c.id, categoryLabel: c.label }))
);
