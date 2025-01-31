"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import moment from "moment";

// Refined color palette with blue, purple, and green tones
const colorPalette = [
    "#6A5ACD", "#8A2BE2", "#00CED1", "#4682B4",
    "#7B68EE", "#32CD32", "#4169E1", "#20B2AA",
    "#9370DB", "#008B8B"
];

// Function to assign a color to each company
const getCompanyColor = (companyName) => {
    const hash = companyName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorPalette[hash % colorPalette.length];
};

const PortalTimelineView = ({ companies }) => {
    const router = useRouter();
    let groupIndex = 1;

    const groups = [];
    const items = [];

    companies.forEach(company => {
        const companyProjects = (company.projects || []).filter(project => project.startDate && project.endDate);

        if (companyProjects.length > 0) {
            const companyColor = getCompanyColor(company.properties.name);
            const portalUrl = `/portal/${company.id}`; // Adjust the route as needed

            groups.push({
                id: groupIndex,
                title: company.properties.name,
                portalUrl, // Store portal URL
                height: 50,
                isCompany: true,
                color: companyColor,
            });

            const companyGroupId = groupIndex;
            groupIndex++;

            companyProjects.forEach(project => {
                groups.push({
                    id: groupIndex,
                    title: `↳ ${project.title}`,
                    height: 40,
                });

                items.push({
                    id: project.id,
                    group: groupIndex,
                    projectUrl: `/portal/${company.id}/projects/${project.id}`, // Store project URL
                    title: project.title,
                    start_time: moment(project.startDate).toDate(),
                    end_time: moment(project.endDate).toDate(),
                    backgroundColor: companyColor,
                    color: "#fff",
                    itemHeight: 30,
                });

                // sort by start date
                items.sort((a, b) => {
                    if (a.start_time < b.start_time) return -1;
                    if (a.start_time > b.start_time) return 1;
                    return 0;
                });

                groupIndex++;
            });
        }
    });

    return (
        <div className="" id="timelineContainer">
            <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={moment().subtract(7, 'days').startOf('day')}  // Zoom out to a week before
                defaultTimeEnd={moment().add(60, 'days').startOf('day')} // Zoom out to show 2 months ahead
                canMove={true}
                traditionalZoom={true}
                canResize={false}
                visibleTimeStart={moment().subtract(7, 'days').toDate()} // Set start to a week before
                visibleTimeEnd={moment().add(60, 'days').toDate()} // Show two months ahead
                sidebarWidth={300}
                stackItems
                itemHeightRatio={0.75} // Adjusted for better fit
                groupRenderer={({ group }) => (
                    <div
                        className={`p-2 ${group.isCompany ? "font-bold text-white" : "text-gray-400"}`}
                        style={{
                            backgroundColor: group.color || "transparent",
                            padding: "6px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            cursor: group.isCompany ? "pointer" : "default", // Pointer only for companies
                        }}
                        onClick={() => group.isCompany && router.push(group.portalUrl)}
                    >
                        {group.isCompany ? (
                            <a
                                href={group.portalUrl}
                                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                                onClick={(e) => e.stopPropagation()} // Prevent interfering with timeline clicks
                            >
                                {group.title}
                            </a>
                        ) : (
                            group.title
                        )}
                    </div>
                )}
                itemRenderer={({ item, getItemProps }) => {
                    const { key, ...restProps } = getItemProps({
                        style: {
                            background: item.backgroundColor,
                            color: item.color,
                            padding: "6px",
                            borderRadius: "4px",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                        },
                    });

                    return (
                        <div key={key} {...restProps}>
                            <a href={item.projectUrl} style={{ textDecoration: "none", color: "inherit" }}>
                                <span>{item.title}</span>
                            </a>
                        </div>
                    );
                }}
            >
                {/* Add Today Marker */}
                <TimelineMarkers>
                    <TodayMarker
                        date={moment().toDate()}
                        className="today-marker"
                        style={{ backgroundColor: "red", width: "2px", zIndex: 50 }}
                    />
                </TimelineMarkers>
            </Timeline>
        </div>
    );
};

export default PortalTimelineView;