import z from 'zod';

const schema = z.object({
  'wallet-key': z.string().optional(),
  'acc-key': z.string().optional()
});

type keyValueMap = z.infer<typeof schema>;

type key = keyof keyValueMap;
type Value<k extends key> = keyValueMap[k];

export function getLocalStorageItem<k extends key>(key: k): Value<k> {
  const parsed = schema.parse(localStorage);
  return parsed[key];
}
