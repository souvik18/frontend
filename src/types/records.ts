export type SuccessRecord = {
  reference: string;
  description: string;
};

export type FailedRecord = SuccessRecord & {
  reason: string;
};
