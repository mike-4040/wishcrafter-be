export interface DBWish {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  created_at: number;
}

export interface Wish {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: number;
}

enum FactorType {
  FeaturePresence = 'FeaturePresence',
  NumericValue = 'NumericValue',
}
export interface FactorBase {
  id: string;
  wishId: string;
  name: string;
  type: FactorType;
  notImportant: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface FeaturePresenceFactor extends FactorBase {
  type: FactorType.FeaturePresence;
  value: {
    present: boolean;
    feature: string;
  };
}

export interface NumericValueFactor extends FactorBase {
  type: FactorType.NumericValue;
  value: {
    value: number;
  };
}

export type Factor = FeaturePresenceFactor | NumericValueFactor;

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
