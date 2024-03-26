const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const parsedCollisons = collisionLevel1.parse2d();
const collisionBlocks = parsedCollisons.createObjectsFrom2d();

const key = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const player = new Player({
  collisionBlocks,
  position: {
    x: 200,
    y: 200,
  },
  imageSrc: {
    default: createImageSrc({
      path: "img/king/idle",
      fileName: "idle",
      count: 11,
    }),
    flipped: createImageSrc({
      path: "img/king/idle/left",
      fileName: "idle",
      count: 11,
    }),
  },
  scale: 2,
  offset: {
    x: -42,
    y: -29,
    flippedX: -75,
  },
  width: 40,
  height: 58,
  preventInput: false,
  sprites: {
    idle: {
      default: createImageSrc({
        path: "img/king/idle",
        fileName: "idle",
        count: 11,
      }),
      flipped: createImageSrc({
        path: "img/king/idle/left",
        fileName: "idle",
        count: 11,
      }),
      loop: true,
    },
    doorIn: {
      default: createImageSrc({
        path: "img/king/doorIn",
        fileName: "doorIn",
        count: 8,
      }),
      flipped: createImageSrc({
        path: "img/king/doorIn/left",
        fileName: "doorIn",
        count: 8,
      }),
      loop: false,
    },
    run: {
      default: createImageSrc({
        path: "img/king/run",
        fileName: "run",
        count: 8,
      }),
      flipped: createImageSrc({
        path: "img/king/run/left",
        fileName: "run",
        count: 8,
      }),
      loop: true,
    },
  },
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: { default: ["img/backgroundLevel1.png"] },
});

const doors = [
  new Sprite({
    position: {
      x: 767,
      y: 273,
    },
    imageSrc: {
      default: createImageSrc({
        path: "img/doorOpen",
        fileName: "doorOpen",
        count: 5,
      }),
    },
    loop: false,
    scale: 2,
    autoPlay: false,
  }),
];

function animate() {
  window.requestAnimationFrame(animate);
  background.update();
  doors.forEach((door) => {
    door.update();
  });
  // player.drawHitbox();
  player.update();
  player.handleInput(key);
}

animate();
