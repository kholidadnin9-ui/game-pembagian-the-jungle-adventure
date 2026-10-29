```typescript
export interface Question {
  id: number;
  dividend: number;
  divisor: number;
  quotient: number;
  options: number[];
  hint?: string;
}

export interface LevelConfig {
  id: number;
  title: string;
  name: string;
  description: string;
  color: string;
  badgeBg: string;
  gradient: string;
  borderColor: string;
  shadowColor: string;
  questions: Question[];
}

/**
 * Mengacak urutan array tanpa mengubah array asli.
 * Menggunakan Fisher-Yates Shuffle.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Mengacak pilihan jawaban.
 * Jawaban benar tetap disertakan tepat satu kali.
 */
export function shuffleOptions(question: Question): Question {
  const correctAnswer = question.quotient;

  // Buat pilihan pengecoh yang berbeda dari jawaban benar.
  const distractors = [
    ...new Set(
      question.options.filter(
        (option) => option !== correctAnswer
      )
    ),
  ];

  // Tambahkan pengecoh jika data awal belum menyediakan 2 pilihan salah.
  let offset = 1;

  while (distractors.length < 2) {
    const candidate =
      correctAnswer + (offset % 2 === 1 ? offset : -offset);

    if (
      candidate >= 0 &&
      candidate !== correctAnswer &&
      !distractors.includes(candidate)
    ) {
      distractors.push(candidate);
    }

    offset++;
  }

  // Pastikan hanya ada 3 pilihan unik dan satu jawaban benar.
  const options = shuffleArray([
    correctAnswer,
    ...distractors.slice(0, 2),
  ]);

  return {
    ...question,
    options,
  };
}

/**
 * Mengacak urutan soal dan posisi jawaban untuk satu level.
 * Gunakan saat permainan dimulai atau level dipilih.
 */
export function shuffleQuestions(
  questions: Question[]
): Question[] {
  return shuffleArray(questions).map(shuffleOptions);
}

export const LEVEL_DATA: LevelConfig[] = [
  {
    id: 1,
    title: 'Level 1',
    name: 'Dasar 1 & 2',
    description: 'Pembagian mudah angka 1 & 2 (Hasil 1 - 10)',
    color: '#22c55e',
    badgeBg: 'bg-emerald-500',
    gradient: 'from-emerald-400 to-green-600',
    borderColor: '#15803d',
    shadowColor: '#14532d',
    questions: [
      { id: 101, dividend: 6, divisor: 2, quotient: 3, options: [3, 2, 4], hint: '6 dibagi 2 sama dengan berapa?' },
      { id: 102, dividend: 8, divisor: 2, quotient: 4, options: [3, 4, 5], hint: '8 kue dibagi untuk 2 teman' },
      { id: 103, dividend: 10, divisor: 2, quotient: 5, options: [5, 4, 6], hint: '10 apel dibagi 2 kelompok' },
      { id: 104, dividend: 4, divisor: 2, quotient: 2, options: [1, 2, 3] },
      { id: 105, dividend: 12, divisor: 2, quotient: 6, options: [5, 6, 7] },
      { id: 106, dividend: 14, divisor: 2, quotient: 7, options: [6, 7, 8] },
      { id: 107, dividend: 5, divisor: 1, quotient: 5, options: [4, 5, 1] },
      { id: 108, dividend: 16, divisor: 2, quotient: 8, options: [7, 8, 9] },
      { id: 109, dividend: 18, divisor: 2, quotient: 9, options: [8, 9, 10] },
      { id: 110, dividend: 20, divisor: 2, quotient: 10, options: [9, 10, 8] },
    ],
  },
  {
    id: 2,
    title: 'Level 2',
    name: 'Bagi 3 & 4',
    description: 'Pembagian ceria angka 3 & 4 (Hasil 1 - 10)',
    color: '#0ea5e9',
    badgeBg: 'bg-sky-500',
    gradient: 'from-sky-400 to-blue-600',
    borderColor: '#0369a1',
    shadowColor: '#0c4a6e',
    questions: [
      { id: 201, dividend: 9, divisor: 3, quotient: 3, options: [2, 3, 4] },
      { id: 202, dividend: 12, divisor: 3, quotient: 4, options: [3, 4, 5] },
      { id: 203, dividend: 15, divisor: 3, quotient: 5, options: [4, 5, 6] },
      { id: 204, dividend: 16, divisor: 4, quotient: 4, options: [3, 4, 5] },
      { id: 205, dividend: 20, divisor: 4, quotient: 5, options: [4, 5, 6] },
      { id: 206, dividend: 18, divisor: 3, quotient: 6, options: [5, 6, 7] },
      { id: 207, dividend: 24, divisor: 4, quotient: 6, options: [6, 7, 8] },
      { id: 208, dividend: 21, divisor: 3, quotient: 7, options: [6, 7, 8] },
      { id: 209, dividend: 28, divisor: 4, quotient: 7, options: [7, 8, 9] },
      { id: 210, dividend: 36, divisor: 4, quotient: 9, options: [8, 9, 10] },
    ],
  },
  {
    id: 3,
    title: 'Level 3',
    name: 'Bagi 5 & 10',
    description: 'Pembagian seru angka 5 & 10 (Hasil 1 - 10)',
    color: '#f97316',
    badgeBg: 'bg-orange-500',
    gradient: 'from-amber-400 to-orange-600',
    borderColor: '#c2410c',
    shadowColor: '#7c2d12',
    questions: [
      { id: 301, dividend: 15, divisor: 5, quotient: 3, options: [2, 3, 4] },
      { id: 302, dividend: 20, divisor: 5, quotient: 4, options: [3, 4, 5] },
      { id: 303, dividend: 25, divisor: 5, quotient: 5, options: [4, 5, 6] },
      { id: 304, dividend: 30, divisor: 5, quotient: 6, options: [5, 6, 7] },
      { id: 305, dividend: 30, divisor: 10, quotient: 3, options: [2, 3, 4] },
      { id: 306, dividend: 35, divisor: 5, quotient: 7, options: [6, 7, 8] },
      { id: 307, dividend: 40, divisor: 5, quotient: 8, options: [7, 8, 9] },
      { id: 308, dividend: 50, divisor: 10, quotient: 5, options: [4, 5, 6] },
      { id: 309, dividend: 45, divisor: 5, quotient: 9, options: [8, 9, 10] },
      { id: 310, dividend: 50, divisor: 5, quotient: 10, options: [9, 10, 8] },
    ],
  },
  {
    id: 4,
    title: 'Level 4',
    name: 'Bagi 6, 7 & 8',
    description: 'Petualangan rimba angka 6, 7 & 8',
    color: '#a855f7',
    badgeBg: 'bg-purple-500',
    gradient: 'from-purple-400 to-violet-600',
    borderColor: '#7e22ce',
    shadowColor: '#581c87',
    questions: [
      { id: 401, dividend: 24, divisor: 6, quotient: 4, options: [3, 4, 5] },
      { id: 402, dividend: 30, divisor: 6, quotient: 5, options: [4, 5, 6] },
      { id: 403, dividend: 28, divisor: 7, quotient: 4, options: [3, 4, 5] },
      { id: 404, dividend: 35, divisor: 7, quotient: 5, options: [4, 5, 6] },
      { id: 405, dividend: 32, divisor: 8, quotient: 4, options: [3, 4, 5] },
      { id: 406, dividend: 42, divisor: 6, quotient: 7, options: [6, 7, 8] },
      { id: 407, dividend: 48, divisor: 6, quotient: 8, options: [7, 8, 9] },
      { id: 408, dividend: 49, divisor: 7, quotient: 7, options: [6, 7, 8] },
      { id: 409, dividend: 56, divisor: 8, quotient: 7, options: [6, 7, 8] },
      { id: 410, dividend: 64, divisor: 8, quotient: 8, options: [7, 8, 9] },
    ],
  },
  {
    id: 5,
    title: 'Level 5',
    name: 'Tantangan Juara',
    description: 'Tantangan pembagian angka hingga 100!',
    color: '#ef4444',
    badgeBg: 'bg-red-500',
    gradient: 'from-rose-400 to-red-600',
    borderColor: '#b91c1c',
    shadowColor: '#7f1d1d',
    questions: [
      { id: 501, dividend: 45, divisor: 9, quotient: 5, options: [4, 5, 6] },
      { id: 502, dividend: 54, divisor: 9, quotient: 6, options: [5, 6, 7] },
      { id: 503, dividend: 63, divisor: 9, quotient: 7, options: [6, 7, 8] },
      { id: 504, dividend: 72, divisor: 8, quotient: 9, options: [8, 9, 10] },
      { id: 505, dividend: 70, divisor: 10, quotient: 7, options: [6, 7, 8] },
      { id: 506, dividend: 81, divisor: 9, quotient: 9, options: [8, 9, 7] },
      { id: 507, dividend: 80, divisor: 10, quotient: 8, options: [7, 8, 9] },
      { id: 508, dividend: 72, divisor: 9, quotient: 8, options: [7, 8, 9] },
      { id: 509, dividend: 90, divisor: 10, quotient: 9, options: [8, 9, 10] },
      { id: 510, dividend: 100, divisor: 10, quotient: 10, options: [9, 10, 8] },
    ],
  },
];
```
