import fs from 'fs';
import softwares from '../data/softwares';

export function exportCSV() {
    // Flatten data
    const flatData = [];

    softwares.forEach(software => {
        // Base fields
        const base = {
            title: software.title,
            slug: software.slug,
            description: software.content?.description || "",
            services: software.content?.services?.join(", ") || ""
        };

        // Add features if they exist
        if (software.features) {
            software.features.forEach(feature => {
                flatData.push({
                    ...base,
                    feature_area: feature.area,
                    feature_name: feature.feature,
                    feature_purpose: feature.purpose
                });
            });
        } else {
            flatData.push(base); // Add software without features
        }
    });

    // Convert to CSV format
    const headers = [
        "title", "slug", "description", "services",
        "feature_area", "feature_name", "feature_purpose"
    ];
    const csvRows = [headers.join(",")];

    flatData.forEach(row => {
        csvRows.push([
            row.title,
            row.slug,
            `"${row.description}"`,
            `"${row.services}"`,
            row.feature_area || "",
            row.feature_name || "",
            row.feature_purpose || ""
        ].join(","));
    });

    // Write to file
    fs.writeFileSync('software_plugins.csv', csvRows.join("\n"));

    console.log("CSV file created: software_plugins.csv");
}