import path from "path";

const createPath = (page) =>
  path.resolve(__dirname, "../views", `${page}.html`);

export default createPath;
