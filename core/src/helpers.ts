import { snakeToCamel } from "./strings"

export function sanitizeObject<T extends object>(obj: T) {
  if (typeof obj !== 'object' || !obj) throw new Error('Object to sanitize must be of type object')

  const sanitizedObj = {}
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = snakeToCamel(key)
    if (value === null || value === undefined) continue

    if (typeof value === 'object') sanitizedObj[camelKey] = sanitizeObject(value);
    else sanitizedObj[camelKey] = value;
  }

  return sanitizedObj
}

const value = sanitizeObject({ hello_world: 'yo', yo: null, something: { very_deep: 'pog' } })
// value is now { helloWorld: 'yo', something: { veryDeep: 'pog' } }
