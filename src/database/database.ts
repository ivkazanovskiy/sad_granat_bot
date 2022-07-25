import * as fs from 'fs/promises';
import path from 'path';
import { EDate, ETime } from '../types/date.type';
import { ERole } from '../types/user.type';
import { TUserJson } from './types/user.type';

class DB {
  public data: { [K: string]: TUserJson } = {};

  private path: string;

  constructor(private readonly name: string) {
    this.path = path.join(__dirname, `${name}.json`);
  }

  initData = async () => {
    const dir = await fs.readdir(__dirname);
    if (!dir.includes(`${this.name}.json`)) {
      return this.storeData();
    }

    const stringData = (await fs.readFile(this.path, 'utf8')) || '{}';
    this.data = JSON.parse(stringData);
  };

  private storeData = () =>
    fs.writeFile(this.path, JSON.stringify(this.data, null, 2));

  addUser = async (tlgId: number): Promise<TUserJson> => {
    const prevUser = this.getUser(tlgId);
    if (prevUser) {
      return prevUser;
    }
    const user: TUserJson = {
      tlgId,
      isAuthorized: false,
      role: ERole.user,
      subs: [],
    };
    this.data[user.tlgId] = user;
    await this.storeData();
    return user;
  };

  saveUser = async (user: TUserJson) => {
    this.data[user.tlgId] = user;
    await this.storeData();
  };

  getUser = (tlgId: number | string): TUserJson | undefined => this.data[tlgId];

  getUnauthorizedUsers = (): TUserJson[] => {
    const pack: TUserJson[] = [];
    Object.values(this.data).forEach((user) => {
      if (!user.isAuthorized) pack.push(user);
    });
    return pack;
  };

  getOtherUsers = (userToExclude: TUserJson): TUserJson[] => {
    const pack: TUserJson[] = [];
    Object.values(this.data).forEach((user) => {
      if (user.tlgId !== userToExclude.tlgId) pack.push(user);
    });
    return pack;
  };

  getUsersByTime = ({
    date,
    time,
  }: {
    date: EDate;
    time: ETime;
  }): TUserJson[] => {
    const pack: TUserJson[] = [];
    Object.values(this.data).forEach((user) => {
      if (user.subs.some((sub) => sub.date === date && sub.time === time)) {
        pack.push(user);
      }
    });
    return pack;
  };

  authorizeUser = async (
    tlgId: number | string,
  ): Promise<TUserJson | undefined> => {
    const user = this.getUser(tlgId);
    if (!user) return undefined;
    user.isAuthorized = true;
    await this.saveUser(user);
    return user;
  };

  setUserAsAdmin = async (user: TUserJson): Promise<TUserJson> => {
    user.isAuthorized = true;
    user.role = ERole.admin;
    await this.saveUser(user);
    return user;
  };
}

export const db = new DB('users');
