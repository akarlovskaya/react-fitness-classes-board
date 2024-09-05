import React from 'react';
import { Link } from 'react-router-dom';
import { renderSocialIconSwitch } from '../utilities/Utilities';


const SocialLinks = ({socialLinks}) => {
  return (
    <>
    <h3 className="text-xl mt-4">Find me on:</h3>
        <ul className="flex justify-left items-center gap-3 my-3">
          {Object.values(socialLinks).map((socialLink) => {
            return (
              <li key={socialLink.name} className="text-xl content-center mr-2 hover:text-orange-dark">
                <Link to={`https://${socialLink.link}`} target="_blank" rel="noopener noreferrer">
                  {renderSocialIconSwitch(socialLink.name)} {/* Render the icon */}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <ul className="flex h-10">
          {socialLinks.map(socialLink => {
              return (
                  <li key={socialLink} className="text-lg content-center mr-2">
                    <Link to={`www.${socialLink}.com/`}>{renderSocialIconSwitch(socialLink)}</Link>
                  </li>
              )
          }
          )}
        </ul> */}
    </>
  )
}

export default SocialLinks;
