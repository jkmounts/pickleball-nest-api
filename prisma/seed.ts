import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  const roundsOfHashing = Number(process.env.HASH_ROUNDS);
  const passwordBob = await bcrypt.hash('bob-pass', roundsOfHashing);
  const passwordJim = await bcrypt.hash('jim-pass', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      password: passwordBob,
    },
    create: {
      email: 'test@example.com',
      name: 'Bob Tester',
      password: passwordBob,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'test2@example.com' },
    update: {
      password: passwordJim,
    },
    create: {
      email: 'test2@example.com',
      name: 'Jim Tester',
      password: passwordJim,
    },
  });
  const venue1 = await prisma.venue.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Central Park',
      address: '123 Main St',
      city: 'Louisville',
      state: 'KY',
      zipCode: '40220',
    },
  });
  const court1 = await prisma.court.upsert({
    where: { venueId_courtNumber: { venueId: 1, courtNumber: 1 } },
    update: {},
    create: {
      venueId: venue1.id,
      courtNumber: 1,
    },
  });

  console.log({ user1, user2, venue1, court1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
