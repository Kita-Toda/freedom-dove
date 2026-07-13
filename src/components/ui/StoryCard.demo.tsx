import StoryCard from './StoryCard';

export default function StoryCardDemo() {
  return (
    <div className="bg-black p-12 min-h-screen">
      <h2 className="text-3xl font-bold text-cream mb-12">StoryCard Component</h2>

      <div className="space-y-8 max-w-3xl">
        <StoryCard
          title="From Survivor to Advocate"
          description="After 8 years in exploitation, Amara escaped with help from our local partners in Phnom Penh. Now she leads survivor support groups and mentors 12 young women rebuilding their lives."
          region="Cambodia"
        />
        <StoryCard
          title="The Kibera Collective"
          description="Founded by trafficking survivors, this Nairobi-based organization uses our network to place 340 survivors into sustainable employment while providing childcare and mental health services."
          region="Kenya"
        />
        <StoryCard
          title="Justice Across Borders"
          description="Since 2019, our data-sharing platform has enabled law enforcement across 18 countries to coordinate investigations. Result: 203 convictions, 847 survivors identified and supported."
          region="Global Network"
        />
      </div>
    </div>
  );
}
