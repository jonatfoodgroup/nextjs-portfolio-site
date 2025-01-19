"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const HubspotLinkButton = ({ hubspotId }) => {
    return (
        <button
            onClick={() => window.open(`https://app.hubspot.com/contacts/22555624/record/0-2/${hubspotId}`, "_blank")}
        >
            <Icon icon="simple-icons:hubspot" />
        </button>
    );
}

export default HubspotLinkButton;