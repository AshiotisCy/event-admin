import MainPage from "./components/MainPage/MainPage";
import styles from "./styles.module.css";

function App() {
  return (
  <div className={styles.eventAdministrator}>
      <div className={styles.mainContent}>
        <MainPage />
      </div>
    </div>
  );
}

export default App;
