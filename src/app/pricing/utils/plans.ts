const plans = [
    {
        id: "free",
        title: "Free Tier",
        description: "Perfect for personal use and getting started with basic tracking.",
        price: "0.00",
        features: [
            "5 daily workout logs",
            "Basic progress tracking",
            "Standard email support",
            "7-day workout history",
            "Essential performance metrics"
        ],
        isPopular: false,
    },
    {
        id: "pro",
        title: "Pro Member",
        description: "Ideal for dedicated fitness enthusiasts and advanced tracking.",
        price: "29.99",
        features: [
            "Unlimited workout logs",
            "Advanced analytics dashboard",
            "Priority email support",
            "30-day workout history",
            "Customizable reporting",
            "Goal setting & tracking",
            "API access (coming soon)"
        ],
        isPopular: true,
    }
];

export default plans;