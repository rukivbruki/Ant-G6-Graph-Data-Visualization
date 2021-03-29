const express = require(`express`);
const PORT = process.env.PORT || 5000;

express()
  .get(`/`, (req, res) => {
    res.append(`X-Author`, `rukivbruki`);
    res.append(`Content-Type`, `application/javascript; charset=UTF-8`);
    res.append(`Access-Control-Allow-Origin`, [`*`]);
    res.send(`rukivbruki`);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
