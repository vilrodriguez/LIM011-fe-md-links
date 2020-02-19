const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});
fetchMock.mock('https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s', 200);

fetchMock.mock('https://github.com/merunga/pildora-recursin', 404);
fetchMock.mock('xxxxxxx', { throws: new TypeError('Failed to fetch') });
module.exports = fetchMock;
