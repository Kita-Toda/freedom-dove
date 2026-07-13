import MediaCard from './MediaCard';

export default function MediaCardDemo() {
  return (
    <div className="bg-black p-12 min-h-screen">
      <h2 className="text-3xl font-bold text-cream mb-12">MediaCard Component</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <MediaCard
          image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
          title="Community Support"
          description="Local organizations providing direct aid"
          category="Impact"
          overlay={true}
        />
        <MediaCard
          image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=400&fit=crop"
          title="Global Network"
          description="Partners working across continents"
          category="Network"
          overlay={true}
        />
        <MediaCard
          image="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=400&fit=crop"
          title="Survivor Stories"
          description="Voices of hope and resilience"
          category="Stories"
          overlay={true}
        />
        <MediaCard
          image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
          title="Training Programs"
          description="Empowering individuals with skills"
          category="Education"
          overlay={true}
        />
        <MediaCard
          image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=400&fit=crop"
          title="Advocacy Campaign"
          description="Raising awareness for change"
          category="Advocacy"
          overlay={true}
        />
        <MediaCard
          image="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=400&fit=crop"
          title="Safe Spaces"
          description="Providing security and shelter"
          category="Support"
          overlay={true}
        />
      </div>
    </div>
  );
}
