import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/interfaces/user';

const prisma = new PrismaClient();

export async function UserSeed() {
  const users: Users[] = [
    { email: 'admin@elab.com', password: 'Admin_123', role: Role.Admin },
    { email: 'nurai@elab.com', password: 'Nurai_456', role: Role.Admin },
    {
      email: 'arman@elab.com',
      password: 'Arman_789',
      role: Role.ProcurementOfficer,
    },
    {
      email: 'bob@elab.com',
      password: 'Bob_123',
      role: Role.ProcurementOfficer,
    },
    { email: 'jane@elab.com', password: 'Jane_432', role: Role.Researcher },
    { email: 'lena@elab.com', password: 'Lena_876', role: Role.Researcher },
    { email: 'mark@elab.com', password: 'Mark_739', role: Role.Researcher },
    { email: 'jack@elab.com', password: 'Jack_720', role: Role.Researcher },
    { email: 'karya@elab.com', password: 'Karya_007', role: Role.Researcher },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
      },
    });
  }
}
