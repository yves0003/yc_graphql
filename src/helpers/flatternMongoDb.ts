export function flattenObject(obj: any, prefix = ""): { [key: string]: any } {
  return Object.keys(obj).reduce((result: { [key: string]: any }, key: string) => {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (Array.isArray(obj[key])) {
      return { ...result, [newKey]: obj[key] }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const flattenedSubObject = flattenObject(obj[key], newKey)
      return { ...result, ...flattenedSubObject }
    } else {
      return { ...result, [newKey]: obj[key] }
    }
  }, {})
}
