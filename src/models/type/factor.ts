import { z } from 'zod';

const FactorType = z.enum(['FeaturePresence', 'NumericValue']);

export const Factor = z.object({
  createdAt: z.number(),
  data: z.object({}).passthrough(), // only validating object exists
  id: z.string(),
  name: z.string(),
  notImportant: z.boolean(),
  type: FactorType,
  updatedAt: z.number(),
  wishId: z.string(),
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

export const FactorData = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(FactorType.enum.FeaturePresence),
    data: FeaturePresenceData,
  }),
  z.object({
    type: z.literal(FactorType.enum.NumericValue),
    data: NumericValueData,
  }),
]);

export interface DBFactor {
  created_at: number;
  id: string;
  name: string;
  not_important: boolean;
  type: string;
  updated_at: number;
  data: Record<string, unknown>;
  wish_id: string;
}
