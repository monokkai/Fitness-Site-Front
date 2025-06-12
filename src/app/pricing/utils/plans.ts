const plans = [
    {
        id: "free",
        title: "Starter",
        description: "Perfect for individual developers and small projects",
        price: "0.00",
        features: [
            "5 AI-powered changelogs daily",
            "Basic Git analytics dashboard",
            "Standard email support",
            "7-day commit history",
            "Basic reporting features"
        ],
        isPopular: false,
    },
    {
        id: "pro",
        title: "Professional",
        description: "Ideal for growing teams and medium-sized projects",
        price: "29.99",
        features: [
            "Unlimited AI changelogs",
            "Advanced Git analytics",
            "Priority support response",
            "30-day commit history",
            "Custom reporting tools",
            "Team collaboration features",
            "API access"
        ],
        isPopular: true,
    },
    {
        id: "enterprise",
        title: "Enterprise",
        description: "For large organizations with complex needs",
        price: "99.99",
        features: [
            "Everything in Professional",
            "Unlimited repositories",
            "24/7 dedicated support",
            "Unlimited commit history",
            "Custom integrations",
            "Advanced security features",
            "SLA guarantee",
            "On-premise deployment option"
        ],
        isPopular: false,
    }
];

export default plans;