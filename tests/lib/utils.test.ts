import { generateRandomUsernameWithSuffix } from "../../lib/utils"

describe('generateRandomUsernameWithSuffix', () => {
    it('should generate a username with the given name and a 4-digit random number', () => {
        const name = 'testUser'
        const result = generateRandomUsernameWithSuffix(name)

        expect(result).toMatch(/^testuser_\d{4}$/)
    })

    it('should trim whitespace from the input name', () => {
        const name = '   testUser   '
        const result = generateRandomUsernameWithSuffix(name)

        expect(result).toMatch(/^testuser_\d{4}$/)
    })

    it('should generate different usernames for the same input name', () => {
        const name = 'testUser'
        const result1 = generateRandomUsernameWithSuffix(name)
        const result2 = generateRandomUsernameWithSuffix(name)

        expect(result1).not.toEqual(result2)
    })

    it('should handle names with middle spaces correctly', () => {
        const name = 'test User'
        const result = generateRandomUsernameWithSuffix(name)

        expect(result).toMatch(/^test_user_\d{4}$/)
    })
})