export function generateRandomUsernameWithSuffix(name: string): string {
    const trimmedName = name.trim().replace(/\s+/g, '_');
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${trimmedName}_${randomNumber}`;
}