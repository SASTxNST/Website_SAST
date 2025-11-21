/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import {
  Download,
  ChevronRight,
  Mail,
  User,
  Users,
  Send,
  Star,
  Rocket,
  Satellite,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Newsletter = () => {
  const naviagate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Reset form
    setEmail("");
    setFirstName("");
    setLastName("");
    alert("Successfully subscribed to SAST Newsletter!");
  };

  const handleDownload = (newsletter) => {
    if (!newsletter.available || !newsletter.pdfUrl) {
      alert("This newsletter is not available for download yet. Please check back later!");
      return;
    }

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = newsletter.pdfUrl;
    link.download = `SAST_Newsletter_${newsletter.year}_${newsletter.title.replace(/\s+/g, '_')}.pdf`;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const newsletters = [
    {
      year: "2024",
      title: "QUANTUM HORIZONS",
      subtitle: "Latest Discoveries in Space Technology",
      description:
        "Explore breakthrough innovations in quantum computing applications for space exploration, satellite communications, and deep space missions.",
      downloads: "2.4K",
      featured: true,
      pdfUrl: "/pdf/sast_newsletter_1.pdf",
      available: true,
    },
    {
      year: "2023",
      title: "STELLAR MECHANICS",
      subtitle: "Advanced Propulsion Systems",
      description:
        "Comprehensive analysis of next-generation propulsion technologies including ion drives, nuclear thermal propulsion, and breakthrough physics.",
      downloads: "1.8K",
      featured: false,
      pdfUrl: null,
      available: false,
    },
    {
      year: "2022",
      title: "CUBESAST CHRONICLES",
      subtitle: "CubeSat Innovation Report",
      description:
        "Revolutionary developments in miniaturized satellite technology, mission success stories, and future orbital deployment strategies.",
      downloads: "1.2K",
      featured: false,
      pdfUrl: null,
      available: false,
    },
  ];

  const stats = [
    { icon: Users, number: "50K+", label: "Active Subscribers" },
    { icon: Satellite, number: "12", label: "Annual Issues" },
  ];

  const bottomCtaStyle = {
    paddingTop: "4rem",
    paddingBottom: "4rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const bottomCtaContainerStyle = {
    maxWidth: "56rem",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  };

  const liveBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(37, 99, 235, 0.1)",
    border: "1px solid rgba(37, 99, 235, 0.2)",
    borderRadius: "9999px",
    padding: "0.5rem 1rem",
    marginBottom: "1.5rem",
  };

  const pulseDotStyle = {
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "#4ade80",
    borderRadius: "9999px",
    animation: "pulse 1.5s infinite",
  };

  const bottomTitleStyle = {
    fontSize: "1.875rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#ffffff",
  };

  const bottomDescriptionStyle = {
    color: "#d1d5db",
    marginBottom: "2rem",
    maxWidth: "40rem",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const buttonGroupStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  };

  const secondaryButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "9999px",
    padding: "0.75rem 1.5rem",
    color: "#ffffff",
    fontWeight: "600",
    transition: "all 0.3s",
  };

  const secondaryButtonHoverStyle = {
    backgroundColor: "rgba(37, 99, 235, 0.1)",
    borderColor: "rgba(37, 99, 235, 0.2)",
    transform: "scale(1.05)",
  };

  // Generate fixed star positions once
  const starPositions = React.useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, #000 50%, rgba(88, 28, 135, 0.2) 100%)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,161,255,0.1), transparent 50%)",
          }}
        ></div>
        {starPositions.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 4,
              height: 4,
              background: "#60a5fa",
              borderRadius: "50%",
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `pulse ${star.duration}s infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero Section */}
        <section
          style={{
            paddingTop: 128,
            paddingBottom: 80,
            paddingLeft: 24,
            paddingRight: 24,
            transition: "all 1s",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div
            style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: 50,
                padding: "12px 24px",
                marginBottom: 32,
                backdropFilter: "blur(4px)",
              }}
            >
              <Rocket style={{ width: 20, height: 20, color: "#60a5fa" }} />
              <span style={{ color: "#93c5fd", fontWeight: 500 }}>
                SAST Newsletter Archive
              </span>
            </div>
            <h1
              style={{
                fontSize: 64,
                fontWeight: 700,
                marginBottom: 24,
                background: "linear-gradient(to right, #fff, #dbeafe, #93c5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              EXPLORE THE
              <br />
              <span style={{ color: "#60a5fa" }}>COSMOS</span>
            </h1>
            <p
              style={{
                fontSize: 20,
                color: "#d1d5db",
                maxWidth: 768,
                margin: "0 auto 48px auto",
                lineHeight: 1.6,
              }}
            >
              Dive deep into the universe of space technology, astronomical
              discoveries, and cutting-edge research that's shaping humanity's
              future among the stars.
            </p>
            {/* Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 32,
                marginBottom: 64,
              }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 16,
                    padding: 24,
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                >
                  <stat.icon
                    style={{
                      width: 32,
                      height: 32,
                      color: "#60a5fa",
                      margin: "0 auto 16px auto",
                    }}
                  />
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div style={{ color: "#9ca3af", fontSize: 14 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Archive */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  marginBottom: 24,
                  color: "#fff",
                }}
              >
                Newsletter <span style={{ color: "#60a5fa" }}>Archive</span>
              </h2>
              <p
                style={{
                  color: "#d1d5db",
                  fontSize: 18,
                  maxWidth: 512,
                  margin: "0 auto",
                }}
              >
                Access our comprehensive collection of space technology
                insights, research findings, and industry breakthroughs.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 32,
              }}
            >
              {newsletters.map((newsletter, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 24,
                    transition: "all 0.5s",
                    cursor: "pointer",
                    background: newsletter.featured
                      ? "linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(147,51,234,0.2) 100%)"
                      : "rgba(255,255,255,0.05)",
                    border: newsletter.featured
                      ? "2px solid rgba(59,130,246,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    transform:
                      hoveredCard === index
                        ? "translateY(-5px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === index
                        ? "0 10px 20px rgba(0,0,0,0.4)"
                        : "none",
                  }}
                >
                  {newsletter.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "#3b82f6",
                        color: "#fff",
                        padding: "4px 12px",
                        borderRadius: 50,
                        fontSize: 14,
                        fontWeight: 600,
                        zIndex: 10,
                      }}
                    >
                      Featured
                    </div>
                  )}
                  <div
                    style={{
                      padding: 32,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          background: "rgba(59,130,246,0.2)",
                          borderRadius: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Mail
                          style={{ width: 24, height: 24, color: "#60a5fa" }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#60a5fa",
                          background: "rgba(59,130,246,0.1)",
                          padding: "4px 12px",
                          borderRadius: 50,
                        }}
                      >
                        {newsletter.year}
                      </div>
                    </div>
                    <h3
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        marginBottom: 8,
                        color: "#fff",
                      }}
                    >
                      {newsletter.title}
                    </h3>
                    <p
                      style={{
                        color: "#93c5fd",
                        fontWeight: 500,
                        marginBottom: 16,
                      }}
                    >
                      {newsletter.subtitle}
                    </p>
                    <p
                      style={{
                        color: "#d1d5db",
                        marginBottom: 24,
                        flexGrow: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {newsletter.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 14,
                          color: "#9ca3af",
                        }}
                      >
                        <Download style={{ width: 16, height: 16 }} />
                        <span>{newsletter.downloads} downloads</span>
                      </div>
                      <button
                        onClick={() => handleDownload(newsletter)}
                        disabled={!newsletter.available}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: newsletter.available ? "#3b82f6" : "#6b7280",
                          color: "#fff",
                          padding: "12px 24px",
                          borderRadius: 12,
                          fontWeight: 600,
                          border: "none",
                          cursor: newsletter.available ? "pointer" : "not-allowed",
                          transition: "all 0.3s",
                          opacity: newsletter.available ? 1 : 0.6,
                          transform:
                            hoveredCard === index && newsletter.available ? "scale(1.05)" : "scale(1)",
                        }}
                      >
                        <Download style={{ width: 16, height: 16 }} />
                        {newsletter.available ? "Download" : "Coming Soon"}
                        {newsletter.available && (
                          <ChevronRight
                            style={{
                              width: 16,
                              height: 16,
                              transition: "transform 0.3s",
                              transform:
                                hoveredCard === index
                                  ? "translateX(5px)"
                                  : "translateX(0)",
                            }}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(to top, rgba(37,99,235,0.1), transparent)",
                      opacity: hoveredCard === index ? 1 : 0,
                      transition: "opacity 0.3s",
                      pointerEvents: "none",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div
              style={{
                background:
                  "linear-gradient(90deg, rgba(30,58,138,0.2) 0%, rgba(88,28,135,0.2) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 32,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  "@media (min-width: 1024px)": { flexDirection: "row" },
                }}
              >
                {/* Left Column - CTA */}
                <div
                  style={{
                    flex: 1,
                    padding: 48,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minWidth: 0,
                  }}
                >
                  <div style={{ marginBottom: 32 }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        borderRadius: 9999,
                        padding: "8px 16px",
                        marginBottom: 24,
                      }}
                    >
                      <Star
                        style={{ width: 16, height: 16, color: "#60a5fa" }}
                      />
                      <span
                        style={{
                          color: "#93c5fd",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        Join the Mission
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 40,
                        fontWeight: 700,
                        marginBottom: 24,
                        color: "#fff",
                        lineHeight: 1.1,
                      }}
                    >
                      Subscribe to Our
                      <br />
                      <span style={{ color: "#60a5fa" }}>SAST Newsletter</span>
                    </h3>

                    <p
                      style={{
                        color: "#d1d5db",
                        fontSize: 20,
                        marginBottom: 32,
                        lineHeight: 1.6,
                        maxWidth: 480,
                      }}
                    >
                      Be the first to explore groundbreaking space discoveries,
                      cutting-edge technology insights, and exclusive research
                      from the world's leading space scientists.
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {[
                      "Monthly deep-dive space technology reports",
                      "Exclusive access to research previews",
                      "Early notifications on mission updates",
                    ].map((text, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          color: "#d1d5db",
                          fontSize: 16,
                        }}
                      >
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            background: "rgba(59,130,246,0.2)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ChevronRight
                            style={{ width: 14, height: 14, color: "#60a5fa" }}
                          />
                        </div>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Form */}
                <div
                  style={{
                    flex: 1,
                    padding: 48,
                    background: "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#d1d5db",
                            marginBottom: 12,
                          }}
                        >
                          Email Address
                        </label>
                        <div style={{ position: "relative" }}>
                          <Mail
                            style={{
                              position: "absolute",
                              left: 16,
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: 20,
                              height: 20,
                              color: "#9ca3af",
                            }}
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "16px 16px 16px 48px",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 16,
                              color: "#fff",
                              fontSize: 16,
                              outline: "none",
                              marginBottom: 0,
                              transition: "all 0.3s",
                            }}
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>

                      <div
                        style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <label
                            style={{
                              display: "block",
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#d1d5db",
                              marginBottom: 12,
                            }}
                          >
                            First Name
                          </label>
                          <div style={{ position: "relative" }}>
                            <User
                              style={{
                                position: "absolute",
                                left: 16,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 20,
                                height: 20,
                                color: "#9ca3af",
                              }}
                            />
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "16px 16px 16px 48px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 16,
                                color: "#fff",
                                fontSize: 16,
                                outline: "none",
                                marginBottom: 0,
                                transition: "all 0.3s",
                              }}
                              placeholder="First name"
                              required
                            />
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <label
                            style={{
                              display: "block",
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#d1d5db",
                              marginBottom: 12,
                            }}
                          >
                            Last Name
                          </label>
                          <div style={{ position: "relative" }}>
                            <User
                              style={{
                                position: "absolute",
                                left: 16,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 20,
                                height: 20,
                                color: "#9ca3af",
                              }}
                            />
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "16px 16px 16px 48px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 16,
                                color: "#fff",
                                fontSize: 16,
                                outline: "none",
                                marginBottom: 0,
                                transition: "all 0.3s",
                              }}
                              placeholder="Last name"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: "100%",
                          background:
                            "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 18,
                          padding: "16px 0",
                          border: "none",
                          borderRadius: 16,
                          marginTop: 8,
                          marginBottom: 0,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.6 : 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          transition: "all 0.3s",
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <div
                              style={{
                                width: 20,
                                height: 20,
                                border: "2px solid rgba(255,255,255,0.2)",
                                borderTop: "2px solid #fff",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                              }}
                            ></div>
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Send style={{ width: 20, height: 20 }} />
                            Subscribe Now
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section style={bottomCtaStyle}>
          <div style={bottomCtaContainerStyle}>
            <div style={liveBadgeStyle}>
              <span style={pulseDotStyle}></span>
              <span style={{ color: "#93c5fd", fontWeight: 500 }}>
                SAST Live Updates
              </span>
            </div>
            <h2 style={bottomTitleStyle}>
              Join Our Global Community of Space Enthusiasts
            </h2>
            <p style={bottomDescriptionStyle}>
              Become part of a vibrant community passionate about space
              exploration and technology. Get exclusive content and connect with
              experts.
            </p>
            <div style={buttonGroupStyle}>
              
              <a href="https://linkedin.com/company/society-for-aerospace-and-space-technology" target="_blank" rel="noopener noreferrer">
                <button
                    style={{
                    ...secondaryButtonStyle,
                    backgroundColor:
                        hoveredCard === "community"
                        ? secondaryButtonHoverStyle.backgroundColor
                        : secondaryButtonStyle.backgroundColor,
                    borderColor:
                        hoveredCard === "community"
                        ? secondaryButtonHoverStyle.borderColor
                        : secondaryButtonStyle.borderColor,
                    transform:
                        hoveredCard === "community"
                        ? secondaryButtonHoverStyle.transform
                        : secondaryButtonStyle.transform,
                    }}
                    onMouseEnter={() => setHoveredCard("community")}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <Users style={{ width: 20, height: 20 }} />
                    Join Community
                    <ChevronRight style={{ width: 16, height: 16 }} />
                </button>
              </a>
              <button
                style={{
                  ...secondaryButtonStyle,
                  backgroundColor:
                    hoveredCard === "explore"
                      ? secondaryButtonHoverStyle.backgroundColor
                      : secondaryButtonStyle.backgroundColor,
                  borderColor:
                    hoveredCard === "explore"
                      ? secondaryButtonHoverStyle.borderColor
                      : secondaryButtonStyle.borderColor,
                  transform:
                    hoveredCard === "explore"
                      ? secondaryButtonHoverStyle.transform
                      : secondaryButtonStyle.transform,
                }}
                onMouseEnter={() => setHoveredCard("explore")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={()=>naviagate("/projects")}
              >
                <Globe style={{ width: 20, height: 20 }} />
                Explore Missions
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.7;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Newsletter;
