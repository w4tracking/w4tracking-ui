import { Company } from './../models/company';
import { User } from '../../ngx-login-client';
import { ContextType } from './context-type';

export interface Context {
  // The entity that this context is for
  user: User;
  company?: Company;
  type: ContextType;
  path: string;
  name: string;
}
