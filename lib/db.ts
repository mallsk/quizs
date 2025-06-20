import { prisma } from "@/lib/prisma";

type UserData = {
  googleId: string;
  name: string;
  email: string;
  image: string;
};

interface QuizAttemptData {
  userId: string;
  topic: string;
  questions: any;
  userAnswers: any;
  score: number;
}

export async function findOrCreateUser(user: UserData) {
  const existingUser = await prisma.user.findUnique({
    where: { googleId: user.googleId },
  });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: {
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
}

export async function findUser(googleId: string) {
  return prisma.user.findUnique({
    where: { googleId },
  });
}

export async function createQuizAttempt(data: QuizAttemptData) {
  const { userId, topic, questions, userAnswers, score } = data;

  return prisma.quizAttempt.create({
    data: {
      userId,
      topic,
      questions,
      userAnswers,
      score,
    },
  });
}

export async function getQuiz(userId: string) {
  return prisma.quizAttempt.findMany({
    where: { userId },
  });
}
