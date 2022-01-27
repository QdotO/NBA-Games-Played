//getGamesPlayed.test.js

/*
MESSAGE TO REVIEWER: This is not how I would usually test 
but I dont have time or a long term need 
to do this the way I would prefer to
*/

const { apiFailureError } = require('../../dist/shared/constants');
const { getPlayerData } = require('../../dist/services/PlayerService');
const playerResponse = require('./testdata/playerResponse');
jest.mock('../../dist/services/PlayerService');
getPlayerData.mockImplementation(() => {
  return Promise.resolve(playerResponse);
});
const { getSeasonData } = require('../../dist/services/SeasonService');
jest.mock('../../dist/services/SeasonService');

const { getGamesPlayed } = require('../../dist/routes/Players');

test('return a Lebron James games played object', async () => {
  getSeasonData
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 69, season: 2014 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 76, season: 2015 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 74, season: 2016 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 82, season: 2017 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 55, season: 2018 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 67, season: 2019 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 45, season: 2020 }] },
    });

  const req = {
    query: {
      firstName: 'Lebron',
      lastName: 'James',
    },
  };
  let returnedObj = {};
  const res = {
    status: () => {
      return {
        send: (obj) => {
          returnedObj = obj;
        },
      };
    },
  };
  await getGamesPlayed(req, res);
  expect(returnedObj).toEqual({
    PlayerName: 'Lebron James',
    GamesPlayed: { Above50: 6, Below50: 1 },
  });
});

test('return a Lebron James games played object with an empty season response', async () => {
  getSeasonData
    .mockResolvedValueOnce({
      data: { data: [] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 76, season: 2015 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 74, season: 2016 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 82, season: 2017 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 55, season: 2018 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 67, season: 2019 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 45, season: 2020 }] },
    });

  const req = {
    query: {
      firstName: 'Lebron',
      lastName: 'James',
    },
  };
  let returnedObj = {};
  const res = {
    status: () => {
      return {
        send: (obj) => {
          returnedObj = obj;
        },
      };
    },
  };
  await getGamesPlayed(req, res);
  expect(returnedObj).toEqual({
    PlayerName: 'Lebron James',
    GamesPlayed: { Above50: 5, Below50: 1 },
  });
});

test('return a Lebron James games played object with a rejected call', async () => {
  getSeasonData
    .mockImplementationOnce(() => {
      return Promise.reject(Error('Season data unavailable'));
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 69, season: 2014 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 76, season: 2015 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 74, season: 2016 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 82, season: 2017 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 55, season: 2018 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 67, season: 2019 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 45, season: 2020 }] },
    });

  const req = {
    query: {
      firstName: 'Lebron',
      lastName: 'James',
    },
  };
  let returnedObj = {};
  const res = {
    status: () => {
      return {
        send: (obj) => {
          returnedObj = obj;
        },
      };
    },
  };
  await getGamesPlayed(req, res);
  expect(returnedObj).toEqual({
    PlayerName: 'Lebron James',
    GamesPlayed: { Above50: 0, Below50: 0 },
  });
});

test('return a Lebron James games played object with a rejected season call', async () => {
  getSeasonData
    .mockImplementationOnce(() => {
      return Promise.reject(Error('Season data unavailable'));
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 69, season: 2014 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 76, season: 2015 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 74, season: 2016 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 82, season: 2017 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 55, season: 2018 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 67, season: 2019 }] },
    })
    .mockResolvedValueOnce({
      data: { data: [{ games_played: 45, season: 2020 }] },
    });

  const req = {
    query: {
      firstName: 'Lebron',
      lastName: 'James',
    },
  };
  let returnedObj = {};
  const res = {
    status: () => {
      return {
        send: (obj) => {
          returnedObj = obj;
        },
      };
    },
  };
  await getGamesPlayed(req, res);
  expect(returnedObj).toEqual({
    PlayerName: 'Lebron James',
    GamesPlayed: { Above50: 0, Below50: 0 },
  });
});

test('return a Lebron James games played object with a rejected season call', async () => {
  getPlayerData.mockImplementation(() => {
    return Promise.reject(new Error('Player Data unavailable'));
  });

  const req = {
    query: {
      firstName: 'Lebron',
      lastName: 'James',
    },
  };
  let returnedObj = {};
  const res = {
    status: () => {
      return {
        send: (obj) => {
          returnedObj = obj;
        },
      };
    },
  };
  await getGamesPlayed(req, res);
  expect(returnedObj).toEqual(apiFailureError);
});
