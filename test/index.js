import assert from 'assert';
import test from 'selenium-webdriver/testing';
import webdriver from 'selenium-webdriver';

const BASE_URL = 'http://localhost:4000'

const TITLE_SUFFIX = ' \u2014 Philip Walton';

const WAIT_TIMEOUT = 200;

const ARTICLES = [
  'Side Effects in CSS',
  'Normalizing Cross-browser Flexbox Bugs',
  'Measuring Your Site\'s Responsive Breakpoint Usage',
  'The Dangers of Stopping Event Propagation',
  'Stop Copying Social Code Snippets',
  'Implementing Private and Protected Members in JavaScript',
  'How to Find Qualified Developers',
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
];


test.describe('The home page', function() {

  let driver;
  let until = webdriver.until;

  test.before(function() {
    driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get(BASE_URL);
  });

  test.after(function() {
    driver.quit();
  })

  test.it('contains a list of all published articles.', function() {

    ARTICLES.forEach((title, i) => {

      let selector = `.ArticleList-item:nth-child(${i+1})
                      .ArticlePreview-title`;

      driver.findElement({css: selector}).getText().then((text) =>
          assert.equal(text, ARTICLES[i]));
    });
  });

  test.it('has working links to all published articles.', function() {

    ARTICLES.forEach((title, i) => {
      let selector = `.ArticleList-item:nth-child(${i+1}) .ArticlePreview`;
      let link = driver.findElement({css: selector});

      link.click();
      driver.wait(until.titleContains(ARTICLES[i]), WAIT_TIMEOUT);
      driver.navigate().back();
      driver.wait(until.titleContains('Home'), WAIT_TIMEOUT);
    });

  });

});
