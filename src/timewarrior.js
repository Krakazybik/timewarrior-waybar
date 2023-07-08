const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const TIME_CMD = "timew";
const TIME_NOT_ACTIVE = "There is no active time tracking.";
const ICON_INACTIVE = "󱎬";
const ICON_ACTIVE = "󱫠";

const getTimeW = async (cmd = TIME_CMD) => {
  try {
    const { stdout } = await exec(cmd);

    const out = stdout.toString();
    const lines = out.split("\n");
    const [title, , , total] = lines;
    const active = !title.includes(TIME_NOT_ACTIVE);

    return {
      active,
      title,
      druation: total.split("Total")[1].trim(),
    };
  } catch (e) {
    return {
      active: false,
      title: "No active time tracking.",
      druation: "",
    };
  }
};

const bootstrap = async () => {
  const { active, title, druation } = await getTimeW();

  if (!active) {
    console.log(`${ICON_INACTIVE}  ${title}`);
    return;
  }

  console.log(`${ICON_ACTIVE}  ${title} ${druation}`);
};

bootstrap();
