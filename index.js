// Add Express
import express from "express";
import fetch, { Headers } from "node-fetch";
import cors from "cors";

// Initialize Express
const app = express();
app.use(cors());

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// craete get request on the route tweet
app.get("/tweet", (req, res) => {
  const { username } = req.query;
  console.log(username, "username");
  var resultResponse = {};
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer AAAAAAAAAAAAAAAAAAAAAFWXigEAAAAAKQvyXCorV1sShjkA5hYbemHL1SA%3DVAtQKENuokaBkGsBVER7dy5HFuyKUOxjQr18CQp49uuvtm3p60"
    );
    myHeaders.append(
      "Cookie",
      'guest_id=v1%3A166981474033394623; guest_id_ads=v1%3A166981474033394623; guest_id_marketing=v1%3A166981474033394623; personalization_id="v1_z+ynCsP5iT6aH5/YIVs5Qg=="'
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // return fetched data from twitter api and return response of the fetch request
    const data = fetch(
      `https://api.twitter.com/2/users/by?usernames=${username}&user.fields=created_at,description&expansions=pinned_tweet_id`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "result");
        resultResponse = result;
        res.status(200).json(resultResponse);
      })
      .catch((error) => {
        console.log("error", error);
        res.status(500).json(error);
      });

    // console.log(resultResponse, "resultResponse");
    // return res.status(200).json(resultResponse)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// Initialize server
app.listen(3000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
export default app;
