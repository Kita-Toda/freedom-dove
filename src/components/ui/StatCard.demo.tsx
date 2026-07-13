import StatCard from './StatCard';

export default function StatCardDemo() {
  return (
    <div className="bg-black p-12 min-h-screen">
      <h2 className="text-3xl font-bold text-cream mb-12">StatCard Component</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          number="31"
          label="Countries Active"
          description="Networks across 4 continents"
          accentColor="gold"
          glowColor="from-gold/25 to-gold/10"
        />
        <StatCard
          number="127K+"
          label="Survivors Supported"
          description="Direct services and care"
          accentColor="mauve"
          glowColor="from-mauve/25 to-mauve/10"
        />
        <StatCard
          number="847"
          label="Traffickers Convicted"
          description="Through collaboration & advocacy"
          accentColor="gold-light"
          glowColor="from-gold-light/25 to-gold/10"
        />
      </div>
    </div>
  );
}
