export interface ManageUserDto{
  role?: string;
  firstName?:string,
  lastName?:string,
  username?:string,
  email?:string;
  phone?:number;
  address?:string;
  isNotLocked?:boolean;
  status?:boolean
  remark?:string
}
