import { EnterName, RealTimeEditor } from "@/features";
import './styles/dark.css';
import { useStore } from "@/domain";

const App = () => {
    const username = useStore(({ username }) => username)

    return <div className="app_dark_theme">{username ? <RealTimeEditor /> : <EnterName />}</div>
}

export default App
