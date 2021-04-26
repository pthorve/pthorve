# Running project
## 1. start API server

```yarn api```

## 2. start the app server

```yarn start```


# About the app

- The app is a server-rendered React Web Application
- `/src/server/renderer` is the handler which returns HTML (server-side rendered)
- before serving any request, the app needs to make some API calls and figure out details like
  - number of countries supported
  - current geolocation (country) of the requestor
  - current config set for the requestor's country, e.g. (ads, feature-toggles)
  - content categories for the requestor's country, e.g. (movies, songs, etc)
  - details of the content requested, e.g. (/video-avengers_movie-123)
- using all the above data the `renderer` generates HTML and sends that as response
- client re-uses the data gathered by server and html to make the app interactive

# Code Structure
- `src/api` - mock API server
- `src/browser` - react app
- `src/server` - server side rendering code


# Problem

share concrete ideas to
- improve server throughput
- improve page load performance on 3g network


# Running benchmarks
- Throughput (current 10-12 #/sec)
  - `ab -c 50 -n 100 http://localhost:8000/`
  - output (current state)
    -
    ```
    Document Path:          /
    Document Length:        83653 bytes

    Concurrency Level:      50
    Time taken for tests:   9.324 seconds
    Complete requests:      100
    Failed requests:        0
    Total transferred:      8385900 bytes
    HTML transferred:       8365300 bytes
    Requests per second:    10.72 [#/sec] (mean)
    Time per request:       4662.247 [ms] (mean)
    Time per request:       93.245 [ms] (mean, across all concurrent requests)
    Transfer rate:          878.26 [Kbytes/sec] received
    ```

- Page Load
  - use Chrome devtools audit
  - settings
    - Device: Mobile
    - Audits: Performace
    - Throttling: Applied slow 4G, 4x CPU Slowdown
  - output (current state)
    - Performance - 28
    - First Contentful Paint - 3.7s
    - First Meaningful Paint - 3.7s
    - Speed Index - 6.7s
    - Time to Interactive - 15.9s
