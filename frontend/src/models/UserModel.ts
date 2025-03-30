export interface UserModel {
    id: number;
    email: string;
    token: string;
    password: string;
    name: string;
    role: string;
    role_id?: number;
}


export interface RoleModel {
    id: number;
    name: string;
}