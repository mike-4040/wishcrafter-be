import { z } from 'zod';

const FactorType = z.enum(['FeaturePresence', 'NumericValue']);

const FactorBase = z.object({
  // id: z.string(),
  wishId: z.string(),
  name: z.string(),
  type: FactorType,
  notImportant: z.boolean(),
  // createdAt: z.number(),
  // updatedAt: z.number(),
});

export const FeaturePresenceFactor = FactorBase.merge(
  z.object({
    type: z.literal(FactorType.enum.FeaturePresence),
    value: z.object({
      present: z.boolean(),
      value: z.string(),
    }),
  }),
);

export const NumericValueFactor = FactorBase.merge(
  z.object({
    type: z.literal(FactorType.enum.NumericValue),
    value: z.object({
      value: z.number(),
    }),
  }),
);

export const Factor = z.discriminatedUnion('type', [
  FeaturePresenceFactor,
  NumericValueFactor,
]);

export type Factor = z.infer<typeof Factor>;

export interface DBFactor {
  created_at: number;
  id: string;
  name: string;
  not_important: boolean;
  type: string;
  updated_at: number;
  value: Record<string, unknown>;
  wish_id: string;
}
