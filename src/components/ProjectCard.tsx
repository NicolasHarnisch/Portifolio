import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const ProjectCard = ({ title, description, image, tags }: ProjectCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4 card-gradient border border-border/50">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {description}
      </p>
      
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="outline" 
            className="text-xs border-primary/30 text-primary hover:bg-primary/10"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
