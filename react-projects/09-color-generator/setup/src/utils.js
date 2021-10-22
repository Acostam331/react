function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function oppositeHex(r, g, b) {
  return (
    componentToHex(255 - r) + componentToHex(255 - g) + componentToHex(255 - b)
  );
}

export default oppositeHex;
