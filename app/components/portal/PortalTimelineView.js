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
                    projectUrl: `/portal/${company.id}/projects/${project.id}`,
                    title: project.title,
                    start_time: moment(project.startDate).toDate(),
                    end_time: moment(project.endDate).toDate(),
                    backgroundColor: companyColor,
                    color: "#fff",
                    itemHeight: 30,
                });

                items.sort((a, b) => a.start_time - b.start_time);
                groupIndex++;
            });
        }
    });

    // State to control zoom level & horizontal movement
    const [visibleTimeStart, setVisibleTimeStart] = useState(moment().subtract(1, 'months').startOf('isoWeek').valueOf());
    const [visibleTimeEnd, setVisibleTimeEnd] = useState(moment().add(2, 'months').endOf('isoWeek').valueOf());

    // Function to handle trackpad zoom
    const handleWheelZoom = (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            
            const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9; // Adjusted zoom factor for smoother zoom
            const currentRange = visibleTimeEnd - visibleTimeStart;
            const newRange = currentRange * zoomFactor;

            const midPoint = visibleTimeStart + currentRange / 2;
            setVisibleTimeStart(midPoint - newRange / 2);
            setVisibleTimeEnd(midPoint + newRange / 2);
        }
    };

    // Allow horizontal movement & zoom
    const handleTimeChange = (start, end) => {
        setVisibleTimeStart(start);
        setVisibleTimeEnd(end);
    };

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
        <div className="timeline-container" id="timelineContainer">
            <Timeline
                groups={groups}
                items={items}
                visibleTimeStart={visibleTimeStart}
                visibleTimeEnd={visibleTimeEnd}
                onTimeChange={handleTimeChange} // ✅ Allow smooth left/right movement
                canMove={true}  // ✅ Enables horizontal scrolling
                traditionalZoom={true}
                canResize={true}
                minZoom={7 * 24 * 60 * 60 * 1000} // ✅ Minimum zoom is 1 week
                maxZoom={5 * 365 * 24 * 60 * 60 * 1000} // ✅ Max zoom is 5 years
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
                        style={{ backgroundColor: "red", width: "2px", zIndex: 50 }}
                    />
                </TimelineMarkers>
            </Timeline>
        </div>
    );
};

export default PortalTimelineView;