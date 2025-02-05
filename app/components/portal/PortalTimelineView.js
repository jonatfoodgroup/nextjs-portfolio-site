"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import moment from "moment";

const colorPalette = [
    "#6A5ACD", "#8A2BE2", "#00CED1", "#9370DB",
    "#7B68EE", "#32CD32", "#4169E1", "#20B2AA",
    "#9370DB", "#008B8B"
];

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
            const portalUrl = `/portal/${company.id}`;

            groups.push({
                id: groupIndex,
                title: company.properties.name,
                portalUrl,
                height: 70,
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
                    projectUrl: `/portal/${company.id}/projects/${project.id}`,
                    title: project.title,
                    start_time: moment(project.startDate).toDate(),
                    end_time: moment(project.endDate).toDate(),
                    backgroundColor: companyColor,
                    color: "#fff",
                    itemHeight: 60,
                });

                items.sort((a, b) => a.start_time - b.start_time);
                groupIndex++;
            });
        }
    });

    // Keep Today Fixed at the Leftmost Position
    const today = moment().startOf("day").valueOf();
    const defaultViewRange = 30 * 24 * 60 * 60 * 1000; // 30-day range

    // Always start the timeline at "Today"
    const [visibleTimeStart, setVisibleTimeStart] = useState(today);
    const [visibleTimeEnd, setVisibleTimeEnd] = useState(today + defaultViewRange);

    const handleTimeChange = (start, end) => {
        // Prevent the timeline from shifting past today
        if (start !== today) {
            setVisibleTimeStart(today);
            setVisibleTimeEnd(today + defaultViewRange);
        }
    };

    // Function to handle zooming with trackpad
    const handleWheelZoom = (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();

            const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
            const currentRange = visibleTimeEnd - visibleTimeStart;
            const newRange = currentRange * zoomFactor;

            const midPoint = visibleTimeStart + currentRange / 2;
            setVisibleTimeStart(midPoint - newRange / 2);
            setVisibleTimeEnd(midPoint + newRange / 2);
        }
    };

    // Handle horizontal movement
    // const handleTimeChange = (start, end) => {
    //     // Prevent moving too far past today
    //     if (start > today - (defaultViewRange * 0.1)) {
    //         setVisibleTimeStart(today - (defaultViewRange * 0.1));
    //         setVisibleTimeEnd(today + (defaultViewRange * 0.9));
    //     } else {
    //         setVisibleTimeStart(start);
    //         setVisibleTimeEnd(end);
    //     }
    // };

    // Attach event listener for trackpad zoom
    useEffect(() => {
        const timelineContainer = document.getElementById("timelineContainer");
        if (timelineContainer) {
            timelineContainer.addEventListener("wheel", handleWheelZoom, { passive: false });
        }
        return () => {
            if (timelineContainer) {
                timelineContainer.removeEventListener("wheel", handleWheelZoom);
            }
        };
    }, [visibleTimeStart, visibleTimeEnd]);

    return (
        <div className="timeline-container container mx-auto" id="timelineContainer">
            <Timeline
                groups={groups}
                items={items}
                visibleTimeStart={visibleTimeStart}
                visibleTimeEnd={visibleTimeEnd}
                onTimeChange={handleTimeChange}
                canMove={true}
                traditionalZoom={true}
                canResize={true}
                minZoom={7 * 24 * 60 * 60 * 1000}
                maxZoom={5 * 365 * 24 * 60 * 60 * 1000}
                sidebarWidth={300}
                timeSteps={{ day: 7 }}
                stackItems
                itemHeightRatio={0.75}
                headerLabelFormats={{
                    year: { long: "YYYY" },
                    month: { long: "MMMM YYYY" },
                    week: { long: "'Week of' MMM D" },
                    day: { long: "dddd, MMM D" },
                }}
                headerLabelGroupHeight={50} // ✅ Increase header height
                headerLabelHeight={40} // ✅ I
                groupRenderer={({ group }) => (
                    <div
                        className={`${group.isCompany ? "font-bold text-white" : "text-gray-400"}`}
                        style={{
                            backgroundColor: group.color || "transparent",
                            // padding: "6px",
                            textAlign: "center",
                            fontSize: "18px",
                            margin: "0",
                            display: "flex",
                            width: "100%",
                            MARGINTOP: "10px",
                            alignItems: "center",
                            cursor: group.isCompany ? "pointer" : "default",
                        }}
                        onClick={() => group.isCompany && router.push(group.portalUrl)}
                    >
                        {group.isCompany ? (
                            <a
                                href={group.portalUrl}
                                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                                onClick={(e) => e.stopPropagation()}
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
                {/* Today Marker */}
                <TimelineMarkers>
                    <TodayMarker
                        date={moment().toDate()}
                        className="today-marker"
                        // style={{ backgroundColor: "red", width: "2px", zIndex: 50 }}
                    />
                </TimelineMarkers>
            </Timeline>
        </div>
    );
};

export default PortalTimelineView;