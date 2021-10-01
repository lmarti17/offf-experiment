// M_1_5_03
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * noise values (noise 3d) are used to animate a bunch of agents.
 *
 * KEYS
 * 1-2                 : switch noise mode
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 */

const colorPool = [
  {
    main: "214,54,69", // red
    second: "125, 242, 214", // turquoise
  },
  {
    main: "28,150,179", // green
    second: "255,207,66", // yellow
  },
  {
    main: "247,82,74", // red variant
    second: "125, 242, 214", // turquoise
  },
  {
    main: "69,77,176", // blue
    second: "235,224,117", // yellow variant
  },
  // {
  //   main: "230,84,36", // orange
  //   second: "28,150,179" // blue variant
  // }
];

let previousMouseX = 0;
let previousMouseY = 0;
let delta = 0;

let randomColor = colorPool[Math.floor(Math.random() * colorPool.length)];

class Sketch {
  constructor() {
    this.agents = [];
    this.agentCount = 2000;
    this.noiseScale = 300;
    this.noiseStrength = -1;
    this.noiseZRange = 0.1;
    this.noiseZVelocity = 0.001;
    this.overlayAlpha = 80;
    this.agentAlpha = 100;
    this.strokeWidth = 0.3;
    this.overlayColor = randomColor.main;
    this.agentColor = randomColor.second;

    this.gui = new dat.GUI();

    this.gui.add(this, "agentCount", 0, 4000).step(100);
    this.gui.add(this, "noiseScale", 50, 500).step(50);
    this.gui.add(this, "noiseStrength", -20, 20).step(0.1);
    this.gui.add(this, "noiseZVelocity", 0, 0.01).step(0.001);
    this.gui.add(this, "overlayAlpha", 0, 100).step(10);
    this.gui.add(this, "strokeWidth", 0, 0.5).step(0.1);
    this.gui.close();
  }

  updateOverlayAlpha(value) {
    this.overlayAlpha = value;
  }

  updateColors() {
    let randomColor = colorPool[Math.floor(Math.random() * colorPool.length)];
    this.overlayColor = randomColor.main;
    this.agentColor = randomColor.second;

    return randomColor;
  }

  updateNoiseStrengh(value) {
    this.noiseStrength = value;
  }
  updateNoiseScale(value) {
    this.noiseScale = value;
  }
}

function setup() {
  myp5.background(0, 0, 255);
  myp5.createCanvas(myp5.windowWidth, myp5.windowHeight);

  for (var i = 0; i < sketch.agentCount; i++) {
    sketch.agents[i] = new Agent(sketch.noiseZRange, sketch.agentAlpha);
  }
}

function draw() {
  myp5.fill(`rgba(${sketch.overlayColor}, ${sketch.overlayAlpha})`);
  myp5.noStroke();
  myp5.rect(0, 0, myp5.width, myp5.height);
  delta = Math.max(delta - 5, 50); // decrement delta on each frame
  sketch.updateNoiseScale(myp5.map(delta, 50, 300, 300, 1));

  // Draw agents
  for (var i = 0; i < sketch.agentCount; i++) {
    sketch.agents[i].update1(
      sketch.strokeWidth,
      sketch.noiseScale,
      sketch.noiseStrength,
      sketch.noiseZVelocity,
      sketch.agentColor
    );
  }
}

function mouseMoved() {
  let deltaOnTheFly =
    Math.abs(mouseX - previousMouseX) + Math.abs(mouseY - previousMouseY);
  delta = deltaOnTheFly > 100 ? deltaOnTheFly : delta;

  sketch.updateNoiseStrengh(myp5.map(mouseX, 0, windowWidth, -20, 20));
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}

function mousePressed() {
  sketch.updateOverlayAlpha(0);
}

function mouseReleased() {
  sketch.updateOverlayAlpha(10);
}

const sketch = new Sketch();
const myp5 = new p5();

window.onload = function () {
  document.getElementById("defaultCanvas0").addEventListener("click", () => {
    sketch.updateColors();
  });
};
