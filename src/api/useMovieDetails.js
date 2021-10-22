import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = `https://en.wikipedia.org/w/api.php`;

export function useMovieDetails(name, year) {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState();
  const [imdbUrl, setImdbUrl] = useState();

  useEffect(() => {
    async function getDataFromWikiepia() {
      setLoading(true);
      try {
        const searchResponse = await searchForPage(
          `${name} ${new Date(year).getFullYear()} film`
        );
        const firstResult = searchResponse.data.query.search[0];
        if (!firstResult) {
          setDetails("Cannot find the related wikipedia page.");
          return;
        }
        const queryResponse = await getPageExtract(firstResult.pageid);
        const pageData = queryResponse.data.query.pages[firstResult.pageid];
        const imdbLink = pageData.extlinks.filter((link) =>
          link["*"].includes("www.imdb.com/title/")
        )[0];
        if (imdbLink) setImdbUrl(imdbLink["*"]);
        setDetails(pageData.extract);
        setUrl(pageData.fullurl);
      } finally {
        setLoading(false);
      }
    }
    if (name && year) getDataFromWikiepia();
  }, [name, year]);

  return { loading, details, url, imdbUrl };
}

function searchForPage(title) {
  return axios.get(baseUrl, {
    params: {
      action: "query",
      format: "json",
      origin: "*",
      list: "search",
      srsearch: title,
    },
  });
}

function getPageExtract(pageId) {
  return axios.get(baseUrl, {
    params: {
      action: "query",
      format: "json",
      origin: "*",
      inprop: "url",
      prop: "info|extracts|extlinks",
      pageids: pageId,
      exintro: 1,
      exsentences: 5,
      explaintext: 1,
      ellimit: 500,
    },
  });
}
