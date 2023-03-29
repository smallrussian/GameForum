import Spacer from "@/components/Spacer";
import Navbar from "@/components/Navbar";
import Profile from "@/components/profile";
export default function Test (){
    return (
        <div className="bg-slate-800 min-h-screen">
        <Navbar/>
        <Spacer>
            
            <Profile></Profile>
        
        </Spacer>
        </div>
        
    )
}