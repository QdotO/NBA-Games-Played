import { Response } from 'supertest';
import { IUser } from '@entities/Player';


export interface IResponse extends Response {
    body: {
        users: IUser[];
        error: string;
    };
}

export interface IReqBody {
    user?: IUser;
}
