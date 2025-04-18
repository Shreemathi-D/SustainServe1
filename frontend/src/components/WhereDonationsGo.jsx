import React from "react";

const WhereDonationsGo = () => {
    const containerStyle = {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: "1.8rem",
        fontWeight: "600",
        color: "#333",
        marginBottom: "20px",
        letterSpacing: "1px",
        color:"#303481"
    };

    const cardBaseStyle = {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffe8ec",
        padding: "15px",
        borderRadius: "12px",
        margin: "15px 0",
        transition: "0.3s ease-in-out",
        borderLeft: "5px solid #ff6b81",
        textAlign: "left",
    };

    const cardHoverStyle = {
        backgroundColor: "#ffd6dc",
        transform: "scale(1.02)",
    };

    const headingStyle = {
        fontSize: "1.2rem",
        fontWeight: "500",
        color: "#ff6b81",
        marginBottom: "8px",
    };

    const textStyle = {
        fontSize: "1rem",
        color: "#555",
        lineHeight: "1.6",
    };

    const strongStyle = {
        color: "#ff6b81",
        fontSize: "1.1rem",
    };

    const handleHover = (event, isHover) => {
        Object.assign(
            event.currentTarget.style,
            isHover ? cardHoverStyle : cardBaseStyle
        );
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>📍 Where Do Our Donations Go?</h2>

            {[
                { emoji: "🏠", title: "Local Shelters & Orphanages", text: "Your food donations help provide nutritious meals to homeless shelters, orphanages, and underprivileged families." },
                { emoji: "🍽️", title: "Community Kitchens", text: "We supply surplus food to community kitchens that prepare meals for the elderly, low-income families, and individuals facing food insecurity." },
                { emoji: "🤝", title: "Partner NGOs & Charity Organizations", text: "We collaborate with verified NGOs that specialize in food distribution, ensuring donations are handled efficiently and ethically." },
                { emoji: "📦", title: "Emergency Relief & Disaster Support", text: "During natural disasters or crises, donated food is sent to affected areas to assist displaced families and individuals." },
                { emoji: "📊", title: "Real-Time Tracking", text: "Our platform allows donors to track their contributions and see where their food is making a difference." },
                { emoji: "🌍", title: "Your Impact", text: "With your support, we aim to reduce food waste and combat hunger. Every meal donated is a step towards a better future." },
            ].map((item, index) => (
                <div
                    key={index}
                    style={cardBaseStyle}
                    onMouseEnter={(e) => handleHover(e, true)}
                    onMouseLeave={(e) => handleHover(e, false)}
                >
                    <span style={{ fontSize: "20px", marginRight: "15px" }}>{item.emoji}</span>
                    <div>
                        <h3 style={headingStyle}>{item.title}</h3>
                        <p style={textStyle}>{item.text}</p>
                    </div>
                </div>
            ))}

            <div
                style={{ ...cardBaseStyle, backgroundColor: "#f0f0f0" }}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
            >
                <p style={{ ...textStyle, fontSize: "1.1rem", textAlign: "center" }}>
                    <strong style={strongStyle}>Want to contribute?</strong> Start donating today and be a part of the change!
                </p>
            </div>
        </div>
    );
};

export default WhereDonationsGo;
