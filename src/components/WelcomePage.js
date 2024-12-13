import React from 'react';
import { Card } from 'react-bootstrap';

const HomePage = () => {
  return (
    //Page container: Two-column layout 
    <div>
      <div style={styles.title}>
        <h1>My Study App</h1>
      </div>
    
      <div style={styles.pageContainer}>
        {/* Left Side*/}
        <div style={styles.leftSide}>
          {/*  Welcome section */}
          <div style={styles.welcomeContainer}>
            <h1 style={styles.welcomeTitle}>Welcome to Your Study Hub</h1>
            <p style={styles.welcomeText}>This is your one-stop destination for all things study-related. 
              Stay on top of your tasks with our To-Do List, keep all your notes organized and accessible, 
              and effortlessly calculate your grades to track your academic progress. 
              Whether you're preparing for exams, managing assignments, or just looking to improve your productivity, 
              we've got you covered. Let's make studying smarter, more efficient, and less stressful!"
            </p>
          </div>
          {/*  Promotion section */}
          <div style={styles.promotionContainer}>
            <div style={styles.imageContainer}>
              <img 
                src="/studying.jpg" 
                alt="Aesthetic Art" 
                style={styles.promotionImage} 
              />
            </div>
            <div style={styles.promotionText}>
              <h3 style={styles.promotionTitle}>Boost Your Productivity</h3>
              <p style={styles.promotionDescription}>
                Our app helps you stay on track, prioritize your tasks, and get things done faster.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div style={styles.rightSide}>
          {/* image */}
          <img 
            src="/lofi-image.jpg" 
            alt="Aesthetic Art" 
            style={styles.rightSideImage} 
          />
          {/*card that links to notes page*/}
          <Card 
            style={styles.card} 
            onClick={() => window.location.href = "/notes"} 
          >
            <Card.Header style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Go To Notes</h3>
            </Card.Header>
            <Card.Body>
            <div style={styles.cardContent}>
                <img 
                  src="/books1.jpg" 
                  alt="Notes" 
                  style={styles.cardImage} 
                />
                <div style={styles.cardText}>
                  <p style={styles.cardDescription}>
                    Easily jot down your thoughts, ideas, and notes in a simple and organized way.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

// styles for the homepage
const styles = {
  title:{
    backgroundColor: 'white',
    textAlign: 'center', 
    marginRight: '20px',
    marginTop: '30px',
    marginLeft: '30px',
    color: 'black',
    padding: '10px 20px',
    borderRadius: '50px',
    border: '2px solid black',
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)", 
  },
  pageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: '100vh',
    color: 'white',
    padding: '40px',
  },
  leftSide: {
    flex: 1,
    marginRight: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  welcomeContainer: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#2a2a2a',
    borderRadius: '10px',
    border: '1.5px solid white',
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.8)"
  },
  welcomeTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#32a852', 
    marginBottom: '15px',
  },
  welcomeText: {
    fontSize: '1.2rem',
    color: 'white',
    marginBottom: '20px',
  },
  promotionContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: '20px',
    border: '1.5px solid white',
    borderRadius: '10px',
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.8)"
  },
  imageContainer: {
    marginRight: '20px',
    border: '1.5px solid white',
    borderRadius: '10px',
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.8)"
  },
  promotionImage: {
    width: '200px',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.8)"
  },
  promotionText: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#32a852', 
    marginBottom: '10px',
  },
  promotionDescription: {
    fontSize: '1rem',
    color: 'white',
  },

  rightSide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightSideImage: {
    width: '550px',
    height: '250px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1.5px solid white',
    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.8)"
  },
  card: {
    backgroundColor: '#2a2a2a',
    color: 'white',
    border: '1.5px solid white',
    boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.8)',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  cardHeader: {
    backgroundColor: '#32a852', 
    color: 'white',
    padding: '10px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  cardBody: {
    padding: '20px',
  },
  cardImage: {
    width: '200px',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.8)',
  },
  cardDescription: {
    fontSize: '1rem',
    color: 'white',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center', 
  },
  cardText: {
    flex: 1,
    margin: '30px'
  },
};


export default HomePage;