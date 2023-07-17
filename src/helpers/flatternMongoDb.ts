export function flattenObject(obj: any, prefix = ""): { [key: string]: any } {
  return Object.keys(obj).reduce((result: { [key: string]: any }, key: string) => {
    const newKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    if (Array.isArray(value)) {
      return { ...result, [newKey]: value }
    } else if (value instanceof Date) {
      return { ...result, [newKey]: value }
    } else if (typeof value === "object" && value !== null) {
      const flattenedSubObject = flattenObject(value, newKey)
      return { ...result, ...flattenedSubObject }
    } else {
      return { ...result, [newKey]: value }
    }
  }, {})
}
