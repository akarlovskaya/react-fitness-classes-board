import React from 'react';
import { Link } from 'react-router-dom';

const SocialLinks = ({socialLinks}) => {
  return (
    <ul>
        {socialLinks.map(socialLink => {
            return <li key={socialLink}>
                        <Link to={`www.${socialLink}.com/`}>{socialLink}</Link>
                    </li>
        }
        )}
    </ul>
  )
}

export default SocialLinks;
