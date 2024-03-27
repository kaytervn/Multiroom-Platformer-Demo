class CollisonBlock {
  constructor({ position }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
  }

  draw(layerCanvas) {
    layerCanvas.fillStyle = "rgba(255, 0, 0, 0.5)";
    layerCanvas.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
