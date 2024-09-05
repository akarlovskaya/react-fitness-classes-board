import React from 'react';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


export const renderSocialIconSwitch = (socialLink) => {
    switch(socialLink) {
        case 'facebook':
          return <FaFacebookSquare />;
        case 'instagram':
            return <FaInstagram />;
        case 'x_com':
            return <FaXTwitter />;
        case 'linkedin':
            return <FaLinkedin />;
            
        default:
          return <FaLink />;
      }
};

// Convert time to AM / PM for ClassPage.jsx
export const changeTimeFormat = (time) => {
        const timeString12hr = new Date('1970-01-01T' + time + 'Z')
            .toLocaleTimeString('en-CA',
            {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
            );
        return timeString12hr;
    }

// Capitalize First Letter for Days Array and string together with comma for ClassPage.jsx
export function formatDaysArray(daysArray) {
    return daysArray.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
};
