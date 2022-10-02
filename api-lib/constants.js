import { nanoid } from 'nanoid';

export const ValidateProps = {
  admin: {
    email: { type: 'string', minLength: 1, maxLength: 255 },
    password: { type: 'string', minLength: 0, maxLength: 10000 },
    role: { type: 'string', minLength: 0, maxLength: 20 },
  },
};
