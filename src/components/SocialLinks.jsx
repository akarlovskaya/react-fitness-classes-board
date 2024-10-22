import React from 'react';
import { renderSocialIconSwitch } from '../utilities/Utilities';

const SocialLinks = ({ socialLinks, loading }) => {

  const normalizeLink = (link) => {
    // Remove any leading/trailing spaces
    let normalizedLink = link.trim();

    // If the link starts with neither 'http' nor 'https', add 'https://'
    if (!normalizedLink.startsWith('http://') && !normalizedLink.startsWith('https://')) {
      normalizedLink = 'https://' + normalizedLink;
    }

    return normalizedLink;
  };

  return (
    <>
    { !loading && socialLinks.length > 0 && (
      <>
        <h3 className="text-xl mt-4">Find me on:</h3>
        <ul className="flex justify-left items-center gap-3 my-3">
          {socialLinks.map((socialLink) =>
          socialLink.link !== '' && (
            <li key={socialLink.name} className="text-xl content-center mr-2 hover:text-orange-dark">
                <a href={normalizeLink(socialLink.link)} target="_blank" rel="noopener noreferrer">
                  {renderSocialIconSwitch(socialLink.name)} {/* Render the icon */}
                </a>
              </li>
            )
          )}
          </ul>
      </>
    )}
    </>
  );
};

export default SocialLinks;