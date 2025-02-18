import AppBarPresentation from "./AppBar.Presentation";

function AppBarContainer({open, setOpen}){

    const handleOnClick = () => {
        setOpen((prev) => !prev);
        console.log(open);
    }

    const handleLogin = () => {

    }

    return <AppBarPresentation handleOnClick={handleOnClick} handleLogin={handleLogin} open={open} setOpen={setOpen}/>

}

export default AppBarContainer;