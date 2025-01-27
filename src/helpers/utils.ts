import * as bcrypt from 'bcrypt';

const saltRounds = 10; // độ mạnh của password

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log(error);
  }
};
