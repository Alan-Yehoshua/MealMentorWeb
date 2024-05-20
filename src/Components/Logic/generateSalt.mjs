export function generateSalt() {
  const saltRandom = Math.floor(Math.random() * (100000 - 10000) + 10000);
  return saltRandom;
}
