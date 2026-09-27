export default function AboutPage() {
  return (
    <div className="py-12 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
      <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
        <p>
          Hello! I'm aRustyDev, a Distributed Systems Nerd and an Over Confident Developer. 
          I spend most of my time exploring the depths of systems programming, security, 
          and building things that probably should have stayed ideas.
        </p>
        <p>
          This blog is a place where I share my technical notes, learning journeys, 
          and occasional rants about software engineering.
        </p>
        <p>
          When I'm not coding, you can find me reading research papers or trying to 
          reverse engineer things I shouldn't.
        </p>
      </div>
    </div>
  );
}
