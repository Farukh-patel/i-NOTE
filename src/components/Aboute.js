import React from 'react';

const About = (props) => {
  const {mode}=props
  return (
    <div className={`container my-3 ${mode === "light" ? "card-body-light" : "card-body-dark"}`}>
      <h1>Welcome to iNotebook!</h1>
      <p>Your personal online notebook to organize, store, and manage your notes effortlessly.</p>
      
      <h2>Features</h2>
      <ul>
        <li>Create and manage notes securely</li>
        <li>Tag your notes for easy categorization</li>
        <li>Light and dark mode for better user experience</li>
        <li>Search notes instantly</li>
        <li>Secure user authentication</li>
      </ul>
      
      <h2>Why iNotebook?</h2>
      <p>We understand that keeping track of ideas, tasks, and information can be overwhelming. 
      iNotebook is designed to help you stay organized and productive by providing a secure platform for all your notes. Whether you're a student, professional, or just someone who loves taking notes, iNotebook is here to make your life easier!</p>
      
      <h2>How to Use iNotebook</h2>
      <ol>
        <li>Sign up or log in to your account.</li>
        <li>Create a new note by clicking the "Add Note" button.</li>
        <li>Fill in the title, description, and tag for your note.</li>
        <li>Edit or delete notes anytime with the respective options.</li>
        <li>Switch between light and dark modes based on your preference.</li>
      </ol>
      
      <h2>Security and Privacy</h2>
      <p>At iNotebook, we prioritize the security of your data. All notes are stored securely, and we use industry-standard authentication to ensure your information is protected.</p>
      
      <h2>Contact Us</h2>
      <p>Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:support@inotebook.com">support@inotebook.com</a>.</p>
    </div>
  );
};

export default About;
