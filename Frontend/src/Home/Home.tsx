import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { Input } from "@/components/ui/input";
import * as React from "react";
import AnimatedContent from "@/blocks/Animations/AnimatedContent/AnimatedContent";
import { Button } from "@/components/ui/button";


function Home(){
    const dummyArticle = `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Will AI Replace Human Jobs? Navigating the Future of Work</title>
</head>
<body>
<h1>Will AI Replace Human Jobs? Navigating the Future of Work</h1>

<p>The advent of artificial intelligence (AI) has undeniably marked a transformative epoch in technological progress, prompting widespread discussions about its impact on employment. As AI systems become increasingly sophisticated, capable of automating routine tasks and augmenting human decision-making, a fundamental question persists: Will AI ultimately replace human jobs? While concerns about displacement are valid, a comprehensive understanding reveals a nuanced landscape where AI acts more as a catalyst for change rather than a wholesale eliminator of employment opportunities. This article synthesizes current insights to explore the evolving relationship between AI and the workforce, emphasizing potential risks, opportunities, and strategies for adaptation.</p>

<h2>The Current State of AI in the Workforce</h2>

<p>Artificial intelligence has already woven itself into various sectors, fundamentally altering operational paradigms. Manufacturing industries utilize robots for assembly lines, significantly enhancing efficiency and safety. Customer service centers deploy chatbots to handle routine inquiries, reducing wait times and operational costs. In data analysis, machine learning algorithms process vast datasets rapidly, enabling more informed decision-making.</p>

<p>These technological advancements have yielded tangible benefits such as increased productivity and the creation of new business models. However, they have also raised legitimate concerns about job displacement, especially in roles characterized by repetitive or predictable tasks. For instance, autonomous vehicles threaten to disrupt transportation industries, while AI-powered diagnostic tools are transforming healthcare by assisting or replacing certain medical professionals. The financial sector benefits from algorithms executing high-speed trades, potentially reducing the need for some analyst roles.</p>

<h2>Will AI Fully Replace Human Jobs?</h2>

<p>Despite these developments, the notion that AI will entirely supplant human employment oversimplifies a complex reality. Current AI systems excel at specific tasksprocessing data, recognizing patterns, and performing repetitive functionsbut lack the general intelligence, emotional understanding, and creative problem-solving abilities that humans bring to the table. Many occupations involve nuanced social interactions, ethical judgments, and strategic decision-making where AI remains limited.</p>

<p>Historical precedents offer reassurance. The Industrial Revolution and the advent of computers initially sparked fears of mass unemployment, yet they ultimately led to the creation of new industries and roles. For example, the rise of ATMs reduced the need for bank tellers but enabled banks to expand their services and hire more staff in advisory capacities. Similarly, AI is likely to transform rather than eliminate employment, pushing workers toward more complex, creative, and interpersonal responsibilities.</p>

<h2>Potential Impacts of AI on Employment</h2>

<h3>1. Job Displacement and Transformation</h3>
<ul>
<li>Roles involving routine taskssuch as data entry, basic customer support, and simple manufacturingare highly susceptible to automation.</li>
<li>Workers in these sectors may face unemployment unless they acquire new skills aligned with emerging job requirements.</li>
<li>Conversely, many jobs will evolve, requiring collaboration with AI systems, interpretation of AI outputs, or oversight of automated processes.</li>
</ul>

<h3>2. Creation of New Jobs</h3>
<ul>
<li>As AI technology advances, entirely new industries and roles will emerge.</li>
<li>Examples include AI ethics specialists, machine learning engineers, and data privacy officers.</li>
<li>Historically, technological change has often led to the birth of jobs that did not previously exist, and AI is expected to follow this pattern.</li>
</ul>

<h3>3. Economic Growth and Productivity</h3>
<ul>
<li>AI can significantly boost productivity, leading to economic growth that benefits society at large.</li>
<li>Higher efficiency can lower costs and prices, making goods and services more accessible.</li>
<li>This increased accessibility can stimulate demand and generate additional employment opportunities.</li>
</ul>

<h3>4. Socioeconomic Inequality</h3>
<ul>
<li>A pressing concern is the potential widening of inequality, as high-skilled workers benefit more from AI integration.</li>
<li>Low-skilled workers in vulnerable roles may struggle to adapt without access to reskilling programs, risking unemployment or wage stagnation.</li>
<li>Addressing this divide requires proactive policies, including education reforms, vocational training, and social safety nets like universal basic income (UBI).</li>
</ul>

<h2>Future Trends and Strategic Considerations</h2>

<h3>1. Human-AI Collaboration</h3>
<p>The most promising future involves a hybrid model where AI handles mundane and repetitive tasks, freeing humans to focus on areas requiring creativity, empathy, and strategic thinking. For example:</p>       
<ul>
<li>In healthcare, AI manages administrative and diagnostic support, allowing doctors to dedicate more time to patient care.</li>
<li>In creative industries, AI tools assist with drafting and content generation, while human creativity shapes storytelling and strategic direction.</li>
</ul>

<h3>2. Lifelong Learning and Skill Development</h3>
<p>As AI reshapes job requirements, continuous learning becomes essential. Governments, educational institutions, and corporations must invest in retraining programs to prepare workers for new roles. Emphasis on skills such as critical thinking, emotional intelligence, and technological literacy will be vital for workforce resilience.</p>

<h3>3. Policy and Ethical Frameworks</h3>
<p>Developing comprehensive regulations is crucial to ensure AI is used ethically and responsibly. This includes:</p>
<ul>
<li>Safeguarding workers rights and fair wages.</li>
<li>Preventing biases and discrimination embedded within AI systems.</li>
<li>Ensuring transparency and accountability in AI deployment.</li>
</ul>

<h3>4. Encouraging Innovation and New Opportunities</h3>
<p>Emerging fields such as AI-driven renewable energy, personalized medicine, space exploration, and sustainable infrastructure present new avenues for employment and economic growth. Promoting innovation and entrepreneurship in these areas will be critical for harnessing AIs full potential.</p>

<h2>Conclusion: Embracing AI as a Catalyst for Human Potential</h2>

<p>AI is not an existential threat to human employment but a powerful tool for transformation. Its true potential lies in complementing human strengthscreativity, empathy, ethical judgmentand addressing global challenges more effectively. While disruption is inevitable, history demonstrates that economies and societies adapt when technology is paired with forward-looking policies and investments.</p>`;

    const [text,setText] = React.useState("")
    const [img,setImg] = React.useState("")
    const [art,setArt] = React.useState("")
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
                        <Input onChange={(e)=> setText(e.target.value)} type="search" className="text-white  w-[30%]  " placeholder="Which article you want to read today? (kindly add tags for best results)"></Input>    
                        <Button onClick={()=>{alert("submitted")}} className="text-center " variant={"secondary"}>Search</Button>            
                    </div>
                </AnimatedContent>
            
            </div>
             <div id="Article Section" className="flex-col m-5 justify-center  items-center text-white  ">
                <div className="flex justify-center">
                     <img src={"img"} alt="Article Banner" className="w-[930px] h-[400px] m-7  object-cover  rounded-xl" />
                </div>
                <div className="flex  justify-center">
                    <div className="bg-neutral-900 invisible p-6 w-[930px] rounded-xl space-y-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h2]:text-2xl [&>h2]:font-semibold [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:italic" dangerouslySetInnerHTML={{__html: art }}/>                        
                </div>  
            </div>

            
        </div>
        </>
    )
}

export default Home;