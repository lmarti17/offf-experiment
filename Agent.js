var Agent = function(noiseZRange, agentAlpha) {
  this.vector = myp5.createVector(
    myp5.random(0, myp5.width),
    myp5.random(0, myp5.height)
  );
  this.vectorOld = this.vector.copy();
  this.stepSize = myp5.random(1, 5);
  this.alpha = agentAlpha / 100;
  this.angle;
  this.noiseZ = myp5.random(noiseZRange);
  this.colors = ["245,83,79", "130, 241, 214"];
  this.color = this.updateColor(
    this.colors[Math.floor(Math.random() * this.colors.length - 1) + 1]
  );
};

Agent.prototype.updateColor = function(color) {
  return `rgba(${color},${this.alpha})`;
};

Agent.prototype.update = function(strokeWidth, noiseZVelocity, agentColor) {
  this.vector.x += myp5.cos(this.angle) * this.stepSize;
  this.vector.y += myp5.sin(this.angle) * this.stepSize;

  // Handle canvas edges
  if (this.vector.x < 0) this.vector.x = this.vectorOld.x = myp5.width;
  if (this.vector.x > myp5.width) this.vector.x = this.vectorOld.x = 0;
  if (this.vector.y < 0) this.vector.y = this.vectorOld.y = myp5.height;
  if (this.vector.y > myp5.height) this.vector.y = this.vectorOld.y = 0;

  // Draw agent
  myp5.strokeWeight(strokeWidth * this.stepSize);
  myp5.stroke(this.color);
  myp5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);

  this.vectorOld = this.vector.copy();
  this.noiseZ += noiseZVelocity;
};

Agent.prototype.update1 = function(
  strokeWidth,
  noiseScale,
  noiseStrength,
  noiseZVelocity,
  agentColor
) {
  this.angle =
    myp5.noise(
      this.vector.x / noiseScale,
      this.vector.y / noiseScale,
      this.noiseZ
    ) * noiseStrength;

  this.update(strokeWidth, noiseZVelocity, agentColor);
};
