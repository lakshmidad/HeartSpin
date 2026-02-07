# HeartSpin - 3D Love Confession

An interactive 3D web experience to share personalized romantic messages.

## Features
- 💖 **Interactive 3D Heart:** A beautiful, rotating heart that responds to touch.
- 💌 **Secret Messages:** Create and share encoded confession links.
- 🎵 **Atmospheric Audio:** Toggleable romantic background music.
- ✨ **Particle Effects:** Floating heart particles for a magical feel.

## How to Run

1. **Open the Folder:** Navigate to the folder where you saved the files.
2. **Start a Local Server:**
   You need a local server to run this because of browser security policies regarding ES modules and textures.
   
   If you have Python installed (which you likely do):
   ```bash
   python -m http.server 8000
   ```
   
   If you have Node.js:
   ```bash
   npx serve .
   ```

3. **Open in Browser:**
   Go to `http://localhost:8000` in your web browser.

4. **Create & Share:**
   - Type your message and name.
   - Click "Create Magic Link".
   - Copy the link and send it to your special someone!

## Customization
- **Music:** Replace the audio source in `index.html` with your own mp3 file.
- **Colors:** Edit the CSS variables in `style.css` to change the theme.
