import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import LandingVariant2 from "@/pages/LandingVariant2";
import ColorVariant from "@/pages/ColorVariant";
import { DesignSwitcher } from "@/components/DesignSwitcher";

function Router() {
  return (
    <Switch>
      {/* Original Landing */}
      <Route path="/" component={Landing} />
      
      {/* Brutalist Variant */}
      <Route path="/v2" component={LandingVariant2} />
      
      {/* Color Variants */}
      <Route path="/color/crimson" component={() => <ColorVariant theme="theme-crimson" />} />
      <Route path="/color/tangerine" component={() => <ColorVariant theme="theme-tangerine" />} />
      <Route path="/color/canary" component={() => <ColorVariant theme="theme-canary" />} />
      <Route path="/color/emerald" component={() => <ColorVariant theme="theme-emerald" />} />
      <Route path="/color/teal" component={() => <ColorVariant theme="theme-teal" />} />
      <Route path="/color/azure" component={() => <ColorVariant theme="theme-azure" />} />
      <Route path="/color/indigo" component={() => <ColorVariant theme="theme-indigo" />} />
      <Route path="/color/violet" component={() => <ColorVariant theme="theme-violet" />} />
      <Route path="/color/magenta" component={() => <ColorVariant theme="theme-magenta" />} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <DesignSwitcher />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
