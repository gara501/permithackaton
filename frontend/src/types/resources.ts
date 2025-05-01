export interface Action {
  name: string;
  description: string | null;
  attributes: Record<string, any> | null;
  id: string;
  key: string;
}

export interface Attribute {
  type: string;
  description: string | null;
  id: string;
  key: string;
}

export interface Role {
  name: string;
  description: string;
  permissions: string[];
  attributes: Record<string, any>;
  extends: string[];
  granted_to: any;
  key: string;
  id: string;
  organization_id: string;
  project_id: string;
  environment_id: string;
  resource_id: string;
  resource: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  key: string;
  id: string;
  organization_id: string;
  project_id: string;
  environment_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  urn: string;
  description: string | null;
  actions: Record<string, Action>;
  type_attributes: Record<string, any> | null;
  attributes: Record<string, Attribute>;
  roles: Record<string, Role>;
  relations: Record<string, any>;
  action_groups: Record<string, any>;
}
