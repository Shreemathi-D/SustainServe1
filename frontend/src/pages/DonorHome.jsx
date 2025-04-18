import React from "react";
import { motion } from "framer-motion";

const DonorHome = () => {
    return (
        <div style={containerStyle}>
            <motion.h2
                style={headerStyle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Welcome, Donor!
            </motion.h2>

            <motion.p
                style={welcomeTextStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                Thank you for being a part of our mission to serve the community.
                Your generous contributions help us make a real difference.
                Explore our initiatives and see how your donations are making an impact!
            </motion.p>

            <motion.div
                style={imageGalleryStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        style={imageCardStyle}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img src={card.src} alt={card.alt} style={imageStyle} />
                        <p style={captionStyle}>{card.caption}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

const cards = [
    {
        src: "https://i.pinimg.com/736x/b9/14/9c/b9149c1a3230bc932dc20ce4acdc8693.jpg",
        alt: "Food Donation",
        caption: "Helping Communities with Food Donations"
    },
    {
        src: "https://i.pinimg.com/736x/96/ba/8b/96ba8bcba2354dcb27ee8ec9f87c9551.jpg",
        alt: "Volunteers",
        caption: "Dedicated Volunteers Making a Difference"
    },
    {
        src: "https://i.pinimg.com/736x/7a/6e/c4/7a6ec421bb75cfd3ffbd23ef6cdbaa0b.jpg",
        alt: "Charity Event",
        caption: "Charity Events to Support the Needy"
    }
];

const containerStyle = {
    textAlign: "center",
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif"
};

const headerStyle = {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#303481"
};

const welcomeTextStyle = {
    fontSize: "18px",
    marginBottom: "40px",
    lineHeight: "1.6",
    color: "#444",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto"
};

const imageGalleryStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "25px"
};

const imageCardStyle = {
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
    maxWidth: "300px",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out"
};

const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover"
};

const captionStyle = {
    padding: "12px 15px",
    backgroundColor: "#f9f9f9",
    fontSize: "16px",
    color: "#333",
    fontWeight: 500
};

export default DonorHome;
