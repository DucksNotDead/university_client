export enum EStudyType {
  Lecture = 'Lecture',
  Lab = 'Lab',
  Practice = 'Practice',
  CoursePaper = 'CoursePaper',
}

export const ruStudyTypes: Record<EStudyType, string> = {
  [EStudyType.Lecture]: 'Лекции',
  [EStudyType.Lab]: 'Лабараторные',
  [EStudyType.Practice]: 'Практика',
  [EStudyType.CoursePaper]: 'Курсовая работа',
};
