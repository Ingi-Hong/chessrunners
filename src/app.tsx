import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Filters from "./filters/filters";
import Videos from "./videos/videos";
import Header from "./components/header/header";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="h-svh overflow-hidden grid-rows-2-[auto_1fr] grid">
        <Header />
        <div className="grid grid-cols-[auto_1fr] h-svh w-svw overflow-hidden">
          <Filters />
          <Videos />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
