import React from 'react';
import { Link } from 'react-router-dom';
import { renderSocialIconSwitch } from '../utilities/Utilities';


const SocialLinks = ({socialLinks}) => {
  return (
    <>
    <h3 className="text-xl mt-4">Follow Me:</h3>
      {/* <div className="mt-6 space-y-6"> */}
        <ul className="flex h-10">
          {socialLinks.map(socialLink => {
              return (
                  <li key={socialLink} className="text-lg content-center mr-2">
                    <Link to={`www.${socialLink}.com/`}>{renderSocialIconSwitch(socialLink)}</Link>
                  </li>
              )
          }
          )}
        </ul>
      {/* </div> */}
    </>
  )
}

export default SocialLinks;
