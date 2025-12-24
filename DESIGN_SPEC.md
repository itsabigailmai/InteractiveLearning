# Interactive Learning Platform - Design Specification

## Project Overview
An interactive learning website where students learn through acting out historical events, literature, and cultural stories. Students choose lessons, listen to AI-generated story snippets, act out scenes via webcam, and create a compiled video.

## Target Audience
- **Primary**: Middle school kids and below
- **Secondary**: High school students

## Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Deployment**: Vercel
- **AI Services**: 
  - OpenAI API (story generation)
  - ElevenLabs API (text-to-speech)
- **Storage**: Browser localStorage (demo purposes)
- **Styling**: Tailwind CSS

## Design Guidelines

### Visual Theme
- **Style**: Playful and colorful
- **Color Palette Recommendations**:
  - **Option 1 (Vibrant Learning)**: 
    - Primary: Bright Purple (#8B5CF6)
    - Secondary: Sunny Yellow (#FBBF24)
    - Accent: Ocean Blue (#3B82F6)
    - Success: Fresh Green (#10B981)
  - **Option 2 (Friendly Explorer)**:
    - Primary: Coral Pink (#F472B6)
    - Secondary: Turquoise (#14B8A6)
    - Accent: Warm Orange (#FB923C)
    - Success: Lime Green (#84CC16)
  - **Option 3 (Adventure Time)**:
    - Primary: Royal Blue (#6366F1)
    - Secondary: Magenta (#EC4899)
    - Accent: Amber (#F59E0B)
    - Success: Emerald (#059669)

- **Typography**: Rounded, friendly fonts (e.g., Poppins, Nunito, Comic Neue)
- **UI Elements**: Rounded corners, fun animations, playful icons
- **Tone**: Encouraging, fun, adventure-themed

## User Authentication
- **Type**: Simple smoke-and-mirrors authentication
- **Login**: 
  - Email: Any email format accepted
  - Password: Single hardcoded password via environment variable (`DEMO_PASSWORD`)
- **Session**: Stored in localStorage

## Content Library

### Organization Structure
Content organized by grade levels:

#### Elementary Grades (K-5)
- **Literature**: Simple fairy tales, fables, picture book stories
  - The Three Little Pigs
  - The Tortoise and the Hare
  - Where the Wild Things Are
  
- **History**: Basic historical moments
  - First Moon Landing (simplified)
  - The Wright Brothers' First Flight
  - Rosa Parks and the Bus

#### Middle School (6-8)
- **Literature**: Classic young adult and literature
  - Romeo and Juliet (key scenes)
  - The Outsiders
  - To Kill a Mockingbird (key scenes)
  
- **History**: Significant historical events
  - Moon Landing (detailed)
  - Declaration of Independence
  - Civil Rights Movement

- **Adventure Stories**:
  - Moby Dick (adventure scenes)
  - Treasure Island
  - The Call of the Wild

#### High School (9-12)
- **Literature**: Complex classics
  - Hamlet (key soliloquies)
  - The Great Gatsby
  - 1984
  
- **History**: In-depth historical moments
  - Kennedy's Moon Speech
  - Gettysburg Address
  - Historical debates and speeches

## User Flow

### 1. Login Screen
- Simple email + password input
- Colorful welcome message
- "Start Learning!" CTA button

### 2. Grade Selection
- Visual grade level cards (K-5, 6-8, 9-12)
- Preview of topics in each grade

### 3. Topic Selection
- Categorized by Literature, History, Science, Adventure
- Thumbnail cards with engaging images/icons
- Show estimated time (~5-10 minutes per lesson)

### 4. Story Generation
- Loading screen with fun animations
- "Creating your adventure..." message
- OpenAI generates story broken into 5-6 scenes
- Each scene ~30-60 seconds of dialogue

### 5. Audio Generation
- "Bringing your story to life..." message
- ElevenLabs converts each scene to audio
- Audio cached in browser

### 6. Scene Recording Flow (Per Scene)
**Scene Preparation:**
- Display scene number (e.g., "Scene 1 of 6")
- Show script text on screen
- "Listen First" button - plays audio
- "Practice" mode indicator
- "Ready to Record!" button

**Recording Phase:**
- 3-2-1 countdown animation
- Recording starts automatically
- Audio plays during recording (for acting along)
- Student acts out the scene
- Recording timer displayed
- "Stop Recording" button

**Review Phase:**
- Playback of recorded scene
- Two options:
  - "Keep This Take" → Move to next scene
  - "Try Again" → Retake same scene

### 7. Compilation Phase
- "Piecing together your masterpiece..." loading screen
- Combine all 6 scene recordings
- Overlay audio tracks
- Create single continuous video

### 8. Grading Phase (Smoke & Mirrors)
- Animated "AI Grading Engine" with fun progress bars
- Random delay (2-4 seconds)
- Always positive feedback:
  - "Outstanding Performance! ⭐⭐⭐⭐⭐"
  - "Great expression and timing!"
  - "You really brought the story to life!"
- Random score: 85-98 points

### 9. Results & Sharing
- Video player to watch final compilation
- Fun stats:
  - Total scenes: 6
  - Total time: XX:XX
  - Grade: A/A+
- "Share" button (smoke & mirrors - shows modal with shareable link)
- "Try Another Story" button
- "Download Video" button (saves from browser)

## Technical Implementation

### Data Storage (Browser localStorage)
```json
{
  "user": {
    "email": "student@example.com",
    "loginTime": "timestamp"
  },
  "projects": [
    {
      "id": "uuid",
      "title": "Romeo and Juliet",
      "grade": "6-8",
      "category": "Literature",
      "createdAt": "timestamp",
      "scenes": [
        {
          "sceneNumber": 1,
          "script": "Text of scene...",
          "audioBlob": "base64 or blob URL",
          "videoBlob": "base64 or blob URL",
          "attempts": 2
        }
      ],
      "finalVideo": "blob URL",
      "grade": 94,
      "completed": true
    }
  ]
}
```

### API Routes Structure
- `/api/generate-story` - OpenAI story generation
- `/api/text-to-speech` - ElevenLabs TTS
- `/api/auth/login` - Simple auth check

### Key Features
- **Responsive Design**: Works on desktop, tablet (mobile optional for demo)
- **Browser Compatibility**: Chrome/Edge (primary), Firefox/Safari (secondary)
- **Webcam Support**: MediaRecorder API
- **Audio Playback**: HTML5 Audio API
- **Video Editing**: Client-side video compilation using Web APIs

## Environment Variables Required
```
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
DEMO_PASSWORD=... (hardcoded password for demo)
```

## Future Enhancements (Out of Scope for Demo)
- Real database (PostgreSQL/MongoDB)
- Cloud video storage (S3/Cloudinary)
- Real user authentication
- Teacher dashboard
- Analytics and real grading
- Social sharing integration
- Mobile app

