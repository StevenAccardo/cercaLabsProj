const axios = require('axios');

module.exports = {
  //Handles string reversal
  str(req, res) {
    const str = req.body.str;
    if(str) res.send(str.split('').reverse().join(''));
  },
  //Handles request
  api(req, res, next) {
    const { url, method } = req.body;

    if(url && method) {
      const response = method === 'get'
      ? axios.get(url)
      : axios.post(url);

      response.then(({ data }) => res.send(data))
      .catch(err => {
        console.log('Error: ', err);
        next(err);
      })
    } else{
      res.status(400).send('Please retry your request');
    }
  }
}
