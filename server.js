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
  const path = url.parse(req.url, true).pathname;
  console.log(url.parse(req.url, true));
  const { slack_name, track } = query;
  let datetime = new Date();
  let utc_time = datetime.toISOString();
  let weekDay = dayOFTheWeek[datetime.getDay()];
  if (path.startsWith("/api")) {
    if (slack_name && track) {
      const resObj = {
        slack_name: slack_name,
        current_day: weekDay,
        utc_time: utc_time,
        track: track,
        github_file_url:
          "https://github.com/xGiye/api_response/blob/main/server.js",
        github_repo_url: "https://github.com/xGiye/api_response",
        status_code: 200,
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(resObj));
      res.end();
      console.log("resObj sent");
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end('Both "slack_name" and "track" parameters are required.');
    }
  } else {
    // If the path doesn't start with "/api/", return a 404 Not Found response
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end('Endpoint should contain "/api"');
  }
});

server.listen(port, () => {
  console.log(`I keep listening at ${port}`);
});
