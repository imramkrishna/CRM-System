import bcrypt from 'bcrypt';
async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error encrypting password');
    }
}
export default encryptPassword;