import React from "react";

const DonorHome = () => {
    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Welcome, Donor!</h2>
            <p style={welcomeTextStyle}>
                Thank you for being a part of our mission to serve the community. Your generous contributions help us make a real difference. Explore our initiatives and see how your donations are making an impact!
            </p>

            <div style={imageGalleryStyle}>
                <div style={imageCardStyle}>
                    <img
                        src="https://i.pinimg.com/736x/b9/14/9c/b9149c1a3230bc932dc20ce4acdc8693.jpg"
                        alt="Food Donation"
                        style={imageStyle}
                    />
                    <p style={captionStyle}>Helping Communities with Food Donations</p>
                </div>
                <div style={imageCardStyle}>
                    <img
                        src="https://i.pinimg.com/736x/96/ba/8b/96ba8bcba2354dcb27ee8ec9f87c9551.jpg"
                        alt="Volunteers"
                        style={imageStyle}
                    />
                    <p style={captionStyle}>Dedicated Volunteers Making a Difference</p>
                </div>
                <div style={imageCardStyle}>
                    <img
                        src="https://i.pinimg.com/736x/7a/6e/c4/7a6ec421bb75cfd3ffbd23ef6cdbaa0b.jpg"
                        alt="Charity Event"
                        style={imageStyle}
                    />
                    <p style={captionStyle}>Charity Events to Support the Needy</p>
                </div>
            </div>
        </div>
    );
};

const containerStyle = {
    textAlign: "center",
    padding: "30px",
    maxWidth: "800px",
    margin: "0 auto"
};

const headerStyle = {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#007bff"
};

const welcomeTextStyle = {
    fontSize: "18px",
    marginBottom: "30px",
    lineHeight: "1.5"
};

const imageGalleryStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
};

const imageCardStyle = {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
    maxWidth: "300px"
};

const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover"
};

const captionStyle = {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    fontSize: "16px",
    color: "#333"
};

export default DonorHome;
