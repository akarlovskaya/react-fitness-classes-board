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
}

