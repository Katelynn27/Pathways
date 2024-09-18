// Sample article data (you would typically fetch this from a server)
const articles = [
    // page 1
    { title: "Empowering Communities Through Education", image: "FullLogo (1).jpg", excerpt: "Discover how education is transforming lives in underserved areas." },
    { title: "Sustainable Solutions for a Brighter Future", image: "FullLogo (1).jpg", excerpt: "" },
    { title: "Bridging the Digital Divide", image: "FullLogo (1).jpg", excerpt: "" },
];

const articlesPerPage = 7;
let currentPage = 1;

function displayArticles(page) {
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const articleGrid = document.querySelector('.article-grid');
    articleGrid.innerHTML = '';

    for (let i = start; i < end && i < articles.length; i++) {
        const article = articles[i];
        const articleElement = document.createElement('a');
        articleElement.className = 'article-thumbnail';
        articleElement.href = '#'; // Replace with actual article link
        articleElement.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <div class="article-info">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
            </div>
        `;
        articleGrid.appendChild(articleElement);
    }

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(articles.length / articlesPerPage);
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayArticles(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
        currentPage++;
        displayArticles(currentPage);
    }
});

// Initial display
displayArticles(currentPage);