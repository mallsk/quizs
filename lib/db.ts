import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

type UserData = {
  googleId: string;
  name: string;
  email: string;
  image: string;
};

export async function findOrCreateUser(user: UserData) {
  const existingUser = await prisma.user.findUnique({
    where: { googleId: user.googleId },
  });

  if (existingUser) {
    const updatedUser = await prisma.user.update({
      where: { googleId: user.googleId },
      data: {
        name: user.name,
        image: user.image,
      },
    });

    return updatedUser;
  }

  const newUser = await prisma.user.create({
    data: {
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });

  return newUser;
}

