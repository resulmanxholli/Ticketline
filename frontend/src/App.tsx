import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAppSelector } from "./store/hooks";
import { useRestoreSession } from "./store/useRestoreSession";

// No router yet — a plain view union keeps the static mockup dependency-free.
type View =
  | { name: "home" }
  | { name: "login" }
  | { name: "dashboard" }
  | { name: "event"; eventId: string }
  | { name: "checkout"; eventId: string; tierId: string; quantity: number }
  | { name: "confirmation"; eventId: string; tierId: string; quantity: number };

export default function App() {
  useRestoreSession();
  const [view, setView] = useState<View>({ name: "home" });
  const isAdmin = useAppSelector((s) => s.auth.user?.role === "admin");

  const goHome = () => {
    setView({ name: "home" });
    window.scrollTo(0, 0);
  };

  const openEvent = (eventId: string) => {
    setView({ name: "event", eventId });
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <Header
        onHome={goHome}
        onSignIn={() => setView({ name: "login" })}
        onDashboard={() => setView({ name: "dashboard" })}
      />

      <main>
        {view.name === "login" && <Login onDone={goHome} onCancel={goHome} />}
        {view.name === "dashboard" && isAdmin && <Dashboard onBack={goHome} />}
        {(view.name === "home" || (view.name === "dashboard" && !isAdmin)) && (
          <Home onOpenEvent={openEvent} />
        )}

        {view.name === "event" && (
          <EventDetail
            eventId={view.eventId}
            onBack={goHome}
            onCheckout={(eventId, tierId, quantity) => {
              setView({ name: "checkout", eventId, tierId, quantity });
              window.scrollTo(0, 0);
            }}
          />
        )}

        {view.name === "checkout" && (
          <Checkout
            eventId={view.eventId}
            tierId={view.tierId}
            quantity={view.quantity}
            onBack={() => openEvent(view.eventId)}
            onDone={() => {
              setView({ ...view, name: "confirmation" });
              window.scrollTo(0, 0);
            }}
          />
        )}

        {view.name === "confirmation" && (
          <Confirmation
            eventId={view.eventId}
            tierId={view.tierId}
            quantity={view.quantity}
            onHome={goHome}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}