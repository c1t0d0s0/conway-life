/**
 * Conway's Game of Life (ライフゲーム)
 * Complete Application Logic, Canvas Rendering, Presets, and i18n
 */

(() => {
    'use strict';

    // =========================================================================
    // 1. Internationalization (i18n) Data & Logic
    // =========================================================================
    const I18N = {
        ja: {
            appTitle: "ライフゲーム",
            statGen: "世代:",
            statPop: "生存セル:",
            presetsBtn: "プリセット",
            placementMode: "配置モード:",
            btnRotate: "回転 (90°)",
            btnPlaceCenter: "中央に配置",
            btnCancel: "キャンセル",
            canvasHint: "クリックまたはドラッグしてセルを描画",
            btnPlay: "再生",
            btnPause: "一時停止",
            btnStep: "1世代進む",
            btnRandom: "ランダム",
            btnClear: "全消去",
            labelSpeed: "速度:",
            labelSize: "盤面:",
            sizeFit: "画面にフィット",
            sizeCustom: "カスタム指定...",
            toggleWrap: "ループ: ON",
            toggleWrapOn: "ループ: ON",
            toggleWrapOff: "ループ: OFF",
            toggleGrid: "枠線: ON",
            toggleGridOn: "枠線: ON",
            toggleGridOff: "枠線: OFF",
            presetsTitle: "プリセットパターン",
            catStillLife: "固定物体",
            catOscillator: "振動子",
            catSpaceship: "移動物体",
            catMethuselah: "繁殖型",
            placeAction: "配置",
            helpTitle: "ライフゲームの基本ルール & 使い方",
            rulesHeading: "■ 基本の4ルール",
            rulesIntro: "ライフゲームは、各セルの周囲8マス（隣接セル）の生存数によって、次の世代の生死が決まるシミュレーションです。",
            rule1Title: "誕生 (Birth)",
            rule1Desc: "死んでいるセルに隣接する生きたセルが<strong>ちょうど3つ</strong>あれば、次の世代で新しい生命が誕生します。",
            rule1Arrow: "↓ 次世代: 誕生 ■",
            rule2Title: "生存 (Survival)",
            rule2Desc: "生きているセルに隣接する生きたセルが<strong>2つまたは3つ</strong>あれば、次の世代でも生存し続けます。",
            rule2Arrow: "↓ 次世代: 生存 ■",
            rule3Title: "過疎 (Underpopulation)",
            rule3Desc: "生きているセルに隣接する生きたセルが<strong>1つ以下</strong>の場合、過疎により次の世代で死滅します。",
            rule3Arrow: "↓ 次世代: 死亡 □",
            rule4Title: "過密 (Overpopulation)",
            rule4Desc: "生きているセルに隣接する生きたセルが<strong>4つ以上</strong>ある場合、過密により次の世代で死滅します。",
            rule4Arrow: "↓ 次世代: 死亡 □",
            helpControlsHeading: "■ 操作方法 & ショートカット",
            thAction: "操作 / 機能",
            thMethod: "マウス・タッチ",
            thKey: "ショートカットキー",
            shCellDraw: "セルの描画 / 消去",
            shMouseDraw: "クリックまたはドラッグ",
            shPlayPause: "再生 / 一時停止",
            shPlayBtn: "再生ボタン",
            shStep: "1世代進む (コマ送り)",
            shStepBtn: "進むボタン",
            shClear: "盤面を全消去",
            shClearBtn: "全消去ボタン",
            shRandom: "ランダム生成",
            shRandomBtn: "ランダムボタン",
            shRotate: "パターンの回転",
            shRotateBtn: "回転ボタン",
            shCancel: "選択解除 / 閉じる",
            shCancelBtn: "キャンセル / ✕",
            btnUnderstand: "閉じる",
            customSizePrompt: "盤面のサイズを入力してください（幅 x 高さ、最小10、最大200）\n例: 60x60 または 80x50",
            invalidCustomSize: "無効なサイズです。10〜200の範囲で指定してください。"
        },
        en: {
            appTitle: "Conway's Game of Life",
            statGen: "Gen:",
            statPop: "Pop:",
            presetsBtn: "Presets",
            placementMode: "Stamp Mode:",
            btnRotate: "Rotate (90°)",
            btnPlaceCenter: "Place at Center",
            btnCancel: "Cancel",
            canvasHint: "Click or drag on the board to draw cells",
            btnPlay: "Play",
            btnPause: "Pause",
            btnStep: "Step",
            btnRandom: "Random",
            btnClear: "Clear",
            labelSpeed: "Speed:",
            labelSize: "Grid:",
            sizeFit: "Fit Screen",
            sizeCustom: "Custom Size...",
            toggleWrap: "Wrap: ON",
            toggleWrapOn: "Wrap: ON",
            toggleWrapOff: "Wrap: OFF",
            toggleGrid: "Grid: ON",
            toggleGridOn: "Grid: ON",
            toggleGridOff: "Grid: OFF",
            presetsTitle: "Preset Patterns",
            catStillLife: "Still Lifes",
            catOscillator: "Oscillators",
            catSpaceship: "Spaceships",
            catMethuselah: "Methuselahs",
            placeAction: "Stamp",
            helpTitle: "Conway's Game of Life - Rules & Controls",
            rulesHeading: "■ The 4 Fundamental Rules",
            rulesIntro: "The universe of the Game of Life is a two-dimensional grid of square cells, each interacting with its 8 horizontal, vertical, and diagonal neighbors.",
            rule1Title: "1. Birth",
            rule1Desc: "Any dead cell with <strong>exactly three</strong> live neighbors becomes a live cell as if by reproduction.",
            rule1Arrow: "↓ Next Gen: Born ■",
            rule2Title: "2. Survival",
            rule2Desc: "Any live cell with <strong>two or three</strong> live neighbors lives on to the next generation.",
            rule2Arrow: "↓ Next Gen: Survives ■",
            rule3Title: "3. Underpopulation",
            rule3Desc: "Any live cell with <strong>fewer than two</strong> live neighbors dies, as if by underpopulation.",
            rule3Arrow: "↓ Next Gen: Dies □",
            rule4Title: "4. Overpopulation",
            rule4Desc: "Any live cell with <strong>more than three</strong> live neighbors dies, as if by overpopulation.",
            rule4Arrow: "↓ Next Gen: Dies □",
            helpControlsHeading: "■ Controls & Shortcuts",
            thAction: "Action / Feature",
            thMethod: "Mouse / Touch",
            thKey: "Shortcut",
            shCellDraw: "Draw / Erase cells",
            shMouseDraw: "Click or drag",
            shPlayPause: "Play / Pause",
            shPlayBtn: "Play button",
            shStep: "Advance 1 Generation",
            shStepBtn: "Step button",
            shClear: "Clear board",
            shClearBtn: "Clear button",
            shRandom: "Randomize board",
            shRandomBtn: "Random button",
            shRotate: "Rotate pattern",
            shRotateBtn: "Rotate button",
            shCancel: "Cancel / Close",
            shCancelBtn: "Cancel / ✕",
            btnUnderstand: "Got it",
            customSizePrompt: "Enter board dimensions (Width x Height, min 10, max 200)\nExample: 60x60 or 80x50",
            invalidCustomSize: "Invalid dimensions. Please enter numbers between 10 and 200."
        }
    };

    // Auto-detect browser language
    let currentLang = (() => {
        const saved = localStorage.getItem('conway_lang');
        if (saved && (saved === 'ja' || saved === 'en')) return saved;
        const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        return browserLang.startsWith('ja') ? 'ja' : 'en';
    })();

    // =========================================================================
    // 2. Preset Patterns Catalog
    // =========================================================================
    const PRESETS = {
        still_life: [
            {
                id: "block",
                name: { ja: "ブロック", en: "Block" },
                desc: { ja: "最も小さく基本的な2x2の固定物体。", en: "The smallest and most basic 2x2 still life." },
                pattern: [
                    [1, 1],
                    [1, 1]
                ]
            },
            {
                id: "beehive",
                name: { ja: "蜂の巣", en: "Beehive" },
                desc: { ja: "自然発生率が2番目に高い代表的な固定物体。", en: "The second most common still life pattern." },
                pattern: [
                    [0, 1, 1, 0],
                    [1, 0, 0, 1],
                    [0, 1, 1, 0]
                ]
            },
            {
                id: "loaf",
                name: { ja: "パン", en: "Loaf" },
                desc: { ja: "パンの形をした4x4の美しい固定物体。", en: "A loaf-shaped 4x4 still life." },
                pattern: [
                    [0, 1, 1, 0],
                    [1, 0, 0, 1],
                    [0, 1, 0, 1],
                    [0, 0, 1, 0]
                ]
            },
            {
                id: "boat",
                name: { ja: "ボート", en: "Boat" },
                desc: { ja: "蜂の巣やタブと並ぶ定番の5セル固定物体。", en: "A standard 5-cell still life." },
                pattern: [
                    [1, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0]
                ]
            },
            {
                id: "tub",
                name: { ja: "タブ (風呂桶)", en: "Tub" },
                desc: { ja: "中心に空洞を持つ対称的な4セル固定物体。", en: "A symmetrical 4-cell still life with a hollow center." },
                pattern: [
                    [0, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0]
                ]
            },
            {
                id: "pond",
                name: { ja: "池", en: "Pond" },
                desc: { ja: "円環状に対称な8セルの固定物体。", en: "A circular 8-cell still life pattern." },
                pattern: [
                    [0, 1, 1, 0],
                    [1, 0, 0, 1],
                    [1, 0, 0, 1],
                    [0, 1, 1, 0]
                ]
            }
        ],
        oscillator: [
            {
                id: "blinker",
                name: { ja: "ブリンカー", en: "Blinker" },
                desc: { ja: "最も小さく代表的な周期2の振動子。", en: "The smallest and most fundamental period-2 oscillator." },
                pattern: [
                    [1, 1, 1]
                ]
            },
            {
                id: "toad",
                name: { ja: "ヒキガエル", en: "Toad" },
                desc: { ja: "周期2で手足を動かすように振動するパターン。", en: "A period-2 oscillator resembling a croaking toad." },
                pattern: [
                    [0, 1, 1, 1],
                    [1, 1, 1, 0]
                ]
            },
            {
                id: "beacon",
                name: { ja: "ビーコン (灯台)", en: "Beacon" },
                desc: { ja: "2つのブロックが点滅を繰り返す周期2の振動子。", en: "A period-2 oscillator consisting of two touching blocks." },
                pattern: [
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 1, 1],
                    [0, 0, 1, 1]
                ]
            },
            {
                id: "pulsar",
                name: { ja: "パルサー", en: "Pulsar" },
                desc: { ja: "星のように大きく拍動する有名な周期3の振動子。", en: "A large, pulsating period-3 oscillator." },
                pattern: [
                    [0,0,1,1,1,0,0,0,1,1,1,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,0,0,0,0,1,0,1,0,0,0,0,1],
                    [1,0,0,0,0,1,0,1,0,0,0,0,1],
                    [1,0,0,0,0,1,0,1,0,0,0,0,1],
                    [0,0,1,1,1,0,0,0,1,1,1,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,1,1,1,0,0,0,1,1,1,0,0],
                    [1,0,0,0,0,1,0,1,0,0,0,0,1],
                    [1,0,0,0,0,1,0,1,0,0,0,0,1],
                    [1,0,0,0,0,1,0,1,0,0,0,0,1],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,1,1,1,0,0,0,1,1,1,0,0]
                ]
            },
            {
                id: "galaxy",
                name: { ja: "銀河 (コックの銀河)", en: "Kok's Galaxy" },
                desc: { ja: "渦巻銀河のように8周期で回転する美しい振動子。", en: "A period-8 oscillator that rotates like a spiral galaxy." },
                pattern: [
                    [1, 1, 1, 1, 1, 1, 0, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 0, 1, 1, 1, 1, 1, 1]
                ]
            },
            {
                id: "pentadecathlon",
                name: { ja: "ペンタデカスロン", en: "Pentadecathlon" },
                desc: { ja: "周期15を持ち、グライダーを反転させる性質を持つ振動子。", en: "A period-15 oscillator capable of reflecting gliders." },
                pattern: [
                    [1, 1, 1],
                    [1, 0, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 0, 1],
                    [1, 1, 1]
                ]
            }
        ],
        spaceship: [
            {
                id: "glider",
                name: { ja: "グライダー", en: "Glider" },
                desc: { ja: "ライフゲームの象徴。4世代で斜め1マス進む。", en: "The iconic Game of Life spaceship traveling diagonally." },
                pattern: [
                    [0, 1, 0],
                    [0, 0, 1],
                    [1, 1, 1]
                ]
            },
            {
                id: "lwss",
                name: { ja: "軽量宇宙船 (LWSS)", en: "Lightweight Spaceship" },
                desc: { ja: "水平方向に光速の半分の速さ(c/2)で移動する宇宙船。", en: "A period-4 orthogonal spaceship traveling at speed c/2." },
                pattern: [
                    [0, 1, 0, 0, 1],
                    [1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 1],
                    [1, 1, 1, 1, 0]
                ]
            },
            {
                id: "mwss",
                name: { ja: "中量宇宙船 (MWSS)", en: "Middleweight Spaceship" },
                desc: { ja: "中型サイズの水平移動宇宙船。", en: "A medium-sized period-4 orthogonal spaceship." },
                pattern: [
                    [0, 0, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 0]
                ]
            },
            {
                id: "hwss",
                name: { ja: "重量宇宙船 (HWSS)", en: "Heavyweight Spaceship" },
                desc: { ja: "大型サイズの力強い水平移動宇宙船。", en: "The largest standard period-4 orthogonal spaceship." },
                pattern: [
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 0]
                ]
            }
        ],
        methuselah: [
            {
                id: "diehard",
                name: { ja: "ダイハード", en: "Diehard" },
                desc: { ja: "130世代もの間活動し続け、完全に消滅する長寿パターン。", en: "A methuselah pattern that completely vanishes at generation 130." },
                pattern: [
                    [0, 0, 0, 0, 0, 0, 1, 0],
                    [1, 1, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 1, 1]
                ]
            },
            {
                id: "acorn",
                name: { ja: "ドングリ (Acorn)", en: "Acorn" },
                desc: { ja: "わずか7セルから5206世代にわたり増殖し13個のグライダーを産む。", en: "Only 7 cells that evolve for 5,206 generations, producing 13 gliders." },
                pattern: [
                    [0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0],
                    [1, 1, 0, 0, 1, 1, 1]
                ]
            },
            {
                id: "r_pentomino",
                name: { ja: "rペントミノ", en: "R-pentomino" },
                desc: { ja: "5セルから1103世代かけて激しく増殖する最も有名なメトセラ。", en: "The most famous 5-cell methuselah surviving for 1,103 generations." },
                pattern: [
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 1, 0]
                ]
            },
            {
                id: "gosper_gun",
                name: { ja: "ゴスパーのグライダー銃", en: "Gosper Glider Gun" },
                desc: { ja: "30世代毎にグライダーを永遠に射出し続ける最初の銃型パターン。", en: "The first discovered gun, generating a glider every 30 generations." },
                pattern: [
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                ]
            },
            {
                id: "puffer_train",
                name: { ja: "シュシュポッポ列車 (汽車)", en: "Puffer Train / Switch Engine" },
                desc: { ja: "残骸（煙）を撒き散らしながら無限に進行する機関車パターン。", en: "A steam-train-like engine leaving an endless trail of debris." },
                pattern: [
                    [0, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0]
                ]
            }
        ]
    };

    // =========================================================================
    // 3. Application State & Simulation Engine
    // =========================================================================
    class GameEngine {
        constructor() {
            this.cols = 50;
            this.rows = 50;
            this.grid = new Uint8Array(this.cols * this.rows);
            this.nextGrid = new Uint8Array(this.cols * this.rows);
            this.generation = 0;
            this.population = 0;
            this.isPlaying = false;
            this.stepInterval = 500; // ms per generation (default 0.5s)
            this.isToroidalWrap = true;
            this.showGridLines = true;
            this.lastTickTime = 0;
            this.animFrameId = null;

            // Pattern stamping state
            this.activePlacement = null; // { pattern: number[][], name: string, width: number, height: number }
            this.hoverCol = -1;
            this.hoverRow = -1;
        }

        init(cols, rows) {
            this.cols = Math.max(10, cols);
            this.rows = Math.max(10, rows);
            this.grid = new Uint8Array(this.cols * this.rows);
            this.nextGrid = new Uint8Array(this.cols * this.rows);
            this.generation = 0;
            this.population = 0;
        }

        resize(newCols, newRows) {
            newCols = Math.max(10, newCols);
            newRows = Math.max(10, newRows);
            const oldCols = this.cols;
            const oldRows = this.rows;
            const oldGrid = this.grid;

            const nextG = new Uint8Array(newCols * newRows);
            let count = 0;

            const offsetX = Math.floor((newCols - oldCols) / 2);
            const offsetY = Math.floor((newRows - oldRows) / 2);

            for (let y = 0; y < oldRows; y++) {
                for (let x = 0; x < oldCols; x++) {
                    if (oldGrid[y * oldCols + x]) {
                        const nx = x + offsetX;
                        const ny = y + offsetY;
                        if (nx >= 0 && nx < newCols && ny >= 0 && ny < newRows) {
                            nextG[ny * newCols + nx] = 1;
                            count++;
                        }
                    }
                }
            }

            this.cols = newCols;
            this.rows = newRows;
            this.grid = nextG;
            this.nextGrid = new Uint8Array(newCols * newRows);
            this.population = count;
        }

        step() {
            const cols = this.cols;
            const rows = this.rows;
            const grid = this.grid;
            const next = this.nextGrid;
            const wrap = this.isToroidalWrap;
            let liveCount = 0;

            for (let y = 0; y < rows; y++) {
                const yOffset = y * cols;
                for (let x = 0; x < cols; x++) {
                    let neighbors = 0;

                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;

                            let nx = x + dx;
                            let ny = y + dy;

                            if (wrap) {
                                nx = (nx + cols) % cols;
                                ny = (ny + rows) % rows;
                            } else {
                                if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
                            }

                            if (grid[ny * cols + nx]) neighbors++;
                        }
                    }

                    const idx = yOffset + x;
                    const isAlive = grid[idx];
                    let willLive = 0;

                    if (isAlive) {
                        // Survival (2 or 3), Underpopulation (<2), Overpopulation (>3)
                        willLive = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                    } else {
                        // Birth (exactly 3)
                        willLive = (neighbors === 3) ? 1 : 0;
                    }

                    next[idx] = willLive;
                    if (willLive) liveCount++;
                }
            }

            // Swap buffers
            this.grid.set(this.nextGrid);
            this.population = liveCount;
            this.generation++;
        }

        clear() {
            this.grid.fill(0);
            this.nextGrid.fill(0);
            this.generation = 0;
            this.population = 0;
        }

        randomize(density = 0.22) {
            let count = 0;
            const total = this.cols * this.rows;
            for (let i = 0; i < total; i++) {
                const val = Math.random() < density ? 1 : 0;
                this.grid[i] = val;
                if (val) count++;
            }
            this.generation = 0;
            this.population = count;
        }

        toggleCell(col, row, forceState = null) {
            if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return;
            const idx = row * this.cols + col;
            const current = this.grid[idx];
            const next = forceState !== null ? forceState : (current ? 0 : 1);

            if (current !== next) {
                this.grid[idx] = next;
                this.population += next ? 1 : -1;
            }
        }

        getCell(col, row) {
            if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return 0;
            return this.grid[row * this.cols + col];
        }

        placePatternAt(col, row, patternMatrix) {
            const patH = patternMatrix.length;
            const patW = patternMatrix[0].length;
            const startX = col - Math.floor(patW / 2);
            const startY = row - Math.floor(patH / 2);

            for (let py = 0; py < patH; py++) {
                for (let px = 0; px < patW; px++) {
                    if (patternMatrix[py][px]) {
                        let gx = startX + px;
                        let gy = startY + py;

                        if (this.isToroidalWrap) {
                            gx = (gx % this.cols + this.cols) % this.cols;
                            gy = (gy % this.rows + this.rows) % this.rows;
                        } else {
                            if (gx < 0 || gx >= this.cols || gy < 0 || gy >= this.rows) continue;
                        }

                        const idx = gy * this.cols + gx;
                        if (!this.grid[idx]) {
                            this.grid[idx] = 1;
                            this.population++;
                        }
                    }
                }
            }
        }
    }

    // =========================================================================
    // 4. UI Manager & Controller
    // =========================================================================
    const engine = new GameEngine();

    // DOM Elements
    const canvas = document.getElementById('lifeCanvas');
    const ctx = canvas.getContext('2d');
    const canvasWrapper = document.getElementById('canvasWrapper');
    const canvasOverlayHint = document.getElementById('canvasOverlayHint');

    const genCountEl = document.getElementById('genCount');
    const popCountEl = document.getElementById('popCount');
    const playPauseBtn = document.getElementById('btnPlayPause');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const playPauseText = document.getElementById('playPauseText');
    const stepBtn = document.getElementById('btnStep');
    const randomBtn = document.getElementById('btnRandom');
    const clearBtn = document.getElementById('btnClear');

    const speedSlider = document.getElementById('speedSlider');
    const speedValueLabel = document.getElementById('speedValueLabel');
    const btnSpeedSlower = document.getElementById('btnSpeedSlower');
    const btnSpeedFaster = document.getElementById('btnSpeedFaster');

    const selectGridSize = document.getElementById('selectGridSize');
    const btnToggleWrap = document.getElementById('btnToggleWrap');
    const btnToggleGrid = document.getElementById('btnToggleGrid');

    const btnLangToggle = document.getElementById('btnLangToggle');
    const currentLangLabel = document.getElementById('currentLangLabel');

    const presetsSidebar = document.getElementById('presetsSidebar');
    const btnTogglePresets = document.getElementById('btnTogglePresets');
    const btnClosePresets = document.getElementById('btnClosePresets');
    const presetsList = document.getElementById('presetsList');
    const presetTabs = document.querySelectorAll('.preset-tab');

    const placementBanner = document.getElementById('placementBanner');
    const placementPatternName = document.getElementById('placementPatternName');
    const placementDimensions = document.getElementById('placementDimensions');
    const btnRotatePattern = document.getElementById('btnRotatePattern');
    const btnPlaceCenter = document.getElementById('btnPlaceCenter');
    const btnCancelPlacement = document.getElementById('btnCancelPlacement');

    const helpModal = document.getElementById('helpModal');
    const btnHelp = document.getElementById('btnHelp');
    const btnCloseHelp = document.getElementById('btnCloseHelp');
    const btnModalCloseOk = document.getElementById('btnModalCloseOk');

    let currentCategory = 'still_life';
    let isDrawing = false;
    let drawMode = 1; // 1 = paint alive, 0 = erase
    let lastDrawCol = -1;
    let lastDrawRow = -1;
    let cellSize = 10;
    let canvasDisplayWidth = 600;
    let canvasDisplayHeight = 600;

    // =========================================================================
    // 5. Canvas Rendering & Scaling
    // =========================================================================
    function resizeCanvas() {
        const rect = canvasWrapper.getBoundingClientRect();
        const availableW = Math.max(260, rect.width - 24);
        const availableH = Math.max(260, rect.height - 24);

        // Calculate aspect-ratio fit
        const cellAspect = engine.cols / engine.rows;
        let w = availableW;
        let h = w / cellAspect;

        if (h > availableH) {
            h = availableH;
            w = h * cellAspect;
        }

        canvasDisplayWidth = Math.floor(w);
        canvasDisplayHeight = Math.floor(h);
        cellSize = canvasDisplayWidth / engine.cols;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(canvasDisplayWidth * dpr);
        canvas.height = Math.floor(canvasDisplayHeight * dpr);
        canvas.style.width = `${canvasDisplayWidth}px`;
        canvas.style.height = `${canvasDisplayHeight}px`;

        ctx.resetTransform();
        ctx.scale(dpr, dpr);

        render();
    }

    function render() {
        ctx.fillStyle = '#07080a';
        ctx.fillRect(0, 0, canvasDisplayWidth, canvasDisplayHeight);

        const cols = engine.cols;
        const rows = engine.rows;
        const grid = engine.grid;
        const showGrid = engine.showGridLines;

        // Render Grid Lines if enabled and cell size is large enough
        if (showGrid && cellSize >= 4) {
            ctx.strokeStyle = '#181b22';
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let c = 0; c <= cols; c++) {
                const x = Math.round(c * cellSize);
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvasDisplayHeight);
            }
            for (let r = 0; r <= rows; r++) {
                const y = Math.round(r * cellSize);
                ctx.moveTo(0, y);
                ctx.lineTo(canvasDisplayWidth, y);
            }
            ctx.stroke();
        }

        // Render Alive Cells
        ctx.fillStyle = '#ffffff';
        const gap = cellSize >= 6 ? 1 : 0;
        const drawSize = Math.max(1, cellSize - gap);

        for (let r = 0; r < rows; r++) {
            const y = r * cellSize;
            const rOffset = r * cols;
            for (let c = 0; c < cols; c++) {
                if (grid[rOffset + c]) {
                    const x = c * cellSize;
                    ctx.fillRect(x + (gap ? 0.5 : 0), y + (gap ? 0.5 : 0), drawSize, drawSize);
                }
            }
        }

        // Render Preset Stamping Ghost Preview
        if (engine.activePlacement && engine.hoverCol >= 0 && engine.hoverRow >= 0) {
            const pat = engine.activePlacement.pattern;
            const patH = pat.length;
            const patW = pat[0].length;
            const startX = engine.hoverCol - Math.floor(patW / 2);
            const startY = engine.hoverRow - Math.floor(patH / 2);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;

            for (let py = 0; py < patH; py++) {
                for (let px = 0; px < patW; px++) {
                    if (pat[py][px]) {
                        let gx = startX + px;
                        let gy = startY + py;

                        if (engine.isToroidalWrap) {
                            gx = (gx % cols + cols) % cols;
                            gy = (gy % rows + rows) % rows;
                        } else {
                            if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
                        }

                        const x = gx * cellSize;
                        const y = gy * cellSize;
                        ctx.fillRect(x, y, drawSize, drawSize);
                        ctx.strokeRect(x, y, drawSize, drawSize);
                    }
                }
            }
        }

        // Update stats
        genCountEl.textContent = engine.generation.toLocaleString();
        popCountEl.textContent = engine.population.toLocaleString();
    }

    // =========================================================================
    // 6. Simulation Loop
    // =========================================================================
    function tick(timestamp) {
        if (engine.isPlaying) {
            if (!engine.lastTickTime) engine.lastTickTime = timestamp;
            const elapsed = timestamp - engine.lastTickTime;

            if (elapsed >= engine.stepInterval) {
                engine.step();
                render();
                engine.lastTickTime = timestamp;
            }
        }
        engine.animFrameId = requestAnimationFrame(tick);
    }

    function togglePlayPause() {
        engine.isPlaying = !engine.isPlaying;
        engine.lastTickTime = 0;
        updatePlayPauseButton();
    }

    function updatePlayPauseButton() {
        const t = I18N[currentLang];
        if (engine.isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            playPauseText.textContent = t.btnPause;
            playPauseBtn.classList.add('active');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            playPauseText.textContent = t.btnPlay;
            playPauseBtn.classList.remove('active');
        }
    }

    function setSpeed(ms) {
        engine.stepInterval = Math.max(20, Math.min(1000, ms));
        speedSlider.value = engine.stepInterval;
        const sec = (engine.stepInterval / 1000).toFixed(2);
        const perSec = (1000 / engine.stepInterval).toFixed(1);
        speedValueLabel.textContent = `${sec}s (${perSec}/s)`;
    }

    // =========================================================================
    // 7. Mouse & Touch Drawing Interactions
    // =========================================================================
    function getCanvasCellCoords(event) {
        const rect = canvas.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        if (x < 0 || x >= canvasDisplayWidth || y < 0 || y >= canvasDisplayHeight) {
            return { col: -1, row: -1 };
        }

        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);
        return {
            col: Math.max(0, Math.min(engine.cols - 1, col)),
            row: Math.max(0, Math.min(engine.rows - 1, row))
        };
    }

    function onPointerDown(e) {
        const { col, row } = getCanvasCellCoords(e);
        if (col === -1 || row === -1) return;

        // Hide onboarding hint
        canvasOverlayHint.classList.add('fade-out');

        if (engine.activePlacement) {
            // Place pattern
            engine.placePatternAt(col, row, engine.activePlacement.pattern);
            render();
            return;
        }

        isDrawing = true;
        drawMode = engine.getCell(col, row) ? 0 : 1;
        engine.toggleCell(col, row, drawMode);
        lastDrawCol = col;
        lastDrawRow = row;
        render();
    }

    function onPointerMove(e) {
        const { col, row } = getCanvasCellCoords(e);

        if (engine.activePlacement) {
            engine.hoverCol = col;
            engine.hoverRow = row;
            render();
            return;
        }

        if (isDrawing && col !== -1 && row !== -1) {
            if (col !== lastDrawCol || row !== lastDrawRow) {
                engine.toggleCell(col, row, drawMode);
                lastDrawCol = col;
                lastDrawRow = row;
                render();
            }
        }
    }

    function onPointerUp() {
        isDrawing = false;
        lastDrawCol = -1;
        lastDrawRow = -1;
    }

    function onPointerLeave() {
        if (engine.activePlacement) {
            engine.hoverCol = -1;
            engine.hoverRow = -1;
            render();
        }
        isDrawing = false;
    }

    // =========================================================================
    // 8. Preset Patterns Management & Placement
    // =========================================================================
    function rotateMatrix(matrix) {
        const h = matrix.length;
        const w = matrix[0].length;
        const rotated = [];
        for (let x = 0; x < w; x++) {
            const row = [];
            for (let y = h - 1; y >= 0; y--) {
                row.push(matrix[y][x]);
            }
            rotated.push(row);
        }
        return rotated;
    }

    function selectPreset(preset) {
        engine.activePlacement = {
            id: preset.id,
            name: preset.name[currentLang],
            pattern: preset.pattern.map(row => [...row]),
            origPreset: preset
        };

        updatePlacementBanner();
        placementBanner.classList.remove('hidden');
        render();
    }

    function cancelPlacement() {
        engine.activePlacement = null;
        engine.hoverCol = -1;
        engine.hoverRow = -1;
        placementBanner.classList.add('hidden');
        render();
    }

    function rotateCurrentPlacement() {
        if (!engine.activePlacement) return;
        engine.activePlacement.pattern = rotateMatrix(engine.activePlacement.pattern);
        updatePlacementBanner();
        render();
    }

    function placeCurrentAtCenter() {
        if (!engine.activePlacement) return;
        const centerCol = Math.floor(engine.cols / 2);
        const centerRow = Math.floor(engine.rows / 2);
        engine.placePatternAt(centerCol, centerRow, engine.activePlacement.pattern);
        render();
    }

    function updatePlacementBanner() {
        if (!engine.activePlacement) return;
        const pat = engine.activePlacement.pattern;
        const h = pat.length;
        const w = pat[0].length;
        placementPatternName.textContent = engine.activePlacement.name;
        placementDimensions.textContent = `(${w}×${h})`;
    }

    function renderPresetThumbnail(canvasThumb, pattern) {
        const tctx = canvasThumb.getContext('2d');
        const h = pattern.length;
        const w = pattern[0].length;
        const thumbSize = 54;
        const dpr = window.devicePixelRatio || 1;

        canvasThumb.width = thumbSize * dpr;
        canvasThumb.height = thumbSize * dpr;
        canvasThumb.style.width = `${thumbSize}px`;
        canvasThumb.style.height = `${thumbSize}px`;

        tctx.resetTransform();
        tctx.scale(dpr, dpr);
        tctx.fillStyle = '#07080a';
        tctx.fillRect(0, 0, thumbSize, thumbSize);

        const pad = 4;
        const available = thumbSize - pad * 2;
        const cSize = Math.min(available / w, available / h, 6);
        const startX = Math.floor((thumbSize - w * cSize) / 2);
        const startY = Math.floor((thumbSize - h * cSize) / 2);

        tctx.fillStyle = '#ffffff';
        for (let r = 0; r < h; r++) {
            for (let c = 0; c < w; c++) {
                if (pattern[r][c]) {
                    tctx.fillRect(startX + c * cSize, startY + r * cSize, Math.max(1, cSize - 0.5), Math.max(1, cSize - 0.5));
                }
            }
        }
    }

    function renderPresetsList(category) {
        presetsList.innerHTML = '';
        const list = PRESETS[category] || [];
        const t = I18N[currentLang];

        list.forEach(preset => {
            const card = document.createElement('div');
            card.className = 'preset-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');

            const thumbWrapper = document.createElement('div');
            thumbWrapper.className = 'preset-thumbnail';
            const thumbCanvas = document.createElement('canvas');
            thumbWrapper.appendChild(thumbCanvas);

            const details = document.createElement('div');
            details.className = 'preset-details';

            const metaTop = document.createElement('div');
            metaTop.className = 'preset-meta-top';

            const title = document.createElement('div');
            title.className = 'preset-name';
            title.textContent = preset.name[currentLang];

            const size = document.createElement('span');
            size.className = 'preset-size';
            size.textContent = `${preset.pattern[0].length}×${preset.pattern.length}`;

            metaTop.appendChild(title);
            metaTop.appendChild(size);

            const desc = document.createElement('p');
            desc.className = 'preset-desc';
            desc.textContent = preset.desc[currentLang];

            const actions = document.createElement('div');
            actions.className = 'preset-card-actions';

            const stampBtn = document.createElement('button');
            stampBtn.className = 'btn btn-mini btn-primary';
            stampBtn.textContent = t.placeAction;
            stampBtn.onclick = (e) => {
                e.stopPropagation();
                selectPreset(preset);
                // On mobile, close sidebar automatically on selection
                if (window.innerWidth <= 768) {
                    presetsSidebar.classList.add('collapsed');
                }
            };

            const centerBtn = document.createElement('button');
            centerBtn.className = 'btn btn-mini btn-secondary';
            centerBtn.textContent = t.btnPlaceCenter;
            centerBtn.onclick = (e) => {
                e.stopPropagation();
                selectPreset(preset);
                placeCurrentAtCenter();
                cancelPlacement();
            };

            actions.appendChild(stampBtn);
            actions.appendChild(centerBtn);

            details.appendChild(metaTop);
            details.appendChild(desc);
            details.appendChild(actions);

            card.appendChild(thumbWrapper);
            card.appendChild(details);

            card.addEventListener('click', () => {
                selectPreset(preset);
                if (window.innerWidth <= 768) {
                    presetsSidebar.classList.add('collapsed');
                }
            });

            presetsList.appendChild(card);
            renderPresetThumbnail(thumbCanvas, preset.pattern);
        });
    }

    // =========================================================================
    // 9. Grid Size Management
    // =========================================================================
    function handleGridSizeChange(val) {
        const t = I18N[currentLang];
        if (val === 'fit') {
            const rect = canvasWrapper.getBoundingClientRect();
            const targetCellSize = 14;
            const cols = Math.max(10, Math.floor(rect.width / targetCellSize));
            const rows = Math.max(10, Math.floor(rect.height / targetCellSize));
            engine.resize(cols, rows);
            resizeCanvas();
        } else if (val === 'custom') {
            const input = prompt(t.customSizePrompt, `${engine.cols}x${engine.rows}`);
            if (input) {
                const match = input.match(/^(\d+)\s*[xX,・\s]\s*(\d+)$/);
                if (match) {
                    const w = parseInt(match[1], 10);
                    const h = parseInt(match[2], 10);
                    if (w >= 10 && w <= 200 && h >= 10 && h <= 200) {
                        engine.resize(w, h);
                        resizeCanvas();
                        return;
                    }
                }
                alert(t.invalidCustomSize);
                selectGridSize.value = `${engine.cols}x${engine.rows}`;
            } else {
                selectGridSize.value = `${engine.cols}x${engine.rows}`;
            }
        } else {
            const [w, h] = val.split('x').map(n => parseInt(n, 10));
            if (w && h) {
                engine.resize(w, h);
                resizeCanvas();
            }
        }
    }

    // =========================================================================
    // 10. Multi-Language (i18n) Dynamic Translation
    // =========================================================================
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('conway_lang', lang);
        document.documentElement.lang = lang;
        currentLangLabel.textContent = lang === 'ja' ? 'EN' : 'JA';

        const t = I18N[lang];

        // Translate all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                el.innerHTML = t[key];
            }
        });

        // Update toggles text
        btnToggleWrap.querySelector('span').textContent = engine.isToroidalWrap ? t.toggleWrapOn : t.toggleWrapOff;
        btnToggleGrid.querySelector('span').textContent = engine.showGridLines ? t.toggleGridOn : t.toggleGridOff;

        // Update play/pause button label
        updatePlayPauseButton();

        // Update active preset name if any
        if (engine.activePlacement && engine.activePlacement.origPreset) {
            engine.activePlacement.name = engine.activePlacement.origPreset.name[lang];
            updatePlacementBanner();
        }

        // Re-render presets list
        renderPresetsList(currentCategory);
    }

    // =========================================================================
    // 11. Event Listeners & Initialization
    // =========================================================================
    function attachEventListeners() {
        // Canvas mouse & touch interactions
        canvas.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        canvas.addEventListener('mouseleave', onPointerLeave);

        canvas.addEventListener('touchstart', onPointerDown, { passive: false });
        window.addEventListener('touchmove', onPointerMove, { passive: false });
        window.addEventListener('touchend', onPointerUp, { passive: false });

        // Playback buttons
        playPauseBtn.addEventListener('click', togglePlayPause);

        stepBtn.addEventListener('click', () => {
            if (engine.isPlaying) togglePlayPause();
            engine.step();
            render();
        });

        randomBtn.addEventListener('click', () => {
            engine.randomize();
            render();
        });

        clearBtn.addEventListener('click', () => {
            engine.clear();
            render();
        });

        // Speed controls
        speedSlider.addEventListener('input', (e) => {
            setSpeed(parseInt(e.target.value, 10));
        });

        btnSpeedSlower.addEventListener('click', () => {
            setSpeed(engine.stepInterval + 50);
        });

        btnSpeedFaster.addEventListener('click', () => {
            setSpeed(engine.stepInterval - 50);
        });

        // Grid size select
        selectGridSize.addEventListener('change', (e) => {
            handleGridSizeChange(e.target.value);
        });

        // Toggles
        btnToggleWrap.addEventListener('click', () => {
            engine.isToroidalWrap = !engine.isToroidalWrap;
            btnToggleWrap.classList.toggle('active', engine.isToroidalWrap);
            const t = I18N[currentLang];
            btnToggleWrap.querySelector('span').textContent = engine.isToroidalWrap ? t.toggleWrapOn : t.toggleWrapOff;
        });

        btnToggleGrid.addEventListener('click', () => {
            engine.showGridLines = !engine.showGridLines;
            btnToggleGrid.classList.toggle('active', engine.showGridLines);
            const t = I18N[currentLang];
            btnToggleGrid.querySelector('span').textContent = engine.showGridLines ? t.toggleGridOn : t.toggleGridOff;
            render();
        });

        // Language toggle
        btnLangToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'ja' ? 'en' : 'ja');
        });

        // Presets sidebar
        btnTogglePresets.addEventListener('click', () => {
            presetsSidebar.classList.toggle('collapsed');
        });

        btnClosePresets.addEventListener('click', () => {
            presetsSidebar.classList.add('collapsed');
        });

        presetTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                presetTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentCategory = tab.dataset.category;
                renderPresetsList(currentCategory);
            });
        });

        // Placement banner actions
        btnRotatePattern.addEventListener('click', rotateCurrentPlacement);
        btnPlaceCenter.addEventListener('click', () => {
            placeCurrentAtCenter();
            cancelPlacement();
        });
        btnCancelPlacement.addEventListener('click', cancelPlacement);

        // Help Modal
        btnHelp.addEventListener('click', () => {
            helpModal.classList.remove('hidden');
        });

        btnCloseHelp.addEventListener('click', () => {
            helpModal.classList.add('hidden');
        });

        btnModalCloseOk.addEventListener('click', () => {
            helpModal.classList.add('hidden');
        });

        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                helpModal.classList.add('hidden');
            }
        });

        // Global Keyboard Shortcuts
        window.addEventListener('keydown', (e) => {
            // Ignore if active in input or dialog
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

            if (e.code === 'Space') {
                e.preventDefault();
                togglePlayPause();
            } else if (e.code === 'KeyS' || e.code === 'ArrowRight') {
                e.preventDefault();
                if (engine.isPlaying) togglePlayPause();
                engine.step();
                render();
            } else if (e.code === 'KeyC') {
                e.preventDefault();
                engine.clear();
                render();
            } else if (e.code === 'KeyR') {
                if (engine.activePlacement) {
                    e.preventDefault();
                    rotateCurrentPlacement();
                } else {
                    e.preventDefault();
                    engine.randomize();
                    render();
                }
            } else if (e.code === 'KeyZ') {
                if (engine.activePlacement) {
                    e.preventDefault();
                    rotateCurrentPlacement();
                }
            } else if (e.code === 'Escape') {
                if (!helpModal.classList.contains('hidden')) {
                    helpModal.classList.add('hidden');
                } else if (engine.activePlacement) {
                    cancelPlacement();
                }
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
    }

    // =========================================================================
    // 12. Application Boot
    // =========================================================================
    function init() {
        const isMobile = window.innerWidth <= 768;
        const defaultGridSize = isMobile ? 20 : 50;
        engine.init(defaultGridSize, defaultGridSize);
        selectGridSize.value = `${defaultGridSize}x${defaultGridSize}`;

        setSpeed(500); // 0.5s default
        attachEventListeners();
        setLanguage(currentLang);
        resizeCanvas();

        // Place a default welcoming pattern (Glider)
        const gliderPos = isMobile ? 5 : 12;
        engine.placePatternAt(gliderPos, gliderPos, PRESETS.spaceship[0].pattern);
        render();

        // Start animation frame loop
        requestAnimationFrame(tick);
    }

    // Run on DOM loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
