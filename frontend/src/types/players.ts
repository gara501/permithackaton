export interface Player {
  key: string;
  first_name: string;
  roles: PlayerRole[];
  attributes: PlayerAttributes;
  created_at: string;
}

export interface PlayerRole {
  role: string;
  tenant: string;
}

export interface PlayerAttributes {
  type: string;
}
