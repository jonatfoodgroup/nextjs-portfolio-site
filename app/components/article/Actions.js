"use client";
import SaveLink from "./SaveLink";
import PrintLink from "./PrintLink";
import ShareLink from "./ShareLink";

export default function Actions({ article }) {
    return (
        <>
        <h3 className="text-sm font-semibold mt-8 mb-4">Actions</h3>
        <div className="flex items-center space-x-2">
            <SaveLink article={article} />
            <PrintLink article={article} />
            <ShareLink
                title={article.title.rendered}
                text={article.excerpt.rendered}
                url={article.link}
            />
        </div>
        </>
    );
}