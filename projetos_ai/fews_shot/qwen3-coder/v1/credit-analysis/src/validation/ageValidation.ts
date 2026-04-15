/**
 * Validates if the client is of legal age (18 years or older)
 * @param age - The client's age in years
 * @returns true if the client is 18 or older, false otherwise
 */
export function validateUserAge(age: number): boolean {
  // Check if age is a valid number
  if (isNaN(age) || age < 0) {
    return false;
  }
  
  // Client must be 18 years or older
  return age >= 18;
}
