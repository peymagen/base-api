import { type BaseSchema } from "../../common/dto/base.dto";

export interface IUser extends BaseSchema {
  email: string;
  password?: string;
}
