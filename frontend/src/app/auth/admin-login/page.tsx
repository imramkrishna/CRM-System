import LoginForm from '@/components/auth/LoginForm';

export default function AdminLoginPage() {
    return (
        <LoginForm
            type="admin"
            title="Admin Sign In"
            subtitle="Access the administrative dashboard"
        />
    );
}
