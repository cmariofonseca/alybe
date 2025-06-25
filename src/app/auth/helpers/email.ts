const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string) => EMAIL_RE.test(email);

export const isStrongPassword = (pwd: string, min = 6) => pwd.length >= min;
