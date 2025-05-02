export interface Player {
  key: string;
  name: string;
  permissions: string[];
}

export interface PlayerRole {
  role: string;
  tenant: string;
}

export interface PlayerAttributes {
  type: string;
}

export interface Abilities {
  [key: string]: Ability;
}

export interface Ability {
  item: string;
  actions?: string[];
}
