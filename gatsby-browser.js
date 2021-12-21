/**
 * Injecting twitter JS for embedded tweets, since the embedded plugin does not do this itself
 * Copied from https://github.com/octahedroid/gatsby-remark-twitter/blob/master/gatsby-browser.js
 */
function addJS(jsCode) {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.innerText = jsCode;
  document.getElementsByTagName("head")[0].appendChild(s);
}

function injectTwitterScript() {
  addJS(`
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
      return t;
    }(document, "script", "twitter-wjs"));
  `);
}

let injectedTwitterScript = false;
function onRouteUpdate({ location }) {
  // If there's an embedded tweet, lazy-load the twitter script (if it hasn't
  // already been loaded), and then run the twitter load function.
  if (document.querySelector(".twitter-tweet") !== null) {
    if (!injectedTwitterScript) {
      injectTwitterScript();
      injectedTwitterScript = true;
    }

    if (
      typeof twttr !== "undefined" &&
      window.twttr.widgets &&
      typeof window.twttr.widgets.load === "function"
    ) {
      window.twttr.widgets.load();
    }
  }

  // Always start at the top of the page on a route change. More investigation needed for
  // a better solution. See https://github.com/gatsbyjs/gatsby/pull/3483
  if (
    typeof window !== "undefined" &&
    window.document.getElementById("stage")
  ) {
    window.document.getElementById("stage").scrollTo(0, 0);
  }
}

function shouldUpdateScroll() {
  return false;
}

module.exports = {
  onRouteUpdate,
  shouldUpdateScroll,
};
