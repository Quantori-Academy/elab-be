import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/modules/user/interfaces/userEntity.interface';

const prisma = new PrismaClient();

export async function UserSeed() {
  const users: IUser[] = [
    { email: 'admin@elab.com', firstName: "firstName", lastName: "firstName", password: 'Admin_123', role: Role.Admin },
    { email: 'nurai@elab.com',  firstName: "firstName", lastName: "firstName", password: 'Nurai_456', role: Role.Admin },
    {
      email: 'arman@elab.com',
      firstName: "firstName",
      lastName: "firstName",
      password: 'Arman_789',
      role: Role.ProcurementOfficer,
    },
    {
      email: 'bob@elab.com',
      firstName: "firstName",
      lastName: "firstName",
      password: 'Bob_123',
      role: Role.ProcurementOfficer,
    },
    { email: 'jane@elab.com', firstName: "firstName", lastName: "firstName", password: 'Jane_432', role: Role.Researcher },
    { email: 'lena@elab.com', firstName: "firstName", lastName: "firstName", password: 'Lena_876', role: Role.Researcher },
    { email: 'mark@elab.com', firstName: "firstName", lastName: "firstName", password: 'Mark_739', role: Role.Researcher },
    { email: 'jack@elab.com', firstName: "firstName", lastName: "firstName", password: 'Jack_720', role: Role.Researcher },
    { email: 'karya@elab.com',firstName: "firstName", lastName: "firstName", password: 'Karya_007', role: Role.Researcher },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
      },
    });
  }
}
