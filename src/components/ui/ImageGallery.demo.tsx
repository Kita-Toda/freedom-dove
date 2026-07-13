import ImageGallery from './ImageGallery';

export default function ImageGalleryDemo() {
  const sampleImages = [
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      title: 'Community Support',
      description: 'Local organizations providing direct aid to survivors',
      category: 'Impact',
    },
    {
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      title: 'Global Network',
      description: 'Partners working across 31 countries',
      category: 'Network',
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
      title: 'Survivor Stories',
      description: 'Voices of hope and resilience',
      category: 'Stories',
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      title: 'Training Programs',
      description: 'Empowering individuals with skills and opportunities',
      category: 'Education',
    },
    {
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      title: 'Advocacy Campaign',
      description: 'Raising awareness for systemic change',
      category: 'Advocacy',
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
      title: 'Safe Spaces',
      description: 'Providing security, shelter, and support',
      category: 'Support',
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      title: 'Justice System',
      description: 'Working with law enforcement for accountability',
      category: 'Advocacy',
    },
    {
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      title: 'Medical Care',
      description: 'Health services for survivors',
      category: 'Support',
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
      title: 'Legal Aid',
      description: 'Supporting survivors through legal processes',
      category: 'Support',
    },
  ];

  return (
    <ImageGallery
      images={sampleImages}
      columns={3}
      category="Gallery"
      title="Our Impact in Action"
      description="Explore the diverse ways we're working to end trafficking and modern slavery worldwide."
      showOverlay={true}
    />
  );
}
