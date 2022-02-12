const scheme = "https";
const hostname = "api.aleks.tech";

type Stages = {
  production: string;
  development: string;
  test: string;
};
const stages: Stages = {
  production: "journal",
  development: "journal-development",
  test: "journal-development",
};
const stage = stages[process.env.NODE_ENV];

type Paths = {
  getRecent: string;
};
const paths: Paths = {
  getRecent: "recent",
};

export const recent = `${scheme}://${hostname}/${stage}/${paths.getRecent}`;

export default {
  recent,
};
