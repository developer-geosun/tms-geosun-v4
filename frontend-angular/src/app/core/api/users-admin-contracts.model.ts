import {
  ContactChannelContract,
  PersonTypeContract,
  UserProfileContractDto
} from './user-profile-contracts.model';

export type AdminUserRole = 'USER' | 'MANAGER' | 'DRIVER' | 'ADMIN';

export interface UserAdminContractDto {
  id: string;
  email: string;
  role: AdminUserRole;
  availableRoles: AdminUserRole[];
  active: boolean;
  deleted: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  displayName: string;
  profile: UserProfileContractDto;
}

export interface AdminUserListParams {
  email?: string;
  name?: string;
  role?: AdminUserRole;
  active?: boolean;
  deleted?: boolean;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export interface UpdateUserRoleContractRequest {
  role: AdminUserRole;
  /** Обов'язковий при зміні ролі з ADMIN на іншу. */
  superAdminPassword?: string;
}

export interface UpdateUserRolesContractRequest {
  roles: AdminUserRole[];
  /** Обов'язковий при знятті ролі ADMIN. */
  superAdminPassword?: string;
}

export interface UpdateUserActiveContractRequest {
  active: boolean;
}

export type { ContactChannelContract, PersonTypeContract, UserProfileContractDto };
