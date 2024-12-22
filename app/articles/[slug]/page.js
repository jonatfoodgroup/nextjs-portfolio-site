
import articles from "../../data/articles.json";
import Header from "../../components/Header";
import Footer from "../../components/marketing/Footer";
import ArticleContent from "../../components/article/ArticleContent";
export async function generateMetadata({ params }) {
    const { slug } = params;

    const article = articles.find((article) => article.slug === slug);

    return {
        title: article.title,
        description: article.description,
        image: article.image,
    };
}

export default async function SingleArticle({ params }) {
    const { slug } = params;

    const article = articles.find((article) => article.slug === slug);

    return (
        <>
            <Header />
            <ArticleContent article={article} />
            <Footer />
        </>
    );
}