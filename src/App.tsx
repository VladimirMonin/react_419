import './App.css'

interface AppProps {
  message: string;
}

function MainTitle({ message }: AppProps) {
  if (message === "hello") {
    return <h1 className="hello">Приветствую!</h1>
  }
  else if (message === "goodbye") {
    return <h1 className="goodbye">До скорой встречи!</h1>
  }
  return null;
}

export default MainTitle
