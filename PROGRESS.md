# Interactive Learning Platform - Technical Progress Document

**Last Updated:** December 2024  
**Status:** Recording Phase Complete, Ready for Results/Compilation Phase

---

## 🎯 Project Overview

An interactive learning platform where students (primarily middle school and below) learn by acting out stories from literature, history, and adventures. The workflow:

1. Student selects grade level (K-5, 6-8, 9-12)
2. Chooses a lesson from the content library
3. Views pre-generated script with 5 scenes (~20 seconds each)
4. Listens to ElevenLabs narration (pre-generated MP3s)
5. Records themselves acting out each scene with webcam
6. Reviews and retakes as needed
7. Final compilation of all scenes (NOT YET IMPLEMENTED)
8. AI grading and results (NOT YET IMPLEMENTED)

---

## ✅ What's Been Completed

### 1. **Authentication System** (`app/login/page.tsx`)
- Simple email + hardcoded password (`NEXT_PUBLIC_DEMO_PASSWORD=learningisfun123`)
- Stores user in localStorage
- All pages check for auth and redirect if not logged in

### 2. **Grade Selection** (`app/select-grade/page.tsx`)
- Three grade levels: K-5, 6-8, 9-12
- Playful cards with animations (subtle, not bouncy)
- Progress tracking

### 3. **Topic Selection** (`app/select-topic/page.tsx`)
- Category filters (All, Literature, History, Adventure, Science)
- Lesson cards with emoji, title, description, duration
- Preview audio button for each scene (simple play/pause)

### 4. **Content Library** (`lib/lessons.ts` + `lib/generated-scripts.ts`)

**Lessons Available:**
- **3 complete scripts** with pre-generated content:
  - `three-pigs` - The Three Little Pigs (K-5)
  - `romeo-juliet` - Romeo and Juliet (6-8)
  - `moon-landing-kids` - First Moon Landing (K-5)

**Script Structure:**
- Each lesson has 5 scenes
- Each scene is ~20 seconds of narration
- Scripts include ElevenLabs audio direction tags: `[cheerfully]`, `[dramatically]`, `[whispers]`, etc.
- Audio tags are hidden in the UI using `removeAudioTags()` function
- Original scripts with tags preserved for audio generation

**Audio Files:**
- Stored in `public/audio/{lesson-id}/scene-{number}.mp3`
- Must be pre-generated using ElevenLabs API
- Path helper: `getAudioPath(lessonId, sceneNumber)`

### 5. **Lesson Preview** (`app/lesson/[id]/page.tsx`)
- Shows all 5 scenes with scripts
- Custom audio player with play/pause buttons for each scene
- "Start Acting! 🎬" button to begin recording
- Scene metadata (duration, title)

### 6. **Recording Interface** (`app/lesson/[id]/record/page.tsx`)

**Three Phases Implemented:**

#### **Setup Phase:**
- Requests webcam/microphone permission
- Shows live webcam preview (mirrored like a mirror)
- Custom audio player (`CustomAudioPlayer.tsx`) with full controls:
  - Play/pause button
  - Draggable progress bar
  - Volume control
  - Time display
- "Ready to Record!" button to start countdown

#### **Countdown Phase:**
- 3-2-1 animated countdown
- Large numbers with smooth animations
- Auto-starts recording after countdown

#### **Recording Phase:**
- Live webcam preview continues
- Red "REC" indicator with timer (MM:SS)
- Audio plays automatically during recording
- Student acts along with the narration
- "Stop Recording" button
- Timer counts accurately using `Date.now()` to avoid drift

#### **Review Phase:**
- Recorded video playback with full controls
- Two action buttons:
  - "Try Again" - Retake the scene
  - "Keep This Take" - Move to next scene or finish

**Current Scene Progression:**
- Tracks `currentScene` (1-5)
- Progress bar shows completion
- After scene 5, attempts to navigate to `/lesson/[id]/results` (NOT YET BUILT)

---

## 🎨 Design System

### **Color Palette (Vibrant Learning):**
- Primary: Purple (#8B5CF6)
- Secondary: Yellow (#FBBF24)
- Accent: Blue (#3B82F6)
- Success: Green (#10B981)
- Gradient: Purple-to-Pink for important actions

### **Typography:**
- Font: Fredoka (rounded, friendly, kid-appropriate)
- Loaded via Google Fonts in `app/layout.tsx`

### **UI Components** (`components/ui/`)

#### **Button.tsx:**
- Variants: primary, secondary, accent, success, danger
- Sizes: sm, md, lg, xl
- Includes `cursor-pointer` for all buttons
- Subtle hover animations (scale: 1.02)

#### **Card.tsx:**
- Rounded white cards with shadow
- Hover effect: lifts up 4px
- Used throughout for content containers

#### **Input.tsx:**
- Rounded inputs with labels
- Error state support

#### **CustomAudioPlayer.tsx:**
- Circular play/pause button (purple-to-pink gradient)
- Custom styled progress bar with draggable knob
- Volume control with custom slider
- Time display (current/total)
- Click progress bar to jump to position

---

## 🗄️ Data Storage

### **Browser localStorage Structure:**

```typescript
{
  user: {
    email: string,
    loginTime: string
  },
  projects: [
    {
      id: string,
      title: string,
      grade: 'K-5' | '6-8' | '9-12',
      category: string,
      createdAt: string,
      scenes: [
        {
          sceneNumber: number,
          script: string,
          audioUrl?: string,
          videoUrl?: string,
          attempts: number
        }
      ],
      finalVideo?: blob URL,
      gradeScore?: number,
      completed: boolean
    }
  ]
}
```

**Storage Functions** (`lib/storage.ts`):
- `getUser()`, `saveUser(email)`
- `saveProject(project)`, `getProject(id)`
- `setCurrentProject(id)`, `getCurrentProject()`

**Note:** Recording blobs are currently NOT saved to localStorage. This needs to be implemented for the compilation phase.

---

## ⚠️ Known Issues & Quirks

### **Recording Behavior:**
1. **Webcam stream persists:** The webcam stream stays active after stopping recording. This is intentional per user preference - keeps camera ready for next scene.
2. **No blob storage:** Recorded video blobs are created but not saved. Each recording is lost when moving to next scene.
3. **Timer cleanup:** Timer intervals are properly cleared in `handleRetake()` and `handleKeep()` to prevent double-counting.

### **Video Element Behavior:**
- Live preview uses `videoRef` with `srcObject = stream`
- Review phase shows recorded video with `src = blobURL`
- Video element does NOT remount between phases (no `key` prop) to maintain webcam connection
- `object-cover` for live preview (fills frame)
- `object-contain` for recorded playback (shows full video)

### **Audio:**
- Scene audio plays automatically during recording via `audioRef`
- Custom audio player only shown during setup phase
- Audio resets to 0 when stopped

---

## 🚧 Not Yet Implemented

### **1. Video Compilation Phase** (`app/lesson/[id]/results/page.tsx`)
**Needs to:**
- Retrieve all 5 recorded video blobs (need to save them first!)
- Combine videos sequentially
- Overlay audio tracks for each scene
- Create single continuous video using client-side video editing
- Options: Canvas API, ffmpeg.wasm, or MediaStream Recording API

**Suggested approach:**
1. Store video blobs in localStorage as base64 or blob URLs during recording
2. In compilation, create a canvas element
3. Draw each video frame-by-frame with corresponding audio
4. Record the canvas output as final video

### **2. AI Grading Phase** (Smoke & Mirrors)
- Animated "AI Grading Engine" with progress bars
- Random delay (2-4 seconds)
- Generate positive feedback:
  - "Outstanding Performance! ⭐⭐⭐⭐⭐"
  - "Great expression and timing!"
  - Random score: 85-98
- Save grade to project in localStorage

### **3. Results & Sharing Page**
- Video player for final compilation
- Stats display (total scenes, time, grade)
- "Download Video" button (save blob as file)
- "Share" button (smoke & mirrors - show modal with fake shareable link)
- "Try Another Story" button (navigate back to topic selection)

### **4. Additional Lessons**
Only 3 lessons have complete scripts + audio. Need to generate:
- More K-5 lessons (Tortoise & Hare, Wild Things, Wright Brothers, Rosa Parks)
- More 6-8 lessons (Outsiders, Mockingbird, Declaration, Civil Rights, Moby Dick, Treasure Island)
- All 9-12 lessons (Hamlet, Gatsby, 1984, Kennedy Speech, Gettysburg, Call of Wild)

**Generation process per lesson:**
1. Take script from `lib/generated-scripts.ts`
2. Send to ElevenLabs with audio tags
3. Save as `public/audio/{lesson-id}/scene-{X}.mp3`
4. Add lesson to `GENERATED_SCRIPTS` object

---

## 📁 File Structure

```
interactive-learning/
├── app/
│   ├── login/page.tsx              ✅ Login page
│   ├── select-grade/page.tsx       ✅ Grade selection
│   ├── select-topic/page.tsx       ✅ Topic selection  
│   ├── lesson/
│   │   └── [id]/
│   │       ├── page.tsx            ✅ Lesson preview
│   │       ├── record/page.tsx     ✅ Recording interface
│   │       └── results/page.tsx    ❌ NOT IMPLEMENTED
│   ├── layout.tsx                  ✅ Root layout with Fredoka font
│   ├── page.tsx                    ✅ Redirect logic
│   └── globals.css                 ✅ Playful theme with purple/pink/yellow
├── components/ui/
│   ├── Button.tsx                  ✅ Playful button component
│   ├── Card.tsx                    ✅ Card container
│   ├── Input.tsx                   ✅ Form input
│   └── CustomAudioPlayer.tsx       ✅ Custom audio player
├── lib/
│   ├── lessons.ts                  ✅ Lesson metadata (20+ lessons)
│   ├── generated-scripts.ts        ✅ Pre-generated scripts (3 complete)
│   └── storage.ts                  ✅ localStorage utilities
├── public/audio/
│   ├── three-pigs/                 ✅ scene-1.mp3 through scene-5.mp3
│   ├── romeo-juliet/               ✅ scene-1.mp3 through scene-5.mp3
│   └── moon-landing-kids/          ✅ scene-1.mp3 through scene-5.mp3
└── DESIGN_SPEC.md                  ✅ Original design document
```

---

## 🔑 Environment Variables

Required in `.env.local`:
```env
OPENAI_API_KEY=sk-...                    # For future story generation
ELEVENLABS_API_KEY=...                   # For future audio generation
NEXT_PUBLIC_DEMO_PASSWORD=learningisfun123
```

---

## 🐛 Common Debugging Tips

### **Webcam Issues:**
- Check browser console for permission errors
- `streamRef.current` should contain MediaStream
- `videoRef.current.srcObject` should equal `streamRef.current` during live preview
- Camera light stays on because stream is not stopped (intentional)

### **Timer Issues:**
- If timer counts weirdly, check if multiple intervals are running
- Use `clearInterval()` in both `handleRetake()` and `handleKeep()`
- Timer uses `Date.now()` calculation, not state increment

### **Video Playback Issues:**
- During review, `videoRef` should NOT have `srcObject`, only `src` with blob URL
- Check if `recordedUrl` is set correctly in MediaRecorder `onstop` handler
- Verify blob is created from `chunksRef.current`

### **Audio Not Playing:**
- Check browser console for autoplay restrictions
- Audio element needs `autoPlay` or manual `.play()` call
- ElevenLabs MP3 files must exist in `public/audio/` folder

---

## 🚀 Next Steps for Implementation

### **Priority 1: Save Recorded Videos**
Modify `app/lesson/[id]/record/page.tsx`:

```typescript
// In mediaRecorder.onstop handler:
const blob = new Blob(chunksRef.current, { type: 'video/webm' });
const url = URL.createObjectURL(blob);

// Save to localStorage
const currentProject = getCurrentProject() || createNewProject();
currentProject.scenes[currentScene - 1] = {
  sceneNumber: currentScene,
  script: currentSceneData.script,
  videoBlob: blob, // or convert to base64
  audioUrl: getAudioPath(lessonId, currentScene),
  attempts: (currentProject.scenes[currentScene - 1]?.attempts || 0) + 1
};
saveProject(currentProject);
```

### **Priority 2: Create Results/Compilation Page**
Create `app/lesson/[id]/results/page.tsx`:
1. Retrieve project from localStorage
2. Extract all video blobs
3. Use ffmpeg.wasm or Canvas API to combine
4. Show loading animation during compilation
5. Display final video with player

### **Priority 3: Add Grading UI**
- Random delay with animated progress
- Positive feedback generation
- Save score to project

### **Priority 4: Generate More Content**
- Script more lessons
- Generate audio files with ElevenLabs
- Add to `generated-scripts.ts`

---

## 💡 Design Decisions & Rationale

### **Why 20-second scenes?**
Originally 45-75 seconds, but too long for kids to act out. 20 seconds is manageable and keeps engagement high.

### **Why remove audio tags in UI?**
Tags like `[cheerfully]` are for ElevenLabs processing, not for kids to read. Cleaned text is more natural.

### **Why Fredoka font?**
Poppins was too professional. Fredoka is rounded, bubbly, and perfect for the target age group (middle school and below).

### **Why not stop camera between scenes?**
User preference - keeps camera ready and avoids repeated permission prompts. Makes workflow smoother.

### **Why localStorage instead of database?**
This is a demo/MVP. Real implementation would use PostgreSQL/MongoDB with cloud storage for videos.

---

## 📞 Contact & Handoff Notes

**Current State:** Recording works perfectly. Timer counts correctly. Audio plays during recording. Students can retake unlimited times and progress through all 5 scenes.

**Blocker:** Need to implement video storage and compilation before this can be a complete working demo.

**Quick Win:** If you just want to demo the recording, it works great! Students can record all 5 scenes (though they're not saved).

**Production Considerations:**
- Video blobs can be large (10-50MB per scene)
- localStorage has ~10MB limit, so base64 storage won't work for all scenes
- Need cloud storage (S3/Cloudinary) for production
- Consider IndexedDB for client-side blob storage as intermediate solution

---

**Good luck, next AI agent! You got this! 🚀**

