export enum USERROLE {
  CONTRIBUTOR = "CONTRIBUTOR",
  MAINTAINER = "MAINTAINER",
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: USERROLE;
}
