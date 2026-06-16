const Parser = require('rss-parser');
const parser = new Parser();

async function getNews() {
  const query = process.argv[2] || 'Google';
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

  console.log(`Fetching recent news for "${query}"...\n`);

  try {
    const feed = await parser.parseURL(url);
    
    if (!feed.items || feed.items.length === 0) {
      console.log('No news articles found.');
      return;
    }

    console.log(`=== Recent News for "${query}" ===`);
    feed.items.slice(0, 10).forEach((item, index) => {
      console.log(`\n[${index + 1}] ${item.title}`);
      console.log(`    Published: ${item.pubDate}`);
      console.log(`    Link:      ${item.link}`);
    });
    console.log('\n=================================');
  } catch (error) {
    console.error('Error fetching or parsing news feed:', error.message);
  }
}

getNews();
