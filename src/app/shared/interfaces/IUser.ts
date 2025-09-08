interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    goal?: string;
    avatarUrl?: string;
    hasProfile?: boolean;
}

export default User;
