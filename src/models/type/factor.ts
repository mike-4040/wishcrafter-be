import { z } from 'zod';

const FactorType = z.enum(['FeaturePresence', 'NumericValue']);

export const Factor = z.object({
  createdAt: z.number(),
  data: z.object({}).passthrough(), // only validating object exists
  id: z.string(),
  name: z.string(),
  isImportant: z.boolean(),
  factorType: FactorType,
  updatedAt: z.number(),
  wishId: z.string().uuid(),
});

export type Factor = z.infer<typeof Factor>;

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

export const FactorData = z.discriminatedUnion('factorType', [
  z.object({
    factorType: z.literal(FactorType.enum.FeaturePresence),
    data: FeaturePresenceData,
  }),
  z.object({
    factorType: z.literal(FactorType.enum.NumericValue),
    data: NumericValueData,
  }),
]);

export interface DBFactor {
  created_at: number;
  data: Record<string, unknown>;
  factor_type: string;
  id: string;
  is_important: boolean;
  name: string;
  updated_at: number;
  wish_id: string;
}
