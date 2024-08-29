import React, { useState } from 'react';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialLinksProfileForm = ( { socialLinks, onSocialLinkChange, editInfo } ) => {

  return (
    <fieldset>
        <legend className="font-semibold uppercase mb-2 mt-8">Social Accounts</legend>
        <div className="mb-4">
            <div key={socialLinks.facebook.name} className="relative flex gap-x-3 mb-4">
                <label
                    htmlFor={socialLinks.facebook.name}
                    className="flex text-lg h-10 items-center">{<FaFacebookSquare />}
                </label>
                <input
                    type="text"
                    id={socialLinks.facebook.name}
                    name={socialLinks.facebook.name}
                    disabled={!editInfo}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Link to social profile. Optional"
                    value={socialLinks.facebook.link}
                    onChange={onSocialLinkChange} 
                />
            </div>

            <div key={socialLinks.instagram.name} className="relative flex gap-x-3 mb-4">
                <label
                    htmlFor={socialLinks.instagram.name}
                    className="flex text-lg h-10 items-center">{<FaInstagram />}
                </label>
                <input
                    type="text"
                    id={socialLinks.instagram.name}
                    name={socialLinks.instagram.name}
                    disabled={!editInfo}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Link to social profile. Optional"
                    value={socialLinks.instagram.link}
                    onChange={onSocialLinkChange} 
                />
            </div>

            <div key={socialLinks.x_com.name} className="relative flex gap-x-3 mb-4">
                <label
                    htmlFor={socialLinks.x_com.name}
                    className="flex text-lg h-10 items-center">{<FaXTwitter />}
                </label>
                <input
                    type="text"
                    id={socialLinks.x_com.name}
                    name={socialLinks.x_com.name}
                    disabled={!editInfo}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Link to social profile. Optional"
                    value={socialLinks.x_com.link}
                    onChange={onSocialLinkChange}
                />
            </div>

            <div key={socialLinks.linkedin.name} className="relative flex gap-x-3 mb-4">
                <label
                    htmlFor={socialLinks.linkedin.name}
                    className="flex text-lg h-10 items-center">{<FaLinkedin />}
                </label>
                <input
                    type="text"
                    id={socialLinks.linkedin.name}
                    name={socialLinks.linkedin.name}
                    disabled={!editInfo}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Link to social profile. Optional"
                    value={socialLinks.linkedin.link}
                    onChange={onSocialLinkChange} 
                />
            </div>
        </div>
    </fieldset>
  )
}

export default SocialLinksProfileForm;