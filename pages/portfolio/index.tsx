const Page = () => {
  return (
    <>
      <h1>Portfolio</h1>

      <h2>Contents</h2>
      <figure>
        <figcaption>This portfolio will contain</figcaption>
        <ul>
          <li>this file, with references,</li>
          <li>a link to my LinkedIn,</li>
          <li>things I would like people to read.</li>
        </ul>
      </figure>

      <h2>Stack</h2>
      {/* Render this list as a Collapsible Tree from D3 */}
      <figure>
        <figcaption>Tools I used to make this portfolio</figcaption>
        <ul>
          <li>webpack for development and bundling</li>
          <li>TypeScript for type safety</li>
          <li>React for UI data binding</li>
          <li>Next.js for routing and data pre-fetching</li>
          <li>Cognito and Amplify for authentication</li>
          <li>S3 and CloudFront for hosting</li>
          <li>DynamoDB for data storage</li>
          <li>Route53 for DNS</li>
        </ul>
      </figure>

      <figure>
        <figcaption>Tools I decided not to use</figcaption>
        <ul>
          <li>Kubernetes because I&#39;m about a million pageviews a day short of needing to go multi-cloud,</li>
          <li>spelling mistakes or authentication tokens 🤞.</li>
        </ul>
      </figure>

      <h2>Roadmap</h2>
      <figure>
        <figcaption>My to-do list for this portfolio</figcaption>
        <ul>
          <li>optimized images</li>
          <li>Three.js</li>
          <li>D3</li>
          <li>a service worker</li>
          <li>offline capable</li>
          <li>background sync</li>
          <li>secured with a CSP by Lambda@Edge</li>
          <li>throttled</li>
          <li>lazy loading</li>
          <li>file pre-fetching</li>
          <li>a sitemap</li>
          <li>accessible HTML</li>
          <li>pastel colours</li>
          <li>several modern CSS features</li>
          <li>optionally, an application (layer 7) load balancer</li>
          <li>a Dockerfile</li>
        </ul>
      </figure>

    </>
  );
};

export default Page;
