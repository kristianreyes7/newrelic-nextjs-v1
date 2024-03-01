# NewRelic NextJS Integration

## APM
- Install New Relic packages ```npm install newrelic @newrelic/next``` 
- Create a newrelic configuration file [newrelic.js](./newrelic.js)
  - For more settings see [here](./node_modules/newrelic/lib/config/default.js)
  - **App Name and License Key are required**
- Modify package.json and add the following to your dev and start scripts to require @newrelic/next
  - `NODE_OPTIONS='-r @newrelic/next'`
## Browser Integration
- Create a new component
- Get the script using newrelic.getBrowserTimingHeader
- Make sure to remove script wrapper and allowTransactionlessInjection
```typescript  
  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    // @ts-ignore
    allowTransactionlessInjection: true,
  });
```
- Your component should look like [this](./app/newrelic.tsx#L6)
- Then add to your root [Layout](./app/layout.tsx)

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

### Copy Paste method from this [comment](https://github.com/newrelic/newrelic-node-nextjs/issues/154#issuecomment-1773938830)
- Get browser script from newrelic and paste it in your app.  I created a new [variable](./app/script.ts)
  - Make sure to remove the script html tags
  - __Do a search on `\n` and replace with a space__
```javascript
    ;window.NREUM||(NREUM={})... // <--- Make sure to replace `\n` with ` ` there should be four of them 
```
- Add a new component for the script tag [example](./app/newrelic.tsx#L24)
- Then add to your root [Layout](./app/layout.tsx)