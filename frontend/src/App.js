import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import { useMemo, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";



function App() {
  const [active, setActive] = useState(1) //Starts from 1 since our menu items id starts with 1. So menu item with id 1 is default
  //we want the state to change when we click on the links => changing the state to the corresponding id
  
  const global = useGlobalContext()
  console.log(global); //Testing the useglobalcontext

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => { //useMemo to fix issue with the orb movement restarting when changing the state
    return <Orb />
  },[])
  
  return (
    <AppStyled bg={bg} className="App">
     {orbMemo} 
      <MainLayout>
      <Navigation active={active} setActive={setActive} /> 
      <main>
        {displayData()}
      </main>

      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
height: 100vh;
background-image: url(${props => props.bg}); //By adding bg into AppStyled we can access bg as a propp in our styled div
position: relative;
main{
    flex: 1; //flex 1 fills the remaining space of the window which is everything minus the side navbar
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
