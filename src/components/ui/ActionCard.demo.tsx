import ActionCard from './ActionCard';

export default function ActionCardDemo() {
  return (
    <div className="bg-black p-12 min-h-screen">
      <h2 className="text-3xl font-bold text-cream mb-12">ActionCard Component</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ActionCard
          title="Donate"
          description="Every dollar funds direct survivor services: safe housing, counseling, legal aid, and vocational training."
          icon="💝"
          color="gold"
          ctaText="Donate Now"
          ctaHref="#"
          features={[
            'Tax-deductible donations (501(c)(3))',
            'Monthly giving programs available',
            'Donate via card, wire, or crypto',
          ]}
        />
        <ActionCard
          title="Volunteer"
          description="Contribute your professional skills: legal expertise, software development, mental health counseling, job placement services."
          icon="🤝"
          color="mauve"
          ctaText="Apply to Volunteer"
          ctaHref="#"
          features={[
            'Remote or in-person opportunities',
            'Flexible time commitment',
            'Monthly skill-share workshops',
          ]}
        />
        <ActionCard
          title="Partner With Us"
          description="Organizations, governments, and corporations partner with us on research, policy advocacy, and survivor support programs."
          icon="🌐"
          color="gold-light"
          ctaText="Get in Touch"
          ctaHref="#"
          features={[
            'Co-develop programs with us',
            'Access our research & data',
            'Align your impact with ours',
          ]}
        />
        <ActionCard
          title="Advocate"
          description="Use your platform, voice, or influence to amplify survivor stories and demand policy change."
          icon="📢"
          color="cream"
          ctaText="Join the Network"
          ctaHref="#"
          features={[
            'Join our advocacy network',
            'Access fact sheets & toolkits',
            'Monthly policy briefings',
          ]}
        />
      </div>
    </div>
  );
}
