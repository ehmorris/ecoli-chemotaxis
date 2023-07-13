// Radius is always 24px
const make24pxSquircle = (width, height) => {
  return `M0 26.8063C0 17.4232 0 12.7317 1.54327 9.1478C2.90077 5.99535 5.06687 3.43232 7.73111 1.82607C10.7599 0 14.7249 0 22.6549 0H${
    width - 22.655
  }C${width - 14.725} 0 ${width - 10.76} 0 ${width - 7.731} 1.82607C${
    width - 5.067
  } 3.43232 ${width - 2.901} 5.99535 ${
    width - 1.543
  } 9.1478C${width} 12.7317 ${width} 17.4232 ${width} 26.8063V${
    height - 26.806
  }C${width} ${height - 17.423} ${width} ${height - 12.732} ${width - 1.543} ${
    height - 9.148
  }C${width - 2.901} ${height - 5.995} ${width - 5.067} ${height - 3.432} ${
    width - 7.731
  } ${height - 1.826}C${width - 10.76} ${height} ${width - 14.725} ${height} ${
    width - 22.655
  } ${height}H22.6549C14.7249 ${height} 10.7599 ${height} 7.73111 ${
    height - 1.826
  }C5.06687 ${height - 3.432} 2.90077 ${height - 5.995} 1.54327 ${
    height - 9.148
  }C0 ${height - 12.732} 0 ${height - 17.423} 0 ${height - 26.806}V26.8063Z`;
};

export const makeSquircleSVG = (width, height, color) => {
  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", width);
  svgEl.setAttribute("height", height);
  svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svgEl.setAttribute("fill", "none");

  const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathEl.setAttribute("fill", color);
  pathEl.setAttribute("d", make24pxSquircle(width, height));

  svgEl.append(pathEl);

  return svgEl;
};
