"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const HubspotLinkButton = ({ hubspotId }) => {
    return (
        <a
            href={`https://app.hubspot.com/contacts/22555624/record/0-2/${hubspotId}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Icon icon="simple-icons:hubspot" />
        </a>
    );
}

export default HubspotLinkButton;