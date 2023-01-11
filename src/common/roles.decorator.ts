import { SetMetadata } from '@nestjs/common';

export const HasRoles = (role: 'USER' | 'SELLER') => SetMetadata('role', role);
