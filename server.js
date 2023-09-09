const { write } = require("fs");
const http = require("http");
const url = require("url");
require("dotenv").config();

const port = process.env.PORT;
const dayOFTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thursday",
  "Friday",
  "Saturday",
];

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  console.log(query);
  const { slack_name, track } = query;
  let datetime = new Date();
  let utc_time = datetime.toLocaleString();
  let weekDay = dayOFTheWeek[datetime.getDay()];
  if (slack_name && track) {
    const resObj = {
      slack_name: slack_name,
      current_day: weekDay,
      utc_time: utc_time,
      track: track,
      github_file_url:
        "https://github.com/username/repo/blob/main/file_name.ext",
      github_repo_url: "https://github.com/username/repo",
      status_code: 200,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(resObj));
    res.end();
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end('Both "slack_name" and "track" parameters are required.');
  }
});

server.listen(port, () => {
  console.log(`I keep listening at ${port}`);
});
