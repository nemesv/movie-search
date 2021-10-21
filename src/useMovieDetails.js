import axios from "axios";
import { useEffect, useState } from "react";

export function useMovieDetails(name, year) {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState();
  const baseUrl = `https://en.wikipedia.org/w/api.php`;

  useEffect(() => {
    async function getDataFromWikiepia() {
      setLoading(true);
      try {
        const searchResponse = await axios.get(baseUrl, {
          params: {
            action: "query",
            format: "json",
            origin: "*",
            list: "search",
            srsearch: `${name} ${new Date(year).getFullYear()} film`,
          },
        });
        const firstResult = searchResponse.data.query.search[0];
        if (!firstResult) {
          setDetails("Cannot find the related wikipedia page.");
          return;
        }
        const queryResponse = await axios.get(baseUrl, {
          params: {
            action: "query",
            format: "json",
            origin: "*",
            inprop: "url",
            prop: "info|extracts",
            pageids: firstResult.pageid,
            exintro: 1,
            exsentences: 5,
            explaintext: 1,
          },
        });
        const pageData = queryResponse.data.query.pages[firstResult.pageid];
        setDetails(pageData.extract);
        setUrl(pageData.fullurl);
      } finally {
        setLoading(false);
      }
    }
    if (name && year) getDataFromWikiepia();
  }, [name, year, baseUrl]);

  return { loading, details, url };
}
