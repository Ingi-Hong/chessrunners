import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Filters from "./filters/filters";
import Videos from "./videos/videos";
import Header from "./components/header/header";

const client = new QueryClient();
/*
 * STATE IS HORRIBLY UGLY IF BECOMES ISSUE WILL BE HEADACHE TO FIX ONE DAY.
 */
function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="h-svh overflow-hidden grid-rows-2-[auto_1fr] grid">
        <Header />
        <div className="md:grid grid-cols-[200px_1fr] h-svh w-svw overflow-hidden">
          <Filters />
          <Videos />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
