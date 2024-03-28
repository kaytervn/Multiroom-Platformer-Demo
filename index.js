const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

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
let door;

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
        imageSrc: {
          default: createImageSrc({
            path: "img",
            fileName: "backgroundLevel1",
            count: 1,
          }),
        },
      });
      door = new Sprite({
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
      });
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
        imageSrc: {
          default: createImageSrc({
            path: "img",
            fileName: "backgroundLevel2",
            count: 1,
          }),
        },
      });
      door = new Sprite({
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
      });
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
        imageSrc: {
          default: createImageSrc({
            path: "img",
            fileName: "backgroundLevel3",
            count: 1,
          }),
        },
      });
      door = new Sprite({
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
      });
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

  background.update();
  door.update();

  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw();
  // });
  // player.drawHitbox();

  player.update();
  player.handleInput(key);

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();
