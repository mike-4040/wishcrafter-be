import { z } from 'zod';

const FactorKind = z.enum(['FeaturePresence', 'NumericValue']);

export const Factor = z.object({
  createdAt: z.number(),
  // only validating object exists, FactorData will validate the contents
  data: z.object({}).passthrough(),
  id: z.string().uuid(),
  name: z.string(),
  isImportant: z.boolean(),
  factorKind: FactorKind,
  updatedAt: z.number(),
  wishId: z.string().uuid(),
});

export type FactorType = z.infer<typeof Factor>;

export const FeaturePresenceData = z
  .object({
    present: z.boolean(),
    value: z.string(),
  })
  .strict();

export const NumericValueData = z
  .object({
    value: z.number(),
  })
  .strict();

export const FactorData = z.discriminatedUnion('factorKind', [
  z.object({
    factorKind: z.literal(FactorKind.enum.FeaturePresence),
    data: FeaturePresenceData,
  }),
  z.object({
    factorKind: z.literal(FactorKind.enum.NumericValue),
    data: NumericValueData,
  }),
]);

export interface DBFactor {
  created_at: number;
  data: Record<string, unknown>;
  factor_kind: FactorType['factorKind'];
  id: string;
  is_important: boolean;
  name: string;
  updated_at: number;
  wish_id: string;
}
