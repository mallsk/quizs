import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

type UserData = {
  googleId: string;
  name: string;
  email: string;
  image: string;
};

interface QuizAttemptData {
  userId: string;
  topic: string;
  questions: any;     // JSON object/array of questions with correct answers
  userAnswers: any;   // JSON object/array of user-selected answers
  score: number;
}

export async function findOrCreateUser(user: UserData) {
  const existingUser = await prisma.user.findUnique({
    where: { googleId: user.googleId },
  });

  if (existingUser) {
    return existingUser;
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

export async function createQuizAttempt(data: QuizAttemptData) {
  const { userId, topic, questions, userAnswers, score } = data;

  const quizAttempt = await prisma.quizAttempt.create({
    data: {
      userId,
      topic,
      questions,
      userAnswers,
      score,
    },
  });

  return quizAttempt;
}