export function NodeCreator(...args) {
  const [id, x, y, type, size, label, img, style] = args;
  this.id = id;
  this.x = x;
  this.y = y;
  this.type = type;
  this.img = img;
  this.style = style;
  this.label = label;
  this.labelCfg = {
    position: 'bottom',
  };
  this.size = size;
  this.anchorPoints = [
    [1, 0.5],
    [0, 0.5],
  ];
}

export function EdgeCreator(...args) {
  const [source, target, type, style] = args;
  this.source = source;
  this.target = target;
  this.color = '#ff0000';
  this.size = 1;
  this.type = type;
  this.sourceAnchor = 0;
  this.targetAnchor = 1;
  this.style = style;
}
