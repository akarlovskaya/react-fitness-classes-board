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


export const DAYS = [
    {
      id: "1",
      name: "monday",
      label: "Monday"
    },
    {
      id: "2",
      name: "tuesday",
      label: "Tuesday"
    },
    {
      id: "3",
      name: "wednesday",
      label: "Wednesday"
    },
    {
      id: "4",
      name: "thursday",
      label: "Thursday"
    },
    {
      id: "5",
      name: "friday",
      label: "Friday"
    },
    {
      id: "6",
      name: "saturday",
      label: "Saturday"
    },
    {
       id: "7",
       name: "sunday",
       label: "Sunday"
    }
  ];

export const PAYMENT_OPTIONS = [
    {
        id: "1",
        type: "etransfer",
        label: "E-transfer"
    },
    {
        id: "2",
        type: "cash",
        label: "Cash"
    },
    {
        id: "3",
        type: "visaMastercard",
        label: "Visa/Mastercard"
    },
    {
        id: "4",
        type: "cheque",
        label: "Cheque"
    }
  ];