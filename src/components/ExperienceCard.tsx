interface Experience {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
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
    <div className="bg-amber-25 border border-orange-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-orange-300 h-48 flex flex-col justify-between">
      <h3 className="text-xl font-semibold text-amber-900 leading-relaxed overflow-hidden" 
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>
        {experience.title}
      </h3>
      
      <div className="text-base text-orange-600 mt-auto">
        {formatDate(experience.created_at)}
      </div>
    </div>
  );
}