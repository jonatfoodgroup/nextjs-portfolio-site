const WORDPRESS_URL = "https://jonsenterfitt.com/wp-json/wp/v2";

export async function GET() {
  const baseUrl = `${WORDPRESS_URL}/service`;
  let services = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await fetch(`${baseUrl}?per_page=100&page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return new Response(JSON.stringify({ error: `Failed to fetch: ${response.statusText}` }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();

      // Safeguard against missing or malformed headers
      const total = response.headers.get('X-WP-TotalPages') || "1";
      totalPages = parseInt(total, 10);

      // Filter and simplify the response
      const simplifiedData = data.map((item) => ({
        id: item.id,
        title: item.title.rendered,
        slug: item.slug,
        link: item.link,
        live_link: `https://strongstart.digital/service/${item.slug}`,
        acf: item.acf || null, // Include ACF if available
        parent: item.parent,
        menu_order: item.menu_order,
      }));

      services = [...services, ...simplifiedData];
      page++;
    } while (page <= totalPages);

    return new Response(JSON.stringify(services), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: `Server error: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}