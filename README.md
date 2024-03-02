# NewRelic NextJS Integration
## Browser Integration 
### Copy Paste method from this [comment](https://github.com/newrelic/newrelic-node-nextjs/issues/154#issuecomment-1773938830)
- Get browser script from newrelic and paste it in your app.  I created a new [variable](./app/script.ts)
  - Make sure to remove the script html tags
  - __Do a search on `\n` and replace with a space__
```javascript
    ;window.NREUM||(NREUM={})... // <--- Make sure to replace `\n` with ` ` there should be four of them 
```
- Add a new component for the script tag [example](./app/newrelic.tsx#L13)
- Then add to your root [Layout](./app/layout.tsx)
- Lastly add this to your next.config.js [here](./next.config.mjs#L3) 
```javascript
 experimental: {
    serverComponentsExternalPackages: ["newrelic"],
  },
``` 

### Error Handling 
- Once we have the browser integration complete, now we can forward our errors over to newrelic
- If using typescript you'll have to add newrelic to the Window type
    ```typescript
    declare const window: Window &
        typeof globalThis & {
            newrelic: any
        }
    ```
- In your default error page add
 ```typescript
    useEffect(() => {
    if (typeof window !== 'undefined') {
      window.newrelic?.noticeError(error)
    }
  }, [error])
  ```
- The resulting error page should look like [this](./app/error.tsx)
  
## Logger
- Install Winston `npm i winston`
- Since the agent does not work our logs won't be transported to newrelic
- Instead we can either create or install a newrelic logs api transport 
- For the time being install `npm i winston-newrelic-logs-transport` 
  - This takes our logs and sends them to newrelic via a post request
- Create your custom logger. [Example](./app/components/logger.tsx)
- If you would like to associate your logs with the browser integration that we did previously. Go to your browser application in newrelic.  
- Then get the entity guid from the metadata tag at the top and make sure to pass that with your logs. [DefaultMeta](./app/components/logger.tsx#L17)   