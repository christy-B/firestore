import './App.css';
import FirestoreDB from './Component/firestoreDB';
import RealtimeDB from './Component/realtimeDB';
import SignIn from './Component/auth';

function App() {
  return (
    <div className="App">
      {/* <RealtimeDB /> */}
      {/* <hr></hr> */}
      {/* <FirestoreDB/> */}
      <SignIn/>
    </div>
  );
}

export default App;
