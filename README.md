# Conway's Game of Life

A modern, responsive, and minimalist **Conway's Game of Life** web application built with pure HTML5, CSS3, and JavaScript.


## Features

- **Monotone & Minimalist Aesthetic**: Clean monochrome dark palette optimized for contrast, clarity, and elegance.
- **High-Performance Canvas**: Hardware-accelerated, high-DPI (Retina) canvas renderer supporting smooth cellular automaton simulation at 60 FPS.
- **Fully Responsive**: Seamlessly optimized for mobile smartphones, tablets, and desktop displays with touch-friendly gestures (tap/drag to draw or erase).
- **Flexible Playback & Speed**:
  - Default 0.5s (500 ms) per generation.
  - Granular speed control slider (from 20 ms up to 1000 ms) with generation speed display.
  - Step-by-step frame advance, play/pause, clear, and randomized pattern generation.
- **Customizable Grid Dimensions**:
  - Minimum size: **10 × 10**
  - Presets: 10×10, 20×20, 30×30, 50×50 (default), 80×80, 100×100, Fit Screen, or Custom (W × H up to 200×200).
  - Toroidal wrap-around mode (loops edges) or solid bounding borders.
- **Rich Preset Library (4 Categories)**:
  1. **Still Lifes**: Block, Beehive, Loaf, Boat, Tub, Pond.
  2. **Oscillators**: Blinker (P2), Toad (P2), Beacon (P2), Pulsar (P3), Kok's Galaxy (P8), Pentadecathlon (P15).
  3. **Spaceships**: Glider, Lightweight Spaceship (LWSS), Middleweight Spaceship (MWSS), Heavyweight Spaceship (HWSS).
  4. **Methuselahs & Puffers**: Diehard, Acorn, R-pentomino, Gosper Glider Gun, Puffer Train (Switch Engine).
- **Interactive Stamp Mode**: Select any preset pattern to preview a ghost outline following your cursor, rotate it 90°, or drop it in the center.
- **Internationalization (i18n)**:
  - Automatic detection of browser language (`ja` for Japanese, `en` for English).
  - Instant header language switcher (`JA` / `EN`) with persistence in `localStorage`.
- **Comprehensive Rules & Help Modal**:
  - Detailed visual explanation of the 4 fundamental rules (Birth, Survival, Underpopulation, Overpopulation).
  - Keyboard shortcuts table and touch instructions.

---

## Fundamental Rules of Life

Each cell on the 2D grid interacts with its 8 horizontal, vertical, and diagonal neighbors:

| Rule | Condition | Next Generation State |
| :--- | :--- | :--- |
| **1. Birth** | A dead cell with **exactly 3** live neighbors | **Becomes Alive** (■) |
| **2. Survival** | A live cell with **2 or 3** live neighbors | **Stays Alive** (■) |
| **3. Underpopulation** | A live cell with **fewer than 2** live neighbors | **Dies** (□) |
| **4. Overpopulation** | A live cell with **more than 3** live neighbors | **Dies** (□) |

---

## Controls & Keyboard Shortcuts

| Action | Mouse / Touch | Keyboard Shortcut |
| :--- | :--- | :--- |
| **Draw / Erase** | Click or drag on grid | - |
| **Play / Pause** | Play button | <kbd>Space</kbd> |
| **Next Step** | Step button | <kbd>S</kbd> / <kbd>→</kbd> |
| **Clear Board** | Clear button | <kbd>C</kbd> |
| **Randomize** | Random button | <kbd>R</kbd> |
| **Rotate Pattern** | Rotate button | <kbd>Z</kbd> / <kbd>R</kbd> (when placing) |
| **Cancel / Close** | Cancel / ✕ button | <kbd>Esc</kbd> |

---

## File Structure

```text
conway-life/
├── index.html       # Semantic application markup and layout
├── style.css        # Monotone styling and responsive layout
├── script.js        # Simulation engine, canvas renderer, presets & i18n
├── README.md        # English documentation
├── README.ja.md     # Japanese documentation
└── LICENSE          # MIT License
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
