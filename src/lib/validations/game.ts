import { z } from 'zod';

export const gameSchema = z.object({
  guess: z.number().min(0, { message: 'Guess must be a positive number' })
});

export type GuessInput = z.infer<typeof gameSchema>;
