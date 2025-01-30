"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const HubspotLinkButton = ({ hubspotId }) => {
    return (
        <Link
           href={`https://app.hubspot.com/contacts/22555624/record/0-2/${hubspotId}`}
              passHref={true}
        >
            <Icon icon="simple-icons:hubspot" />
        </Link>
    );
}

export default HubspotLinkButton;