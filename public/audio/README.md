# Audio Files Directory

This folder contains the generated audio files for each lesson's scenes.

## Structure

Each lesson has its own subfolder:
- `three-pigs/` - The Three Little Pigs audio files
- `romeo-juliet/` - Romeo and Juliet audio files
- `moon-landing-kids/` - First Moon Landing audio files

## File Naming Convention

Audio files should be named: `scene-{number}.mp3`

Example for The Three Little Pigs:
- `scene-1.mp3` - Building the Houses
- `scene-2.mp3` - The Wolf Arrives
- `scene-3.mp3` - Huffing and Puffing
- `scene-4.mp3` - The Brick House Stands Strong
- `scene-5.mp3` - The Wolf Gives Up

## Usage

Place your ElevenLabs generated MP3 files in the appropriate lesson folder with the correct naming convention. The app will automatically load them when students start acting out the scenes.

## Audio Generation

To generate audio files:
1. Take each scene's script from `lib/generated-scripts.ts`
2. Send to ElevenLabs API with the audio tags included
3. Save the returned MP3 with the naming convention above
4. Place in the correct lesson folder

Example paths:
- `/audio/three-pigs/scene-1.mp3`
- `/audio/romeo-juliet/scene-3.mp3`
- `/audio/moon-landing-kids/scene-5.mp3`

