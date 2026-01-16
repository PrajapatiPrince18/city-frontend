import React from "react";
import GlassCard from "../../components/GlassCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CSS/UserHome.css";

function UserHome() {
  return (
    <div className="uh-root">
      <div className="uh-container">

        {/* Header Section */}
        <header className="uh-header">
          <h1>Welcome to the Municipality Portal</h1>
          <div className="uh-info-ticker">
            <marquee behavior="scroll" direction="left">
              Pay your water bills online | New tourist spots added | City traffic
              updates | COVID-19 Guidelines Updated
            </marquee>
          </div>
        </header>

        {/* Image Carousel */}
        <section className="uh-carousel-section">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
          >
            <div>
              <img src="/assetes/Images/4image.png" alt="Mehsana View 1" />
              <p className="legend big-legend">Mehsana City</p>
            </div>
            <div>
              <img src="/assetes/Images/SuryaMandir.png" alt="Mehsana View 2" />
              <p className="legend big-legend">Surya Mandir</p>
            </div>
            <div>
              <img src="/assetes/Images/RajMahel.png" alt="Mehsana View 3" />
              <p className="legend big-legend">Raj Mahel</p>
            </div>
            <div>
              <img src="/assetes/Images/RaniKiVaav.png" alt="Mehsana View 4" />
              <p className="legend big-legend">72 Kotha ni Vaav</p>
            </div>
          </Carousel>
        </section>

        {/* Cards Section */}
        <section className="uh-cards-section">
          <div className="uh-card">
            <h2>Explore City Services</h2>
            <p>Check utilities, pay bills, and request municipal services online.</p>
          </div>

          <div className="uh-card">
            <h2>Tourist Attractions</h2>
            <p>Discover the most popular places to visit in the city.</p>
          </div>

          <div className="uh-card">
            <h2>Events & Announcements</h2>
            <p>Stay updated with upcoming city events and important notices.</p>
          </div>

          <div className="uh-card">
            <h2>Community Initiatives</h2>
            <p>Learn about social programs and how to participate.</p>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="uh-stats-section">
          <h2>City Statistics</h2>
          <div className="uh-stats-cards">

            <div className="uh-stats-card">
              <h3>Population</h3>
              <p>1,50,000 citizens living in Mehsana</p>
            </div>

            <div className="uh-stats-card">
              <h3>Water Supply</h3>
              <p>24/7 water supply in 95% of the city</p>
            </div>

            <div className="uh-stats-card">
              <h3>Electricity</h3>
              <p>Continuous electricity coverage across all zones</p>
            </div>

            <div className="uh-stats-card">
              <h3>Waste Management</h3>
              <p>Recycling & waste collection in 100% of households</p>
            </div>

          </div>
        </section>

        {/* Latest News Section */}
        <section className="uh-news-section">
          <h2>Latest News</h2>
          <div className="uh-news-cards">

            <div className="uh-news-card">
              <h3>New Park Inaugurated</h3>
              <p>The city inaugurated a new eco-friendly park near the central plaza.</p>
            </div>

            <div className="uh-news-card">
              <h3>Traffic Update</h3>
              <p>Road construction on Main Street from 1st Jan – 15th Jan. Plan alternate routes.</p>
            </div>

            <div className="uh-news-card">
              <h3>Water Bill Discounts</h3>
              <p>Early payment discount available till the end of this month.</p>
            </div>

          </div>
        </section>

        {/* Quick Links Section */}
        <section className="uh-extra-section">
          <h2>Quick Links</h2>
          <div className="uh-quick-links">
            <a href="#">Pay Bills</a>
            <a href="#">Request Service</a>
            <a href="#">City Map</a>
            <a href="#">Tourist Guide</a>
            <a href="#">Emergency Contacts</a>
            <a href="#">Community Programs</a>
            <a href="#">News & Alerts</a>
          </div>
        </section>

      </div>
    </div>
  );
}

export default UserHome;
