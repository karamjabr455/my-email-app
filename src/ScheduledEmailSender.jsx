import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const ScheduledEmailSender = () => {
// Store the current time
const [currentTime, setCurrentTime] = useState(new Date());

// Store the time entered by the user
const [scheduledTime, setScheduledTime] = useState('');

// Store the entered email
const [email, setEmail] = useState('');

// Update the current time every second
useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

// Function to send email
const sendScheduledEmail = () => {
    const templateParams = {
      to_email: email,
      message: `This is your reminder for ${scheduledTime}!`,
    };

    emailjs
      .send(
        'service_kiakddj', //Service ID

        'template_qfarnkm', // Template ID

        templateParams,
        'tyRWgViIpSDmDaaJ8'//  user ID

      )
      .then(() => {
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

// A function to check if we have reached the input time
useEffect(() => {
    if (scheduledTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const [hour, minute] = scheduledTime.split(':');
        const targetTime = new Date();
        targetTime.setHours(hour);
        targetTime.setMinutes(minute);
        targetTime.setSeconds(0);

//If the current time equals or exceeds the specified time
if (now >= targetTime) {
          sendScheduledEmail();
          clearInterval(interval); // Stop the timer after sending the email

        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [scheduledTime, email]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-lg font-bold mb-4">Current Time: {currentTime.toLocaleTimeString()}</h1>

      {/* إدخال الوقت */}
      <input
        type="time"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

{/* Enter email */}
<input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter recipient email"
        className="border p-2 rounded w-full mb-2"
      />

{/* Button to set alarm */}
<button
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded "
        onClick={() => alert('Reminder set successfully!')}
      >
        Set Reminder
      </button>
    </div>
  );
};

export default ScheduledEmailSender;
