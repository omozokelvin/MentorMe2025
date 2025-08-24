import './App.css';
import Timer from './components/Timer';

export default function App() {
  return (
    <>
      <Timer />
      <Timer defaultBackgroundColor="gray" />
      <Timer defaultBackgroundColor="grey" />
    </>
  );
}
