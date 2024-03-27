const backgroundLayer = document.querySelector("#backgroundLayer");
backgroundLayer.width = 1024;
backgroundLayer.height = 576;
const backgroundCanvas = backgroundLayer.getContext("2d");

const objectsLayer = document.querySelector("#objectsLayer");
objectsLayer.width = 1024;
objectsLayer.height = 576;
const objectsCanvas = objectsLayer.getContext("2d");

const overlayLayer = document.querySelector("#overlayLayer");
overlayLayer.width = 1024;
overlayLayer.height = 576;
const overlayCanvas = overlayLayer.getContext("2d");

const overlay = {
  opacity: 0,
};

const key = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let parsedCollisons;
let collisionBlocks;
let background;
let doors;

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisons = collisionLevel1.parse2d();
      collisionBlocks = parsedCollisons.createObjectsFrom2d();
      player.collisionBlocks = collisionBlocks;
      player.position = {
        x: 200,
        y: 200,
      };
      if (player.currentSprite) {
        player.currentSprite.isActive = false;
      }
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: { default: ["img/backgroundLevel1.png"] },
      });
      doors = [
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
    },
  },
  2: {
    init: () => {
      parsedCollisons = collisionLevel2.parse2d();
      collisionBlocks = parsedCollisons.createObjectsFrom2d();
      player.collisionBlocks = collisionBlocks;
      player.position = {
        x: 100,
        y: 70,
      };
      if (player.currentSprite) {
        player.currentSprite.isActive = false;
      }
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: { default: ["img/backgroundLevel2.png"] },
      });
      doors = [
        new Sprite({
          position: {
            x: 773,
            y: 336,
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
    },
  },
  3: {
    init: () => {
      parsedCollisons = collisionLevel3.parse2d();
      collisionBlocks = parsedCollisons.createObjectsFrom2d();
      player.collisionBlocks = collisionBlocks;
      if (player.currentSprite) {
        player.currentSprite.isActive = false;
      }
      player.position = {
        x: 800,
        y: 150,
      };
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: { default: ["img/backgroundLevel3.png"] },
      });
      doors = [
        new Sprite({
          position: {
            x: 176,
            y: 335,
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
    },
  },
};

const player = new Player({
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
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level == 4) {
              level = 1;
            }
            levels[level].init();
            player.switchSprite("idle");
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
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

function animate() {
  window.requestAnimationFrame(animate);

  objectsCanvas.clearRect(0, 0, objectsLayer.width, objectsLayer.height);
  overlayCanvas.clearRect(0, 0, overlayLayer.width, overlayLayer.height);
  backgroundCanvas.clearRect(
    0,
    0,
    backgroundLayer.width,
    backgroundLayer.height
  );

  background.update(backgroundCanvas);
  doors.forEach((door) => {
    door.update(objectsCanvas);
  });

  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw(objectsCanvas);
  // });
  // player.drawHitbox(objectsCanvas);

  player.update(objectsCanvas);
  player.handleInput(key);

  overlayCanvas.save();
  overlayCanvas.globalAlpha = overlay.opacity;
  overlayCanvas.fillStyle = "black";
  overlayCanvas.fillRect(0, 0, overlayLayer.width, overlayLayer.height);
  overlayCanvas.restore();
}

levels[level].init();
animate();
