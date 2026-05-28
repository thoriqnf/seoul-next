import Greeting from "@/components/Text/Greeting";
import Hello from "@/components/Text/Hello";
import GreetingName from "@/components/Text/GreetingName";
import Counter from "@/components/Button/Counter";
import BasicFormDemo from "@/components/Demo/BasicFormDemo";
import ReactHookFormDemo from "@/components/Demo/ReactHookFormDemo";

export default function Home() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>React Event & Form Demos</h1>
      
      <section style={{ marginBottom: "40px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Original Counter Component:</h2>
        <Counter />
      </section>

      {/* Basic State & Form Demo */}
      <BasicFormDemo />

      {/* React Hook Form Demo */}
      <ReactHookFormDemo />
    </div>
  );
}

