import assert from 'assert';
import webdriver from 'selenium-webdriver';

const BASE_URL = 'http://localhost:4000'

const ARTICLES = [
  'Side Effects in CSS',
  'Normalizing Cross-browser Flexbox Bugs',
  'Measuring Your Site\'s Responsive Breakpoint Usage',
  'Web Components and the Future of Modular CSS',
  'The Dangers of Stopping Event Propagation',
  'Stop Copying Social Code Snippets',
  'Implementing Private and Protected Members in JavaScript',
  'Dependency Management in CSS',
  'How to Find Qualified Developers',
  'Music, Web Browesrs, and the Well-Tempered Clavier',
  'Interviewing as a Front-End Engineer in San Francisco',
  'Solved by Flexbox',
  'Decoupling Your HTML, CSS, and JavaScript',
  'Why I Test Private Functions In JavaScript',
  'How to Unit Test Private Functions in JavaScript',
  'Introducing HTML Inspector',
  'CSS: Everything is Global and How to Deal With It',
  'Dynamic Selectors',
  'Defending Presentational Class Names',
  'The Future of OOCSS: A Proposal',
  'What No One Told You About Z-Index',
  'CSS Architecture',
]

describe('The home page', function() {

  let driver;

  before(function() {
    driver = new webdriver.Builder().forBrowser('chrome').build();
    return driver.get(BASE_URL);
  });

  after(function() {
    driver.quit();
  })

  it('lists all published articles.', function() {

    function assertArticleTitlesMatch(item, expectedTitle) {
      item.findElement({css: '.ArticlePreview-title'})
          .getText()
          .then((text) => assert.equal(text, expectedTitle));
    }

    return driver
        .findElements({css: '.ArticleList-item'})
        .then((items) => items.forEach((item, i) =>
            assertArticleTitlesMatch(item, ARTICLES[i])));
  });

});
