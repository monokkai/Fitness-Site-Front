interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    goal?: string;
    avatarUrl?: string;
}

export default User;
