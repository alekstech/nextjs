const Roadmap = () => {
  return (
    <>
      <h1>Aleks Sobieraj</h1>
      <p>Web developer</p>
      <p>Toronto, Canada</p>
      <h2>Portfolio</h2>
      <p>Tools I used to make this portfolio</p>
      <ul>
        <li>webpack</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>S3 and CloudFront for file hosting</li>
      </ul>
      <h2>Roadmap</h2>
      <p>My to-do list for this portfolio</p>
      <ul>
        <li>optimized images</li>
        <li>authentication</li>
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
        <li>a DynamoDB backend</li>
        <li>accessible HTML</li>
        <li>pastel colours</li>
        <li>several modern CSS features</li>
        <li>optionally, an application (layer 7) load balancer</li>
      </ul>
      <h2>Contents</h2>
      <p>This portfolio will contain</p>
      <ul>
        <li>this file, with references,</li>
        <li>a link to my LinkedIn,</li>
        <li>things I would like people to read.</li>
      </ul>
      <p>This portfolio will not contain</p>
      <ul>
        <li>an HTTP server because content is served by a combination of CloudFront and Lambda@Edge,</li>
        <li>Kubernetes because I&#39;m about a million pageviews a day short of needing to go multi-cloud,</li>
        <li>spelling mistakes or authentication tokens 🤞.</li>
      </ul>

    </>
  );
};

export default Roadmap;
