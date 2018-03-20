import { Team } from './team';
import { User } from '../../ngx-login-client';

export interface Company {
  id: string;
  name: string;
  path: String;
  privateCompany?: boolean;
  teams: Team[];
  defaultTeam: Team;
  attributes: CompanyAttributes;
  type: string;
  links: CompanyLink;
  relationships: CompanyRelationships;
  relationalData?: RelationalData;
}

export class CompanyLink {
  self: string;
  filters?: string;
  workitemlinktypes?: string;
  workitemtypes?: string;
}

export class CompanyRelationships {
  ownedBy: CompanyOwner;
}

export class CompanyOwner {
  data: {
    id: string;
    type: string;
  };
}

export class CompanyAttributes {
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  version: number;
}

export class RelationalData {
  owner?: User;
}
