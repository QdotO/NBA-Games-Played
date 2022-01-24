export interface IPlayer {
  firstName: string;
  lastName: string;
}

class Player implements IPlayer {
  public firstName: string;
  public lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export default Player;
