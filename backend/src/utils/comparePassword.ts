import bcrypt from 'bcrypt';
async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}
export default comparePassword;