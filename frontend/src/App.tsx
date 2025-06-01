import './App.css';
import { AuthButtons } from './components/AuthButtons';
import { SubmitPickupButton } from './components/SubmitPickupButton'; 
import { useAuth } from './context/useAuth';
import { PickupMap } from './components/PickupMap';
import { PickupDashboard } from "./components/PickupDashboard";
import { PickupLeaderboard } from "./components/PickupLeaderboard";

const badgeNames: Record<string, string> = 
{
  first_pickup: "🏅 First Pickup!",
  ten_pickups: "🔥 Ten Pickups!",
  hundred_points: "💯 100 Points!",
}; 

function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <header>
        <h2>🗑️ Team Trash Tracker ♻️</h2>
        <h4>Gamifying Cleanups — One Pickup at a Time</h4>
        <AuthButtons />
      </header>

      <main>
        {user ? (
          <div>
            <h3>Glad to have you here 😊</h3> 
            <p>Your email: {user.email}</p>
            <p>You're now authenticated and ready to log cleanups 🧤🗑️</p>

            {user.badges && (
              <div style={{ marginTop: "15px" }}>
                <h4>Your Badges🎖️:</h4>
                {user.badges.length > 0 ? (
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {user.badges.map((badge) => (
                      <li key={badge}>{badgeNames[badge] || badge}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Sorry, no badges earned yet 😔</p>
                )}
              </div>
            )}

            {user.currentStreak && user.currentStreak > 0 && (
              <div style={{ marginTop: "1rem", color: "#f26522", fontWeight: "bold" }}>
                🔥 Current Streak: {user.currentStreak} day{user.currentStreak > 1 ? "s" : ""}
              </div>
            )}
            <br />
            <SubmitPickupButton /> {/* rendering test pickup button */}
            <PickupMap />
            <PickupDashboard /> {/* live list */}
            <PickupLeaderboard />
          </div>
        ) : (
          <div>
            <h2>♻️ Please login to start tracking trash pickups 🗑️</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
