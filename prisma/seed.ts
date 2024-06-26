import { PrismaClient, Role, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

async function main() {
  const prisma = new PrismaClient();

  await prisma.$transaction([
    prisma.claim.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Create back-office agent
  await prisma.user.create({
    data: {
      email: 'backoffice@admin.co',
      hash: await argon.hash('pw1234'),
      role: Role.BO_AGENT,
    },
  });

  // Create users
  for (let i = 0; i < 2; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    await prisma.user.create({
      data: {
        email: faker.internet.email({
          firstName: firstName,
          lastName: lastName,
          provider: 't-mail.co',
        }),
        hash: await argon.hash('pw1234'),
        fullName: `${firstName} ${lastName}`,
        phoneNumber: faker.phone.number('(+212)6 ###-#####'),
        bio: faker.lorem.paragraph(),
      },
    });
  }

  // Create claims for each customer
  const users = await prisma.user.findMany({
    where: { role: Role.CUSTOMER },
  });
  for (const user of users) {
    for (let i = 0; i < 3; i++) {
      await prisma.claim.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          status: faker.helpers.arrayElement([
            Status.PENDING,
            Status.ONGOING,
            Status.CANCELLED,
          ]),
          user: {
            connect: { id: user.id },
          },
        },
      });
    }
  }
}

main();
