import { Providers } from "./providers";
import { AppRouter } from "./router";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => (
  <Providers>
    <AppRouter />
    <SpeedInsights />
  </Providers>
);

export default App;
