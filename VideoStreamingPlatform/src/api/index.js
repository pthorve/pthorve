const path = require('path');
const readJson = require('fs-extra').readJsonSync;
const faker = require('faker');
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-cors'));

const sleep = (ms = 500) => new Promise(r => setTimeout(r, ms));
const contentTypeHeaders = {
  'Content-Type': 'application/json'
};

const countries = [
  { id: 'in', label: 'India', languages: ['hindi', 'english'] },
  { id: 'id', label: 'Indonesia', languages: ['bahasa', 'english'] },
  { id: 'my', label: 'Malaysia', languages: ['english'] }
];

const data = {};

data.home = readJson(
  path.resolve(process.cwd(), 'src', 'api', 'data', 'home.json')
);

data.playlist = readJson(
  path.resolve(process.cwd(), 'src', 'api', 'data', 'playlist.json')
);

fastify.get('/api/countries', async (req, res) => {
  await sleep();
  res
    .code(200)
    .headers(contentTypeHeaders)
    .send(countries);
});

fastify.get('/api/location', async (req, res) => {
  await sleep();
  res
    .code(200)
    .headers(contentTypeHeaders)
    .send({ id: 'in', label: 'India' });
});

fastify.get('/api/config/:country', async (req, res) => {
  await sleep();
  const config = countries.find(country => country.id === req.params.country);
  res
    .code(200)
    .headers(contentTypeHeaders)
    .send({
      ...config,
      ads: true,
      continueWatch: true,
      adBlockers: 'block'
    });
});

fastify.get('/api/categories', async (req, res) => {
  await sleep();

  res
    .code(200)
    .headers(contentTypeHeaders)
    .send([
      { id: 'movies', label: 'Movies' },
      { id: 'korean_drama', label: 'Korean Drama' },
      { id: 'originals', label: 'Viu Originals' }
    ]);
});

fastify.get('/api/video/:id', async (req, res) => {
  await sleep();
  const hrefs = ['https://vjs.zencdn.net/v/oceans.mp4'];
  const video = {
    title: faker.fake('{{lorem.words}}'),
    id: req.params.id,
    description: faker.fake('{{lorem.sentences}}'),
    href: hrefs[Math.floor(Math.random() * hrefs.length)]
  };

  res
    .code(200)
    .headers(contentTypeHeaders)
    .send(video);
});

fastify.get('/api/playlist/:id', async (req, res) => {
  await sleep();
  const { playlist } = data;
  playlist.id = req.params.id;
  res
    .code(200)
    .headers(contentTypeHeaders)
    .send(playlist);
});

fastify.get('/api/home', async (_, res) => {
  await sleep();
  res
    .code(200)
    .headers(contentTypeHeaders)
    .send(data.home);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8888);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
