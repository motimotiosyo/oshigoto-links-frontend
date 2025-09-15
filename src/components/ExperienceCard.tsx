interface Experience {
  id: number;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {experience.title}
      </h3>
      
      <div className="text-sm text-gray-500">
        {formatDate(experience.created_at)}
      </div>
    </div>
  );
}