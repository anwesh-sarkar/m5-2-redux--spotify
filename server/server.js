const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const port = 5678;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/spotify_access_token", async (req, res, next) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;

  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.
  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );

  // TODO: use authString in a request to Spotify!
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: POST,
    body: "grant-type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString} `,
    },
  }).then((res) => res.json());

  res.send({ response: response });
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});
