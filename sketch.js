const chromatic = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

let noteSet = 0b111010001000;

function playChord(key) {
  let rev = chromatic.reverse();
  let chord = [];
  for (let i = 0; i < rev.length; i++) {
    if ((key & (1 << i)) > 0) {
      chord.push(chromatic[i]);
    }
  }
  for (let note of chord) {
    sound.play(note);
  }
}

let notes = {};
for (let i = 0; i < chromatic.length; i++) {
  notes[chromatic[i]] = [i * 1000, 1000];
}

const sound = new Howl({
  src: ["Piano.wav"],
  sprite: notes,
});

/*
black keys    w e   t y u
white keys   a s d f g h j
*/

let piano = document.querySelector("svg");

const keysInUse = Array.from("awsedftgyhuj");

window.addEventListener("keydown", playSound);
window.addEventListener("keyup", restoreFill);

function playSound(event) {
  if (event.type === "keydown") {
    if (event.repeat || !keysInUse.includes(event.key)) return;
    let idx = keysInUse.indexOf(event.key);
    sound.play(chromatic[idx]);
    piano.children[idx].style.fill = "#96F5EA";
  }
  if (event.type === "mousedown") {
    sound.play(event.target.id);
    event.target.style.fill = "#96F5EA";
  }

}

function restoreFill(event) {
  let pianoKey;
  if (event.type === "keyup" && keysInUse.includes(event.key)) {
    pianoKey = piano.children[keysInUse.indexOf(event.key)];
  }
  if (event.type === "mouseup") {
    pianoKey = event.target;
  }
  pianoKey.style.fill = pianoKey.id.length > 1 ? "#000000" : "#FFFFFF";
}

for (let i = 0; i < piano.children.length; i++) {
  piano.children[i].addEventListener("mousedown", playSound);
  piano.children[i].addEventListener("mouseup", restoreFill);
}
