import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { Input } from "@/components/ui/input";
import * as React from "react";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent";
import { Button } from "@/components/ui/button";
import axios from 'axios'


function Home(){
    const [loading, setLoading] = React.useState(true)
    const [text,setText] = React.useState("")
    const [img,setImg] = React.useState("")
    const [art,setArt] = React.useState("")

    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault()
        setArt('')
        try{
        const response = await axios.post("https://skolrup-article-gen.onrender.com/", {query: text})
        setImg(response.data.image_url)
        setArt(response.data.article)
        setLoading(false)
        }catch(err){
            setArt("Error processing message")
        }
    }
    
    return(
        <>
        <div  className="bg-neutral-950  justify-center overflow-y-auto w-full min-h-screen" >
            <div className="grid  gap-8 ">
                <div id="Heading" className="h-32 flex justify-center items-center">
                    <h1>
                        <BlurText  className="  text-7xl font-bold mt-10 text-center text-white opacity-90" text="Skolrup Article Gen" stepDuration={0.35} delay={300}></BlurText>
                    </h1>
                </div>
                <AnimatedContent direction="vertical"ease="power3.out" scale={0.2} delay={0.4} duration={1.3} reverse={true}>
                    <div id="Search Section" className="flex justify-center   items-center gap-2">
                        <Input onChange={(e)=> setText(e.target.value)} onSubmit={handleSubmit} type="search" className="text-white  w-[30%]  " placeholder="Which article you want to read today? "></Input>    
                        <Button onClick={handleSubmit} className="text-center " variant={"secondary"}>Search</Button>            
                    </div>
                </AnimatedContent>
            
            </div>

            <div id="Article Section" className="flex-col m-5 justify-center  items-center text-white  ">
                <div className="flex justify-center">
                    {loading ? (
                    <div className="w-[930px] h-[400px] m-7 bg-neutral-800 animate-pulse rounded-xl" />
                ) : (
                     <img src={img} alt="Article Banner" className="w-[930px] h-[400px] m-7  object-cover  rounded-xl" />)}
                </div>
                {loading ? (
            <div className="flex justify-center">
                <div className="animate-pulse w-[930px] space-y-4 p-6 bg-neutral-900 rounded-xl">
                <div className="h-64 bg-neutral-800 rounded-xl"></div>
                <div className="h-6 bg-neutral-800 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-800 rounded w-full"></div>
                <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
                <div className="h-4 bg-neutral-800 rounded w-2/3"></div>
                </div>
            </div>
            ) : (
                <div className="flex  justify-center">
                    <div className="bg-neutral-900  p-6 w-[930px] rounded-xl space-y-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h2]:text-2xl [&>h2]:font-semibold [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:italic" dangerouslySetInnerHTML={{__html: art }}/>                        
                </div>  )}
            </div>

            
        </div>
        </>
    )
}

export default Home;