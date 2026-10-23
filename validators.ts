// Reusable form validators.
// Every function returns an error message, or undefined when the value is valid.

export function validateEmail(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'Email address is required'
  if (v.length > 254) return 'Email address is too long'
  if (/\s/.test(v)) return 'Email address cannot contain spaces'

  const parts = v.split('@')
  if (parts.length !== 2) return 'Email must contain a single @ (e.g. name@example.com)'
  const local = parts[0]
  const domain = parts[1]

  if (!local) return 'Enter the part before the @'
  if (!domain) return 'Enter the domain after the @ (e.g. gmail.com)'
  if (local.length > 64) return 'The part before the @ is too long'
  if (
    !/^[A-Za-z0-9._%+-]+$/.test(local) ||
    local.startsWith('.') ||
    local.endsWith('.') ||
    local.includes('..')
  )
    return 'Email contains invalid characters before the @'

  if (!/^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(domain))
    return 'Enter a valid domain (e.g. gmail.com)'
  const labels = domain.split('.')
  if (labels.some((l) => l.startsWith('-') || l.endsWith('-')))
    return 'Enter a valid domain (e.g. gmail.com)'
  const tld = labels[labels.length - 1]
  if (!/^[A-Za-z]{2,}$/.test(tld)) return 'Email must end with a valid domain like .com or .in'
  return undefined
}

export function validateName(value: string, label = 'Name'): string | undefined {
  const v = value.trim()
  if (!v) return `${label} is required`
  if (v.length < 2) return `${label} must be at least 2 characters`
  if (v.length > 50) return `${label} must be under 50 characters`
  if (!/^\p{L}[\p{L}\s.'-]*$/u.test(v))
    return `${label} can only contain letters, spaces, . ' and -`
  return undefined
}

export function validateStreet(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'Street address is required'
  if (v.length < 5) return 'Enter your full street address'
  if (v.length > 120) return 'Street address is too long'
  if (!/[\p{L}\d]/u.test(v)) return 'Enter a valid street address'
  return undefined
}

export function validateCity(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'City is required'
  if (v.length < 2) return 'Enter a valid city'
  if (v.length > 50) return 'City name is too long'
  if (!/^\p{L}[\p{L}\s.'-]*$/u.test(v)) return 'City can only contain letters and spaces'
  return undefined
}

const POSTAL_RULES: Record<string, { re: RegExp; msg: string }> = {
  India: { re: /^[1-9]\d{5}$/, msg: 'Enter a valid 6-digit PIN code' },
  'United States': { re: /^\d{5}(-\d{4})?$/, msg: 'Enter a valid ZIP code (e.g. 90210)' },
  'United Kingdom': {
    re: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/,
    msg: 'Enter a valid UK postcode (e.g. SW1A 1AA)',
  },
  Germany: { re: /^\d{5}$/, msg: 'Enter a valid 5-digit postal code' },
  Singapore: { re: /^\d{6}$/, msg: 'Enter a valid 6-digit postal code' },
}

export function validatePostal(value: string, country: string): string | undefined {
  const v = value.trim()
  if (!v) return 'Postal code is required'
  const rule = POSTAL_RULES[country]
  if (rule && !rule.re.test(v)) return rule.msg
  return undefined
}

// Indian mobile number: 10 digits starting with 6-9 (a +91 / 91 / 0 prefix is allowed)
export function validateIndianMobile(value: string): string | undefined {
  let d = value.replace(/[\s-]/g, '')
  if (!d) return 'Phone number is required'
  if (d.startsWith('+91')) d = d.slice(3)
  else if (d.startsWith('91') && d.length === 12) d = d.slice(2)
  else if (d.startsWith('0') && d.length === 11) d = d.slice(1)
  if (!/^\d+$/.test(d)) return 'Phone number can only contain digits'
  if (d.length !== 10) return 'Enter a 10-digit mobile number'
  if (!/^[6-9]/.test(d)) return 'Mobile numbers start with 6, 7, 8 or 9'
  return undefined
}

export function validatePassword(value: string, minLength = 4): string | undefined {
  if (!value) return 'Password is required'
  if (value.length < minLength) return `At least ${minLength} characters required`
  return undefined
}
