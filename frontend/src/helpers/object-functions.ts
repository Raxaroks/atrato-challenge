
export function checkForNullValues<T>(object: unknown): T {
  const converted: T = JSON.parse( JSON.stringify(object, (_key, value) => { return value === null ? '': value }) ); 
  return converted;
}
