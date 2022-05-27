// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function graphQLResult<T>(data: Record<any, T>): T {
  return Object.entries(data).map(([key, value]) => value)[0];
}
