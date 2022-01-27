// Put shared constants here

export const paramMissingError =
  'One or more of the required parameters was missing.';

export const badParamError =
  'One or more of the required parameters is in an invalid format';

export const apiFailureError = `Sorry, currently we are unable to retrive player games played data`;

//Endpoints
const ballDontLieUrl = 'https://www.balldontlie.io/api/v1/';
export const playersUrl = `${ballDontLieUrl}players`;
export const seasonAvgsUrl = `${ballDontLieUrl}season_averages`;

//Defaults
export const defaults = {
  seasons: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
  firstName: 'lebron',
  lastName: 'james',
};
