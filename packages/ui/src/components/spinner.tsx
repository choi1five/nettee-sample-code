import { cn } from '@nettee-sample/utils/style';
import { Loader2 } from 'lucide-react';
import { SVGProps } from 'react';

export const Spinner = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return <Loader2 className={cn('animate-spin', className)} {...props} />;
};
