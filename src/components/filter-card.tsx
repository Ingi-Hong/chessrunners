import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface FilterCardProps {
  className?: string;
  title: string;
  content: ReactNode;
  expand?: boolean;
  ExpandComponent?: any;
}

export default function FilterCard({
  className,
  title,
  content,
  ExpandComponent = null,
}: FilterCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {ExpandComponent ? ExpandComponent : null}
    </Card>
  );
}
