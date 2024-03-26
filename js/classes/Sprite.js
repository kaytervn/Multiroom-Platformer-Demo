class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    offset = { x: 0, y: 0, flippedX: 0 },
    loop = true,
    autoPlay = true,
  }) {
    this.position = position;
    this.imageSrc = imageSrc;
    this.framesCurrent = 0;
    this.scale = scale;
    this.framesElapsed = 0;
    this.framesHold = 2;
    this.image = new Image();
    this.offset = offset;
    this.flipped = false;
    this.loop = loop;
    this.autoPlay = autoPlay;
  }

  drawFlipped() {
    this.image.src = this.imageSrc.flipped[this.framesCurrent];
    c.drawImage(
      this.image,
      this.position.x + this.offset.flippedX,
      this.position.y + this.offset.y,
      this.image.width * this.scale,
      this.image.height * this.scale
    );
  }

  draw() {
    if (this.flipped) {
      this.drawFlipped();
    } else {
      this.image.src = this.imageSrc.default[this.framesCurrent];
      c.drawImage(
        this.image,
        this.position.x + this.offset.x,
        this.position.y + this.offset.y,
        this.image.width * this.scale,
        this.image.height * this.scale
      );
    }
  }

  play() {
    this.autoPlay = true;
  }

  animateFrames() {
    if (!this.autoPlay) return;
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold == 0) {
      if (this.framesCurrent < this.imageSrc.default.length - 1) {
        this.framesCurrent++;
      } else if (this.loop) {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}
