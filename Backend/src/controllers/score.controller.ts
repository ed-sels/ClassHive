import { Request, Response } from 'express';
import prisma from '../utils/prisma.js';

export const saveScore = async (req: Request, res: Response) => {
  try {
    const { studentId, subjectId, test1, test2, groupWork, projectWork, examScore } = req.body;

    const classScore = (test1 || 0) + (test2 || 0) + (groupWork || 0) + (projectWork || 0);
    const convertedClassScore = (classScore / 100) * 50;
    const convertedExamScore = (examScore / 100) * 50;
    const finalScore = convertedClassScore + convertedExamScore;

    // Simple grading logic (placeholder)
    let grade = 'F';
    if (finalScore >= 80) grade = 'A';
    else if (finalScore >= 70) grade = 'B';
    else if (finalScore >= 60) grade = 'C';
    else if (finalScore >= 50) grade = 'D';

    const score = await prisma.score.upsert({
      where: {
        studentId_subjectId: {
          studentId,
          subjectId,
        },
      },
      update: {
        test1,
        test2,
        groupWork,
        projectWork,
        examScore,
        finalScore,
        grade,
      },
      create: {
        studentId,
        subjectId,
        test1,
        test2,
        groupWork,
        projectWork,
        examScore,
        finalScore,
        grade,
      },
    });

    res.json({ message: 'Score saved successfully', score });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStudentScores = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const scores = await prisma.score.findMany({
      where: { studentId: studentId as string },
      include: { subject: true },
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
