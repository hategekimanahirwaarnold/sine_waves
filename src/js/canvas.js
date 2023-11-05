import utils, { randomColor, randomIntFromRange } from './utils'
import * as dat from 'dat.gui'

addEventListener('resize', function () {
 
  canvas.width = innerWidth;
  canvas.height = innerHeight;
})

let gui = new dat.GUI()
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
/**
 * h: 198
 * s: 100
 * l: 50
 */
const strokeColor = {
  h: 200,
  s: 100,
  l: 50
}
/**
 * length = - 0.0046
 * amplitude: 212
 * frequency: 0.01
 */
const wave = {
  y: canvas.height / 2,
  length: 0.003,
  amplitude: 212,
  frequency: 0.01
}
/**
 * r: 0
 * g: 0
 * b: 0
 * a: 0.265
 */
const backColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.0165
}
const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)
// waveFolder.open();

const strokeFolder = gui.addFolder('stroke color')
strokeFolder.add(strokeColor, 'h', 0, 255)
strokeFolder.add(strokeColor, 's', 0, 100)
strokeFolder.add(strokeColor, 'l', 0, 100)
// strokeFolder.open();

const backFolder = gui.addFolder('back color')
backFolder.add(backColor, 'r', 0, 255)
backFolder.add(backColor, 'g', 0, 255)
backFolder.add(backColor, 'b', 0, 255)
backFolder.add(backColor, 'a', 0, 1)
let increase = wave.frequency;

function animate() {
  c.fillStyle = `rgba(${backColor.r}, ${backColor.g}, ${backColor.b}, ${backColor.a})`
  c.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (let i = 0, j = 0; i < canvas.width; i++, j++)
  {
    c.lineTo(i, wave.y + Math.sin(i * wave.length + (increase)) * wave.amplitude * Math.sin(increase * j));

    j *= Math.sin(j) * 0.005 + 0.5
  }
  
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increase))}, ${strokeColor.s}%, ${strokeColor.l}%)`
  c.stroke();
  increase += wave.frequency;
}

animate();
