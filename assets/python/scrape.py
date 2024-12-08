from serpapi import GoogleSearch
from urllib.parse import urlsplit, parse_qsl
import json
import pandas as pd

params = {
  "api_key": "YOUR_SERPAPI_KEY",                   # your api key
  "engine": "google_maps_reviews",                    # serpapi search engine
  "hl": "id",                                         # language of the search
  "data_id": "0x2e69c78ba2f1ba31:0x725dc1ce12afe652"  # place id data located inside Google Maps Place URL: located inside `data=` query parameter. 
}

search = GoogleSearch(params)


reviews = []

page_num = 0
while True:
    page_num += 1
    results = search.get_dict()

    print(f"Extracting reviews from {page_num} page.")

    if not "error" in results:
        for result in results.get("reviews", []): # return an empty list [] if no reviews from the place
            reviews.append({
                "page": page_num,
                "name": result.get("user").get("name"),
                "link": result.get("user").get("link"),
                "thumbnail": result.get("user").get("thumbnail"),
                "rating": result.get("rating"),
                "date": result.get("date"),
                "snippet": result.get("snippet"),
                "images": result.get("images"),
                "local_guide": result.get("user").get("local_guide"),
                # other data
            })
    else:
        print(results["error"])
        break

    if results.get("serpapi_pagination").get("next") and results.get("serpapi_pagination").get("next_page_token"):
        # split URL in parts as a dict and update search "params" variable to a new page that will be passed to GoogleSearch()
        search.params_dict.update(dict(parse_qsl(urlsplit(results["serpapi_pagination"]["next"]).query)))
        #search.params_dict.update(dict(parse_qsl(urlsplit(results["serpapi_pagination"]["next"]).query)))
    else:
        break


print(json.dumps(reviews, indent=2, ensure_ascii=False))
df = pd.DataFrame(reviews)
df.to_csv(f"data.csv", index=False)