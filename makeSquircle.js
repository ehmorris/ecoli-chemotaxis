// Extracted from Figma with corner radius set to 24px and smooth corners set
// to 60%, then used https://yqnn.github.io/svg-path-editor/ to convert path
// to relative
const make24pxCornerRadiusSquirclePath = (width, height) => {
  return `m 0 38.4
c 0 -13.4413 0 -20.1619 2.6158 -25.2958
c 2.301 -4.5159 5.9725 -8.1874 10.4884 -10.4884
c 5.1339 -2.6158 11.8545 -2.6158 25.2958 -2.6158
h ${width - 76.8}
c 13.441 0 20.162 0 25.296 2.6158
c 4.516 2.301 8.187 5.9725 10.488 10.4884
c 2.616 5.1339 2.616 11.8545 2.616 25.2958
v ${height - 76.8}
c 0 13.4413 0 20.1619 -2.616 25.2958
c -2.301 4.5159 -5.972 8.1874 -10.488 10.4884
c -5.134 2.6158 -11.855 2.6158 -25.296 2.6158
h ${-width + 76.8}
c -13.4413 0 -20.1619 0 -25.2958 -2.6158
c -4.5159 -2.301 -8.1874 -5.9725 -10.4884 -10.4884
c -2.6158 -5.1339 -2.6158 -11.8545 -2.6158 -25.2958
v ${-height + 76.8}
z`;
};

export const makeSquircleSVGClipMask = (id, width, height) => {
  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", 0);
  svgEl.setAttribute("height", 0);
  svgEl.setAttribute("fill", "none");

  const defsEl = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  const clipPathEl = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "clipPath"
  );
  clipPathEl.setAttribute("id", id);

  const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathEl.setAttribute("d", make24pxCornerRadiusSquirclePath(width, height));

  clipPathEl.append(pathEl);
  defsEl.append(clipPathEl);
  svgEl.append(defsEl);

  return svgEl;
};
